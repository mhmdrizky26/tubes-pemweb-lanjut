import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// Get all carts
export const getCarts = async (req, res) => {
  try {
    const response = await Cart.findAll({
      include: [User, Product]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get cart by ID
export const getCartById = async (req, res) => {
  try {
    const response = await Cart.findOne({
      where: { id: req.params.id },
      include: [User, Product]
    });
    if (!response) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create cart
export const createCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  try {
    await Cart.create({ user_id, product_id, quantity });
    res.status(201).json({ message: "Cart created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update cart
export const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { id: req.params.id } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const { user_id, product_id, quantity } = req.body;
    await cart.update({ user_id, product_id, quantity });
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete cart
export const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ where: { id: req.params.id } });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    await cart.destroy();
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
