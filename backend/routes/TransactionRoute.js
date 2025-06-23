import express from "express";
import {
  getTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionsByUserId 
} from "../controllers/TransactionController.js";

const router = express.Router();

router.get("/transactions", getTransactions);
router.get("/transactions/:id", getTransactionById);
router.post("/transactions", createTransaction);
router.patch("/transactions/:id", updateTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/transactions/user/:userId", getTransactionsByUserId);

export default router;
