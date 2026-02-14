import { Router } from 'express';
import {
    getPromotions,
    getPromotionById,
    createPromotion,
    updatePromotion,
    changePromotionStatus,
} from './promotion.controller.js';
import {
    validateCreatePromotion,
    validateUpdatePromotionRequest,
    validatePromotionStatusChange,
    validateGetPromotionById,
} from '../../middlewares/promotion-validators.js';

const router = Router();

router.get('/', getPromotions);
router.get('/:id', validateGetPromotionById, getPromotionById);

router.post('/', validateCreatePromotion, createPromotion);

router.put('/:id', validateUpdatePromotionRequest, updatePromotion);
router.put('/:id/activate', validatePromotionStatusChange, changePromotionStatus);
router.put('/:id/deactivate', validatePromotionStatusChange, changePromotionStatus);

export default router;
