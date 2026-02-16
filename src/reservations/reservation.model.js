'use strict';

import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
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
    table: {  // <-- cambiamos tableNumber por referencia
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: [true, 'La mesa es obligatoria'],
    },
    date: {
        type: Date,
        required: [true, 'La fecha de la reservación es obligatoria'],
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED'],
        default: 'PENDING',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: { type: Date, default: Date.now }
});

// Índices
reservationSchema.index({ isActive: 1 });
reservationSchema.index({ date: 1, restaurant: 1 });

export default mongoose.model('Reservation', reservationSchema);
