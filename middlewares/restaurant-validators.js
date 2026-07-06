import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear restaurante
export const validateCreateRestaurant = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    // Validación para el objeto location
    body('location').notEmpty().withMessage('La ubicación es requerida'),
    body('location.latitude').isNumeric().withMessage('La latitud debe ser un número'),
    body('location.longitude').isNumeric().withMessage('La longitud debe ser un número'),

    checkValidators,
];

// Actualizar restaurante
export const validateUpdateRestaurantRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

    // Validaciones opcionales para location si se está actualizando
    body('location').optional(),
    body('location.latitude').optional().isNumeric().withMessage('La latitud debe ser un número'),
    body('location.longitude').optional().isNumeric().withMessage('La longitud debe ser un número'),

    checkValidators,
];

// Activar/Desactivar restaurante
export const validateRestaurantStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

// Obtener restaurante por ID
export const validateGetRestaurantById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
