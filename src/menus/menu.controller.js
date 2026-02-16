import Menu from './menu.model.js';

// Obtener todos los platos con paginación y filtros
export const getMenus = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const menus = await Menu.find(filter)
            .populate('restaurant', 'name')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Menu.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: menus,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el menú', error: error.message });
    }
};

// Obtener plato por ID
export const getMenuById = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findById(id).populate('restaurant', 'name');

        if (!menu) return res.status(404).json({ success: false, message: 'Plato no encontrado' });

        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener el plato', error: error.message });
    }
};

// Crear nuevo plato
export const createMenu = async (req, res) => {
    try {
        const menu = new Menu(req.body);
        await menu.save();

        res.status(201).json({ success: true, message: 'Plato creado exitosamente', data: menu });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear plato', error: error.message });
    }
};

// Actualizar plato
export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;
        const menu = await Menu.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!menu) return res.status(404).json({ success: false, message: 'Plato no encontrado' });

        res.status(200).json({ success: true, message: 'Plato actualizado', data: menu });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar plato', error: error.message });
    }
};

// Cambiar estado del plato
export const changeMenuStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const menu = await Menu.findByIdAndUpdate(id, { isActive }, { new: true });
        if (!menu) return res.status(404).json({ success: false, message: 'Plato no encontrado' });

        res.status(200).json({ success: true, message: `Plato ${action}`, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado del plato', error: error.message });
    }
};
