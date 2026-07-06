import { Router } from 'express';
import {
    getOrders,
    getOrderById,
    getOrdersByUser,
    getOrdersByRestaurant,
    createOrder,
    updateOrder,
    changeOrderStatus,
    checkoutOrder,
} from './order.controller.js';
import {
    validateCreateOrder,
    validateUpdateOrderRequest,
    validateOrderStatusChange,
    validateGetOrderById,
} from '../../middlewares/order-validators.js';

const router = Router();

router.get('/', getOrders);
router.get('/restaurant/:id', validateGetOrderById, getOrdersByRestaurant);
router.get('/user/:id', validateGetOrderById, getOrdersByUser);
router.get('/:id', validateGetOrderById, getOrderById);

router.post('/', validateCreateOrder, createOrder);

router.put('/:id', validateUpdateOrderRequest, updateOrder);
router.put('/:id/activate', validateOrderStatusChange, changeOrderStatus);
router.put('/:id/deactivate', validateOrderStatusChange, changeOrderStatus);

router.put(
    "/:id/checkout",
    checkoutOrder
);

export default router;
