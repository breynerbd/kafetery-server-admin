import Order from './order.model.js';

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

export const createOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        res.status(201).json({ success: true, message: 'Pedido creado', data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear pedido', error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!order) return res.status(404).json({ success: false, message: 'Pedido no encontrado' });

        res.status(200).json({ success: true, message: 'Pedido actualizado', data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar pedido', error: error.message });
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
