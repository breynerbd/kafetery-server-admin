import Restaurant from './restaurant.model.js';
import Order from '../orders/order.model.js';

export const getRestaurants = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const restaurants = await Restaurant.find(filter)
            .populate('owner', 'name email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Restaurant.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: restaurants,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener restaurantes', error: error.message });
    }
};

export const getRestaurantById = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findById(id).populate('owner', 'name email');

        if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });

        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener restaurante', error: error.message });
    }
};

export const createRestaurant = async (req, res) => {
    try {
        const { name, description, phone, email, openingTime, closingTime, owner, location } = req.body;

        const loc = typeof location === 'string' ? JSON.parse(location) : location;

        const restaurant = new Restaurant({
            name,
            description,
            phone,
            email,
            openingTime,
            closingTime,
            owner,
            location: {
                latitude: Number(loc.latitude),
                longitude: Number(loc.longitude)
            }
        });

        await restaurant.save();

        res.status(201).json({ success: true, message: "Restaurante creado", data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear restaurante", error: error.message });
    }
};

export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, phone, email, openingTime, closingTime, owner, location } = req.body;

        const loc = typeof location === 'string' ? JSON.parse(location) : location;

        const updatedData = {
            name,
            description,
            phone,
            email,
            openingTime,
            closingTime,
            owner,
            location: {
                latitude: Number(loc.latitude),
                longitude: Number(loc.longitude)
            }
        };

        const restaurant = await Restaurant.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true
        });

        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurante no encontrado" });
        }

        res.status(200).json({ success: true, message: "Restaurante actualizado", data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al actualizar restaurante", error: error.message });
    }
};

export const changeRestaurantStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const restaurant = await Restaurant.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });

        res.status(200).json({ success: true, message: `Restaurante ${action}`, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado', error: error.message });
    }
};

export const getDailySales = async (req, res) => {
    try {
        const { id } = req.params;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const orders = await Order.find({
            restaurant: id,
            status: "DELIVERED",
            createdAt: { $gte: today }
        });

        const totalPrice = orders.reduce((acc, o) => acc + o.totalPrice, 0);

        res.status(200).json({
            success: true,
            data: { totalPrice }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getMonthlySales = async (req, res) => {
    try {
        const { id } = req.params;

        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        const orders = await Order.find({
            restaurant: id,
            status: "DELIVERED",
            createdAt: { $gte: firstDay }
        });

        const totalPrice = orders.reduce(
            (acc, o) => acc + (o.totalPrice || o.total || 0),
            0
        );

        res.status(200).json({
            success: true,
            data: { totalPrice }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};
