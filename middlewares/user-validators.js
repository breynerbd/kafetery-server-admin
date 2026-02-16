import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Crear usuario
export const validateCreateUser = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('El nombre es requerido')
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('email')
        .notEmpty()
        .withMessage('El correo es requerido')
        .isEmail()
        .withMessage('Correo no válido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators,
];

// Actualizar usuario
export const validateUpdateUserRequest = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('El nombre debe tener entre 2 y 100 caracteres'),
    body('email')
        .optional()
        .isEmail()
        .withMessage('Correo no válido'),
    body('password')
        .optional()
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener al menos 6 caracteres'),
    checkValidators,
];

// Activar/Desactivar usuario
export const validateUserStatusChange = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];

// Obtener usuario por ID
export const validateGetUserById = [
    param('id').isMongoId().withMessage('ID debe ser un ObjectId válido de MongoDB'),
    checkValidators,
];
