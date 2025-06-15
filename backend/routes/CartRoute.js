import express from "express";
import {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart
} from "../controllers/CartController.js";

const router = express.Router();

router.get("/carts", getCarts);
router.get("/carts/:id", getCartById);
router.post("/carts", createCart);
router.patch("/carts/:id", updateCart);
router.delete("/carts/:id", deleteCart);

export default router;
