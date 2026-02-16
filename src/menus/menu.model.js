'use strict';

import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre del plato es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede exceder 100 caracteres'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [300, 'La descripción no puede exceder 300 caracteres'],
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio debe ser mayor o igual a 0'],
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

menuSchema.index({ isActive: 1 });
menuSchema.index({ name: 1, restaurant: 1 });

export default mongoose.model('Menu', menuSchema);
