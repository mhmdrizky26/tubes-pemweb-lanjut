import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import User from "../models/UserModel.js";
import path from "path";

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

export const createProduct = async (req, res) => {
  try {
    const { product_name, description, price, stock, category_id, seller_id } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;  // Simpan path relative-nya
    }

    const newProduct = await Product.create({
      product_name,
      description,
      price,
      stock,
      category_id,
      seller_id,
      image_url: imageUrl
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const { product_name, description, price, stock, category_id, seller_id } = req.body;

    let imageUrl = product.image_url;
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    await product.update({
      product_name,
      description,
      price,
      stock,
      category_id,
      seller_id,
      image_url: imageUrl
    });

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
