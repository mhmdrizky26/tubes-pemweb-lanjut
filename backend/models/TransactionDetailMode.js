import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Transaction from "./TransactionModel.js";
import Product from "./ProductModel.js";

const TransactionDetail = db.define("transaction_details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  transaction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'transactions',
      key: 'id'
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

TransactionDetail.belongsTo(Transaction, { foreignKey: "transaction_id" });
Transaction.hasMany(TransactionDetail, { foreignKey: "transaction_id" });

TransactionDetail.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(TransactionDetail, { foreignKey: "product_id" });

export default TransactionDetail;

(async () => {
  await db.sync();
})();
