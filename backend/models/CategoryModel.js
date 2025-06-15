import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Category;

(async () => {
  await db.sync(); 
})();
