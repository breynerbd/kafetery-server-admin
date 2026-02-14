import Promotion from './promotion.model.js';

export const getPromotions = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const promotions = await Promotion.find(filter)
            .populate('restaurant', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Promotion.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: promotions,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener promociones', error: error.message });
    }
};

export const getPromotionById = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findById(id).populate('restaurant', 'name');

        if (!promotion) return res.status(404).json({ success: false, message: 'Promoción no encontrada' });

        res.status(200).json({ success: true, data: promotion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener promoción', error: error.message });
    }
};

export const createPromotion = async (req, res) => {
    try {
        const promotion = new Promotion(req.body);
        await promotion.save();

        res.status(201).json({ success: true, message: 'Promoción creada', data: promotion });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear promoción', error: error.message });
    }
};

export const updatePromotion = async (req, res) => {
    try {
        const { id } = req.params;
        const promotion = await Promotion.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!promotion) return res.status(404).json({ success: false, message: 'Promoción no encontrada' });

        res.status(200).json({ success: true, message: 'Promoción actualizada', data: promotion });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar promoción', error: error.message });
    }
};

export const changePromotionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activada' : 'desactivada';

        const promotion = await Promotion.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!promotion) return res.status(404).json({ success: false, message: 'Promoción no encontrada' });

        res.status(200).json({ success: true, message: `Promoción ${action}`, data: promotion });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado de la promoción', error: error.message });
    }
};
