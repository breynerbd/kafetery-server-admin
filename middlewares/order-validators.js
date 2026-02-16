import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear pedido
export const validateCreateOrder = [
    body('user').notEmpty().isMongoId().withMessage('ID de usuario no válido'),
    body('restaurant').notEmpty().isMongoId().withMessage('ID de restaurante no válido'),
    body('items')
        .isArray({ min: 1 })
        .withMessage('Debe incluir al menos un plato')
        .custom((items) => items.every(i => i.menu && i.quantity))
        .withMessage('Cada item debe tener plato y cantidad'),
    checkValidators,
];

// Actualizar pedido
export const validateUpdateOrderRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('items')
        .optional()
        .isArray()
        .withMessage('Los items deben ser un arreglo'),
    body('status').optional().isIn(['PENDING', 'PREPARING', 'DELIVERING', 'COMPLETED', 'CANCELLED']).withMessage('Estado no válido'),
    checkValidators,
];

// Activar/Desactivar pedido
export const validateOrderStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

// Obtener pedido por ID
export const validateGetOrderById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
