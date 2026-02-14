import { Router } from 'express';
import {
    getRestaurants,
    getRestaurantById,
    createRestaurant,
    updateRestaurant,
    changeRestaurantStatus,
} from './restaurant.controller.js';
import {
    validateCreateRestaurant,
    validateUpdateRestaurantRequest,
    validateRestaurantStatusChange,
    validateGetRestaurantById,
} from '../../middlewares/restaurant-validators.js';

const router = Router();

// Rutas GET
router.get('/', getRestaurants);
router.get('/:id', validateGetRestaurantById, getRestaurantById);

// Rutas POST
router.post('/', validateCreateRestaurant, createRestaurant);

// Rutas PUT
router.put('/:id', validateUpdateRestaurantRequest, updateRestaurant);
router.put('/:id/activate', validateRestaurantStatusChange, changeRestaurantStatus);
router.put('/:id/deactivate', validateRestaurantStatusChange, changeRestaurantStatus);

export default router;
