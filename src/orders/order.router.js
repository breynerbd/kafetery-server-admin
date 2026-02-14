import { Router } from 'express';
import {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    changeOrderStatus,
} from './order.controller.js';
import {
    validateCreateOrder,
    validateUpdateOrderRequest,
    validateOrderStatusChange,
    validateGetOrderById,
} from '../../middlewares/order-validators.js';

const router = Router();

router.get('/', getOrders);
router.get('/:id', validateGetOrderById, getOrderById);

router.post('/', validateCreateOrder, createOrder);

router.put('/:id', validateUpdateOrderRequest, updateOrder);
router.put('/:id/activate', validateOrderStatusChange, changeOrderStatus);
router.put('/:id/deactivate', validateOrderStatusChange, changeOrderStatus);

export default router;
