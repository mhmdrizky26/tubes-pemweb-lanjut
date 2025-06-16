import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProductModel.js";

// Get all carts
export const getCarts = async (req, res) => {
  try {
    const response = await Cart.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Product,
          as: 'product', // ⬅️ Tambahkan ini agar cocok dengan relasi di CartModel.js
          attributes: ['id', 'product_name', 'price', 'image_url']
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get cart by ID (jika Anda memiliki rute untuk ini, pastikan juga menginclude Product)
export const getCartById = async (req, res) => {
  try {
    const response = await Cart.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Product, // Pastikan ini ada
          as: 'product',
          attributes: ['id', 'product_name', 'price', 'image_url']
        }
      ]
    });
    if (!response) return res.status(404).json({ message: "Cart not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... (fungsi getCartsByUserId - ini juga harus menginclude Product)
export const getCartsByUserId = async (req, res) => {
  try {
    const response = await Cart.findAll({
      where: {
        user_id: req.params.userId
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: Product, // Pastikan ini ada
          as: 'product',
          attributes: ['id', 'product_name', 'price', 'image_url']
        }
      ]
    });
    if (!response || response.length === 0) {
      return res.status(404).json({ message: "No cart items found for this user." });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Modified: Create or Update cart (ini sudah kita perbaiki sebelumnya)
export const createCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const qtyToAdd = quantity || 1;

  try {
    let cartItem = await Cart.findOne({
      where: {
        user_id: user_id,
        product_id: product_id
      }
    });

    if (cartItem) {
      await cartItem.update({ quantity: cartItem.quantity + qtyToAdd });
      res.status(200).json({ message: "Product quantity updated in cart!", cartItem });
    } else {
      const newCartItem = await Cart.create({
        user_id: user_id,
        product_id: product_id,
        quantity: qtyToAdd
      });
      res.status(201).json({ message: "Product added to cart!", cartItem: newCartItem });
    }
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
