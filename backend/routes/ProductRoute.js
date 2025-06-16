import express from "express";
import upload from "../middleware/upload.js";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/ProductController.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProductById);
router.post("/products", upload.single('image'), createProduct); // 👈 tambah upload
router.patch("/products/:id", upload.single('image'), updateProduct); // 👈 tambah upload
router.delete("/products/:id", deleteProduct);

export default router;
