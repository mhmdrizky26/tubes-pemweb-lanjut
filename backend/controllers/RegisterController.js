import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const RegisterController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Cek jika email sudah dipakai
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email sudah terdaftar" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Simpan user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        role_id: 2 // atau sesuai default role kamu
      });

      res.status(201).json({ message: "Registrasi berhasil", user: newUser });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

export default RegisterController;
