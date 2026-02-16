import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear plato
export const validateCreateMenu = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre del plato es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('price')
        .notEmpty()
        .withMessage('El precio es requerido')
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    body('restaurant')
        .notEmpty()
        .withMessage('El restaurante es requerido')
        .isMongoId()
        .withMessage('ID de restaurante no válido'),
    checkValidators,
];

// Actualizar plato
export const validateUpdateMenuRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('El precio debe ser mayor o igual a 0'),
    body('restaurant')
        .optional()
        .isMongoId()
        .withMessage('ID de restaurante no válido'),
    checkValidators,
];

// Activar/Desactivar plato
export const validateMenuStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

// Obtener plato por ID
export const validateGetMenuById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
