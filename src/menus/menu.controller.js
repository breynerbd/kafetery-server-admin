import Menu from './menu.model.js';

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

export const getMenusByRestaurant = async (req, res) => {
    try {
        const { restaurant } = req.params;
        const menus = await Menu.find({ restaurant, isActive: true }).populate('restaurant', 'name');

        res.status(200).json({ success: true, data: menus });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener los platos', error: error.message });
    }
};

export const createMenu = async (req, res) => {
    try {
        const menuData = {
            ...req.body,
        };

        if (req.file) {
            menuData.image = req.file.path;
        }

        const menu = new Menu(menuData);

        await menu.save();

        res.status(201).json({
            success: true,
            message: 'Plato creado exitosamente',
            data: menu,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear plato',
            error: error.message,
        });
    }
};

export const updateMenu = async (req, res) => {
    try {
        const { id } = req.params;

        const updateData = {
            ...req.body,
        };

        if (req.file) {
            updateData.image = req.file.path;
        }

        const menu = await Menu.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!menu) {
            return res.status(404).json({
                success: false,
                message: 'Plato no encontrado',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Plato actualizado',
            data: menu,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar plato',
            error: error.message,
        });
    }
};

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

export const getTopMenus = async (req, res) => {
    try {
        const top = await Menu.find({ isActive: true })
            .sort({ totalSold: -1 })
            .limit(5);

        res.status(200).json({ success: true, data: top });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
