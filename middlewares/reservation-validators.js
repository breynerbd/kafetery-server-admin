import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear reservación
export const validateCreateReservation = [
    body('user')
        .notEmpty()
        .withMessage('Usuario es requerido')
        .isMongoId()
        .withMessage('ID de usuario no válido'),
    body('restaurant')
        .notEmpty()
        .withMessage('Restaurante es requerido')
        .isMongoId()
        .withMessage('ID de restaurante no válido'),
    body('date')
        .notEmpty()
        .withMessage('Fecha es requerida')
        .isISO8601()
        .withMessage('Fecha no válida'),
    body('guests')
        .notEmpty()
        .withMessage('Número de invitados es requerido')
        .isInt({ min: 1 })
        .withMessage('Debe haber al menos 1 invitado'),
    checkValidators,
];

// Actualizar reservación
export const validateUpdateReservationRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('date').optional().isISO8601().withMessage('Fecha no válida'),
    body('guests').optional().isInt({ min: 1 }).withMessage('Debe haber al menos 1 invitado'),
    checkValidators,
];

// Activar/Desactivar reservación
export const validateReservationStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

// Obtener reservación por ID
export const validateGetReservationById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
