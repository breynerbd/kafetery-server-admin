import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear restaurante
export const validateCreateRestaurant = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('address')
        .notEmpty()
        .withMessage('La dirección es requerida')
        .isLength({ max: 200 })
        .withMessage('La dirección no puede exceder 200 caracteres'),
    checkValidators,
];

// Actualizar restaurante
export const validateUpdateRestaurantRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('address')
        .optional()
        .isLength({ max: 200 })
        .withMessage('La dirección no puede exceder 200 caracteres'),
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
