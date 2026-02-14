'use strict';

import Table from "./table.model.js";

// Obtener todas las mesas con paginación
export const getTables = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };
        const options = { page: parseInt(page), limit: parseInt(limit), sort: { tableNumber: 1 } };

        const tables = await Table.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort(options.sort);

        const total = await Table.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: tables,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit,
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener mesas", error: error.message });
    }
};

// Obtener mesa por ID
export const getTableById = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findById(id);
        if (!table) return res.status(404).json({ success: false, message: "Mesa no encontrada" });

        res.status(200).json({ success: true, data: table });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener la mesa", error: error.message });
    }
};

// Crear mesa
export const createTable = async (req, res) => {
    try {
        const table = new Table(req.body);
        await table.save();
        res.status(201).json({ success: true, message: "Mesa creada exitosamente", data: table });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al crear la mesa", error: error.message });
    }
};

// Actualizar mesa
export const updateTable = async (req, res) => {
    try {
        const { id } = req.params;
        const table = await Table.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!table) return res.status(404).json({ success: false, message: "Mesa no encontrada" });

        res.status(200).json({ success: true, message: "Mesa actualizada", data: table });
    } catch (error) {
        res.status(400).json({ success: false, message: "Error al actualizar la mesa", error: error.message });
    }
};

// Activar / Desactivar mesa
export const changeTableStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes("/activate");
        const table = await Table.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!table) return res.status(404).json({ success: false, message: "Mesa no encontrada" });

        res.status(200).json({ success: true, message: `Mesa ${isActive ? "activada" : "desactivada"}`, data: table });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al cambiar el estado de la mesa", error: error.message });
    }
};
