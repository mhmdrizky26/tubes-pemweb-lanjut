import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";

const Transaction = db.define('transactions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  freezeTableName: true,
  timestamps: false
});

// Relasi ke User (pembeli)
Transaction.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Transaction, { foreignKey: 'user_id' });

export default Transaction;

(async () => {
  await db.sync();
})();