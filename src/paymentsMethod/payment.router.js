import { Router } from "express";
import {
    getPaymentMethods,
    getPaymentMethodById,
    createPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
} from "./payment.controller.js";

const router = Router();

router.get("/", getPaymentMethods);

router.get("/:id", getPaymentMethodById);

router.post("/", createPaymentMethod);

router.put("/:id", updatePaymentMethod);

router.delete("/:id", deletePaymentMethod);

export default router;