import Role from "../models/RoleModel.js";
import User from "../models/UserModel.js";

// Get all roles (with optional list of users)
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        res.json(roles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single role by ID
export const getRoleById = async (req, res) => {
    try {
        const role = await Role.findOne({
            where: { id: req.params.id },
            include: [{ model: User, attributes: ['id', 'name', 'email'] }]
        });
        if (!role) return res.status(404).json({ message: "Role not found" });
        res.json(role);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new role
export const createRole = async (req, res) => {
    const { role_name } = req.body;
    try {
        const role = await Role.create({ role_name });
        res.status(201).json(role);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update an existing role
export const updateRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });

        const { role_name } = req.body;
        await role.update({ role_name });
        res.json({ message: "Role updated", role });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a role
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) return res.status(404).json({ message: "Role not found" });

        await role.destroy();
        res.json({ message: "Role deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
