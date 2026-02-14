import Restaurant from './restaurant.model.js';

// Obtener todos los restaurantes
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

// Obtener restaurante por ID
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

// Crear restaurante
export const createRestaurant = async (req, res) => {
    try {
        const restaurant = new Restaurant(req.body);
        await restaurant.save();

        res.status(201).json({ success: true, message: 'Restaurante creado', data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear restaurante', error: error.message });
    }
};

// Actualizar restaurante
export const updateRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!restaurant) return res.status(404).json({ success: false, message: 'Restaurante no encontrado' });

        res.status(200).json({ success: true, message: 'Restaurante actualizado', data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar restaurante', error: error.message });
    }
};

// Cambiar estado
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
