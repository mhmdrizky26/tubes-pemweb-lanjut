import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import Role from '../models/RoleModel.js';

// GET All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: Role });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data user', error });
  }
};

// GET User by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil user', error });
  }
};

// CREATE User
export const createUser = async (req, res) => {
  const { name, email, password, role_id } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email sudah digunakan' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role_id
    });

    res.status(201).json({ message: 'User berhasil dibuat', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Gagal membuat user', error });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    user.name = name;
    user.email = email;
    if (password) user.password = password; // pastikan ada hashing kalau pakai login

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });

    await user.destroy();
    res.json({ message: 'User berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus user', error });
  }
};
