import Category from "../models/CategoryModel.js";

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category = await Category.create({ category_name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update category
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    await category.update(req.body);
    res.json({ message: "Kategori berhasil diperbarui", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ message: "Kategori tidak ditemukan" });

    await category.destroy();
    res.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
