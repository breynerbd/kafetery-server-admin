import { User } from "../users/user.model.js";

export const syncUserFromAuth = async (req, res) => {
    const { auth_id, email } = req.body;

    let user = await User.findOne({ auth_id });

    if (!user) {
        user = await User.create({
            auth_id,
            name: "Pendiente",
            email: email,
            points: 0
        });
    }

    return res.status(200).json({ success: true });
};