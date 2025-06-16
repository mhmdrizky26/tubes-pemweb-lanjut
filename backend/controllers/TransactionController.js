import Transaction from "../models/TransactionModel.js";
import User from "../models/UserModel.js";

// Get All Transactions
export const getTransactions = async (req, res) => {
  try {
    const response = await Transaction.findAll({
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const response = await Transaction.findOne({
      where: { id: req.params.id },
      include: [{ model: User, attributes: ['id', 'name', 'email'] }]
    });
    if (!response) return res.status(404).json({ message: "Transaksi tidak ditemukan" });
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /transactions/user/:id
export const getTransactionsByUserId = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      where: { user_id: req.params.id },
      include: [
        {
          model: TransactionDetail,
          include: [{ model: Product }]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Transaction
export const createTransaction = async (req, res) => {
  const { user_id, total_price, status } = req.body;
  try {
    const newTransaction = await Transaction.create({ // Simpan hasil create
      user_id,
      total_price,
      status
    });
    res.status(201).json({ message: "Transaksi berhasil ditambahkan", id: newTransaction.id }); // Kembalikan ID
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Transaction
export const updateTransaction = async (req, res) => {
  try {
    const trx = await Transaction.findByPk(req.params.id);
    if (!trx) return res.status(404).json({ message: "Transaksi tidak ditemukan" });

    const { total_price, status } = req.body;
    await trx.update({
      total_price,
      status,
      updated_at: new Date()
    });

    res.json({ message: "Transaksi berhasil diupdate" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Transaction
export const deleteTransaction = async (req, res) => {
  try {
    const trx = await Transaction.findByPk(req.params.id);
    if (!trx) return res.status(404).json({ message: "Transaksi tidak ditemukan" });

    await trx.destroy();
    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
