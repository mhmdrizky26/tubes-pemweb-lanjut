import User from "../models/UserModel.js";
import Role from "../models/RoleModel.js";

// Get All Users (with Role)
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            include: [{ model: Role, attributes: ['role_name'] }]
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: [{ model: Role, attributes: ['role_name'] }]
        });
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create New User
export const createUser = async (req, res) => {
    const { name, email, password, role_id } = req.body;
    try {
        const newUser = await User.create({ name, email, password, role_id });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update User by ID
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        const { name, email, password, role_id } = req.body;
        await user.update({ name, email, password, role_id });
        res.json({ message: "User updated", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete User by ID
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
