import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear mesa
export const validateCreateTable = [
    body('tableNumber')
        .notEmpty().withMessage('Número de mesa es requerido')
        .isInt({ min: 1 }).withMessage('Número de mesa debe ser mayor a 0'),
    body('capacity')
        .notEmpty().withMessage('Capacidad es requerida')
        .isInt({ min: 1 }).withMessage('La capacidad debe ser al menos 1 persona'),
    body('restaurant')
        .notEmpty().withMessage('El restaurante es requerido')
        .isMongoId().withMessage('El restaurante debe ser un ObjectId válido'),
    checkValidators,
];

// Actualizar mesa
export const validateUpdateTableRequest = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido'),
    body('tableNumber')
        .optional()
        .isInt({ min: 1 }).withMessage('Número de mesa debe ser mayor a 0'),
    body('capacity')
        .optional()
        .isInt({ min: 1 }).withMessage('La capacidad debe ser al menos 1 persona'),
    body('restaurant')
        .optional()
        .isMongoId().withMessage('El restaurante debe ser un ObjectId válido'),
    checkValidators,
];

// Activar / Desactivar
export const validateTableStatusChange = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido'),
    checkValidators,
];

// Obtener mesa por ID
export const validateGetTableById = [
    param('id')
        .isMongoId().withMessage('ID debe ser un ObjectId válido'),
    checkValidators,
];
