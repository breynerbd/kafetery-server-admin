import Reservation from './reservation.model.js';

// Obtener todas las reservaciones con paginación y filtros
export const getReservations = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const reservations = await Reservation.find(filter)
            .populate('user', 'name email')
            .populate('restaurant', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Reservation.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: reservations,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener reservaciones', error: error.message });
    }
};

// Obtener reservación por ID
export const getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findById(id)
            .populate('user', 'name email')
            .populate('restaurant', 'name');

        if (!reservation) return res.status(404).json({ success: false, message: 'Reservación no encontrada' });

        res.status(200).json({ success: true, data: reservation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener reservación', error: error.message });
    }
};

// Crear reservación
export const createReservation = async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();

        res.status(201).json({ success: true, message: 'Reservación creada', data: reservation });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear reservación', error: error.message });
    }
};

// Actualizar reservación
export const updateReservation = async (req, res) => {
    try {
        const { id } = req.params;
        const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!reservation) return res.status(404).json({ success: false, message: 'Reservación no encontrada' });

        res.status(200).json({ success: true, message: 'Reservación actualizada', data: reservation });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar reservación', error: error.message });
    }
};

// Cambiar estado de la reservación
export const changeReservationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activada' : 'desactivada';

        const reservation = await Reservation.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!reservation) return res.status(404).json({ success: false, message: 'Reservación no encontrada' });

        res.status(200).json({ success: true, message: `Reservación ${action}`, data: reservation });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado de la reservación', error: error.message });
    }
};
