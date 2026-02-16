import { Router } from 'express';
import {
    getMenus,
    getMenuById,
    createMenu,
    updateMenu,
    changeMenuStatus,
} from './menu.controller.js';
import {
    validateCreateMenu,
    validateUpdateMenuRequest,
    validateMenuStatusChange,
    validateGetMenuById,
} from '../../middlewares/menu-validators.js';
import { uploadMenuImage } from '../../middlewares/file-uploader.js';
import { cleanupUploadedFileOnFinish } from '../../middlewares/delete-file-on-error.js';

const router = Router();

// Rutas GET
router.get('/', getMenus);
router.get('/:id', validateGetMenuById, getMenuById);

// Rutas POST
router.post(
    '/',
    uploadMenuImage.single('image'),
    cleanupUploadedFileOnFinish,
    validateCreateMenu,
    createMenu
);

// Rutas PUT
router.put(
    '/:id',
    uploadMenuImage.single('image'),
    validateUpdateMenuRequest,
    updateMenu
);
router.put('/:id/activate', validateMenuStatusChange, changeMenuStatus);
router.put('/:id/deactivate', validateMenuStatusChange, changeMenuStatus);

export default router;
