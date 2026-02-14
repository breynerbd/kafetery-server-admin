'use strict';

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    items: [{
        menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', required: true },
        quantity: { type: Number, required: true, min: [1, 'Cantidad mínima 1'] },
    }],
    totalPrice: {
        type: Number,
        required: true,
        min: [0, 'El total debe ser mayor o igual a 0'],
    },
    status: {
        type: String,
        enum: ['PENDING', 'PREPARING', 'DELIVERING', 'COMPLETED', 'CANCELED'],
        default: 'PENDING',
    },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

orderSchema.index({ isActive: 1 });
orderSchema.index({ restaurant: 1, status: 1 });

export default mongoose.model('Order', orderSchema);
