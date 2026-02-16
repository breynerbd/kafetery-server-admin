import { Router } from 'express';
import {
    getReservations,
    getReservationById,
    createReservation,
    updateReservation,
    changeReservationStatus,
} from './reservation.controller.js';
import {
    validateCreateReservation,
    validateUpdateReservationRequest,
    validateReservationStatusChange,
    validateGetReservationById,
} from '../../middlewares/reservation-validators.js';

const router = Router();

// Rutas GET
router.get('/', getReservations);
router.get('/:id', validateGetReservationById, getReservationById);

// Rutas POST
router.post('/', validateCreateReservation, createReservation);

// Rutas PUT
router.put('/:id', validateUpdateReservationRequest, updateReservation);
router.put('/:id/activate', validateReservationStatusChange, changeReservationStatus);
router.put('/:id/deactivate', validateReservationStatusChange, changeReservationStatus);

export default router;
