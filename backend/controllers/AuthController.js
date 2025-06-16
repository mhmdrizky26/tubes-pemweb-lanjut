import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Role from "../models/RoleModel.js";

const AuthController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
        include: [{ model: Role, attributes: ['role_name'] }]
      });
      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign(
          { id: user.id, role: user.role_id }, // role_id sebagai angka (1 atau 2)
          "SECRET_KEY",
          { expiresIn: "1d" }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Ambil role 'user' dari table roles (misalnya id = 2)
    const userRole = await Role.findOne({ where: { role_name: "user" } });
    if (!userRole) return res.status(400).json({ message: "Role user tidak ditemukan" });

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id: userRole.id
    });

    res.status(201).json({ message: "Registrasi berhasil", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Registrasi gagal", error });
  }
};

export default AuthController;
