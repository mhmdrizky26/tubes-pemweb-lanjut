import Transaction from '../models/TransactionModel.js';
import TransactionDetail from '../models/TransactionDetailMode.js';
import Cart from '../models/CartModel.js';
import Product from '../models/ProductModel.js';

// ✅ CheckoutController.js
export const checkout = async (req, res) => {
  const { user_id } = req.body;

  try {
    // Pastikan relasi gunakan alias "product"
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, as: 'product' }]
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    // Hitung total dari relasi yang pakai 'as: product'
    const total_price = cartItems.reduce((total, item) => {
      const price = Number(item.product?.price || 0); // ✅ gunakan alias .product
      return total + (price * item.quantity);
    }, 0);

    // Buat transaksi
    const transaction = await Transaction.create({
      user_id,
      total_price,
      status: 'pending'
    });

    // Buat detail transaksi dari cart
    for (const item of cartItems) {
      await TransactionDetail.create({
        transaction_id: transaction.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: Number(item.product?.price || 0)
      });
    }

    // Kosongkan cart user
    await Cart.destroy({ where: { user_id } });

    res.status(201).json({ message: 'Checkout berhasil', transaction_id: transaction.id });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: error.message });
  }
};


