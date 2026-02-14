import User from './user.model.js';

// Obtener todos los usuarios con paginación y filtro por isActive
export const getUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, isActive = true } = req.query;
        const filter = { isActive };

        const users = await User.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit),
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los usuarios',
            error: error.message,
        });
    }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user)
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
};

// Crear usuario
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();

        res.status(201).json({ success: true, message: 'Usuario creado', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        if (!user)
            return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, message: 'Usuario actualizado', data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
};

// Cambiar estado del usuario
export const changeUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const isActive = req.url.includes('/activate');
        const action = isActive ? 'activado' : 'desactivado';

        const user = await User.findByIdAndUpdate(id, { isActive }, { new: true });

        if (!user) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });

        res.status(200).json({ success: true, message: `Usuario ${action}`, data: user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al cambiar estado', error: error.message });
    }
};
