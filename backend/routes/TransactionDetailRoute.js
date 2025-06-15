import express from "express";
import {
  getTransactionDetails,
  getTransactionDetailById,
  createTransactionDetail,
  updateTransactionDetail,
  deleteTransactionDetail
} from "../controllers/TransactionDetailController.js";

const router = express.Router();

router.get("/transaction-details", getTransactionDetails);
router.get("/transaction-details/:id", getTransactionDetailById);
router.post("/transaction-details", createTransactionDetail);
router.patch("/transaction-details/:id", updateTransactionDetail);
router.delete("/transaction-details/:id", deleteTransactionDetail);

export default router;