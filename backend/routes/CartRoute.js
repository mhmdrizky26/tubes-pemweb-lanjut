import express from "express";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  getCartsByUserId, // Import fungsi baru
  deleteCart
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/carts", getCarts);
router.get("/carts/:id", getCartById);
router.get("/carts/user/:userId", getCartsByUserId); // Route baru
router.post("/carts", createCart);
router.patch("/carts/:id", updateCart);
router.delete("/carts/:id", deleteCart);

export default router;
