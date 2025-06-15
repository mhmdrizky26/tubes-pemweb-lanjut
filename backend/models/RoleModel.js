import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Role = db.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Role;

(async () => {
  await db.sync(); 
})();
