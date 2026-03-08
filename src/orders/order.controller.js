import Order from './order.model.js';
import Menu from '../menus/menu.model.js';
import Restaurant from '../restaurants/restaurant.model.js';
import Table from '../tables/table.model.js';
import Promotion from '../promotions/promotion.model.js';
import User from '../users/user.model.js';

export const getOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const orders = await Order.find(filter)
            .populate('user', 'name email')
            .populate('restaurant', 'name')
            .populate('items.menu', 'name price')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Order.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: orders,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedidos', error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id)
            .populate('user', 'name email')
            .populate('restaurant', 'name')
            .populate('items.menu', 'name price');

        if (!order) return res.status(404).json({ success: false, message: 'Pedido no encontrado' });

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedido', error: error.message });
    }
};

export const getOrdersByRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ restaurant: id })
            .populate('user', 'name email')
            .populate('restaurant', 'name')
            .populate('items.menu', 'name price');

        if (!orders) return res.status(404).json({ success: false, message: 'Pedidos no encontrados' });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedidos', error: error.message });
    }
};

export const getOrdersByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.find({ user: id })
            .populate('user', 'name email')
            .populate('restaurant', 'name')
            .populate('items.menu', 'name price');

        if (!orders) return res.status(404).json({ success: false, message: 'Pedidos no encontrados' });

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener pedidos', error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { user, restaurant, items } = req.body;

        const restaurantData = await Restaurant.findById(restaurant);
        if (!restaurantData)
            return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });

        const nowHour = new Date().toTimeString().slice(0, 5);
        if (nowHour < restaurantData.openingTime || nowHour > restaurantData.closingTime) {
            return res.status(400).json({ success: false, message: 'El restaurante está cerrado' });
        }

        let subtotal = 0;
        let estimatedTime = 0;

        for (const item of items) {
            const menu = await Menu.findById(item.menu);

            if (!menu || !menu.isActive)
                return res.status(400).json({ success: false, message: 'Plato no disponible' });

            if (menu.stock < item.quantity)
                return res.status(400).json({ success: false, message: `Stock insuficiente para ${menu.name}` });

            subtotal += menu.price * item.quantity;
            estimatedTime += menu.prepTime * item.quantity;

            menu.stock -= item.quantity;
            menu.totalSold += item.quantity;

            if (menu.stock === 0) menu.status = 'OUT_OF_STOCK';
            await menu.save();
        }

        let table = req.body.table;

        if (!table) {
            const availableTable = await Table.findOne({
                restaurant,
                status: 'AVAILABLE',
                isActive: true
            });

            if (!availableTable)
                return res.status(400).json({ success: false, message: 'No hay mesas disponibles' });

            table = availableTable._id;
            availableTable.status = 'OCCUPIED';
            await availableTable.save();
        }

        const now = new Date();
        const promotions = await Promotion.find({
            restaurant,
            isActive: true,
            validFrom: { $lte: now },
            validTo: { $gte: now }
        });

        let discount = 0;

        for (const promo of promotions) {
            if (promo.type === 'PERCENTAGE')
                discount += subtotal * (promo.value / 100);

            if (promo.type === 'FIXED')
                discount += promo.value;

            if (promo.type === 'MIN_PURCHASE' && subtotal >= promo.minPurchase)
                discount += promo.value;
        }

        const totalPrice = subtotal - discount;

        const order = new Order({
            user,
            restaurant,
            table,
            items,
            subtotal,
            discount,
            totalPrice,
            estimatedTime
        });

        await order.save();

        const userData = await User.findById(user);
        userData.loyaltyPoints += Math.floor(totalPrice / 10);
        userData.totalOrders += 1;
        await userData.save();

        res.status(201).json({
            success: true,
            message: 'Pedido creado',
            data: order
        });

    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {

        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);

        if (!order)
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });

        const allowedTransitions = {
            PENDING: ['CONFIRMED', 'CANCELED'],
            CONFIRMED: ['PREPARING', 'CANCELED'],
            PREPARING: ['READY'],
            READY: ['DELIVERED'],
            DELIVERED: [],
            CANCELED: []
        };

        if (!allowedTransitions[order.status].includes(status)) {
            return res.status(400).json({
                success: false,
                message: `No puedes cambiar de ${order.status} a ${status}`
            });
        }

        order.status = status;

        if (status === "DELIVERED") {

            const user = await User.findById(order.user);

            if (user) {
                user.loyaltyPoints += Math.floor(order.totalPrice / 10);
                user.totalOrders += 1;

                await user.save();
            }
        }

        await order.save();

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }
};

export const changeOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const order = await Order.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Pedido no encontrado' });

        res.status(200).json({ success: true, message: `Pedido ${action}`, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado del pedido', error: error.message });
    }
};
