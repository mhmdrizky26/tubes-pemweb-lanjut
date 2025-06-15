import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        { model: Category, attributes: ['category_name'] },
        { model: User, attributes: ['name', 'email'] }
      ]
    });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    await product.update(req.body);
    res.json({ message: "Produk berhasil diperbarui", product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    await product.destroy();
    res.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
