'use strict';

import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'El código es obligatorio'],
        trim: true,
        maxLength: [50, 'El código no puede exceder 50 caracteres'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [300, 'La descripción no puede exceder 300 caracteres'],
    },
    discount: {
        type: Number,
        required: [true, 'El descuento es obligatorio'],
        min: [0, 'El descuento debe ser mayor o igual a 0'],
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

promotionSchema.index({ isActive: 1 });
promotionSchema.index({ code: 1, restaurant: 1 });

export default mongoose.model('Promotion', promotionSchema);
