import TransactionDetail from "../models/TransactionDetailMode.js";
import Product from "../models/ProductModel.js";
import Transaction from "../models/TransactionModel.js";

export const getTransactionDetails = async (req, res) => {
  try {
    const response = await TransactionDetail.findAll({
      include: [Product, Transaction]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTransactionDetailById = async (req, res) => {
  try {
    const response = await TransactionDetail.findOne({
      where: { id: req.params.id },
      include: [Product, Transaction]
    });
    if (!response) return res.status(404).json({ message: "Data not found" });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTransactionDetail = async (req, res) => {
  const { transaction_id, product_id, quantity, price } = req.body;
  try {
    await TransactionDetail.create({
      transaction_id,
      product_id,
      quantity,
      price
    });
    res.status(201).json({ message: "Transaction detail created" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTransactionDetail = async (req, res) => {
  try {
    const detail = await TransactionDetail.findOne({ where: { id: req.params.id } });
    if (!detail) return res.status(404).json({ message: "Data not found" });

    const { transaction_id, product_id, quantity, price } = req.body;
    await detail.update({ transaction_id, product_id, quantity, price });
    res.status(200).json({ message: "Transaction detail updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTransactionDetail = async (req, res) => {
  try {
    const detail = await TransactionDetail.findOne({ where: { id: req.params.id } });
    if (!detail) return res.status(404).json({ message: "Data not found" });

    await detail.destroy();
    res.status(200).json({ message: "Transaction detail deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};