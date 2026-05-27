import User from "../users/user.model.js";

export const syncUserFromAuth = async (req, res) => {
    try {

        const {
            auth_id,
            name,
            surname,
            username,
            email,
            password
        } = req.body;

        let user = await User.findOne({ auth_id });

        if (!user) {

            user = await User.create({
                auth_id,
                name,
                surname,
                username,
                email,
                password,
                role: "CLIENT",
                loyaltyPoints: 0,
                totalOrders: 0
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};