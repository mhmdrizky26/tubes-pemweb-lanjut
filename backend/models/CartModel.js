import { DataTypes } from "sequelize";
import db from "../config/database.js";
import User from "./UserModel.js";
import Product from "./ProductModel.js";

const Cart = db.define('carts', {
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
    added_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    freezeTableName: true,
    timestamps: false
});

// Relasi
Cart.belongsTo(User, { foreignKey: 'user_id' });
Cart.belongsTo(Product, { as: 'product', foreignKey: 'product_id' });

export default Cart;

// Optional: Sync database
(async () => {
    await db.sync();
})();
