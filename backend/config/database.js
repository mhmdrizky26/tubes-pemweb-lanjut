import { Sequelize } from "sequelize";

const db = new Sequelize('db-farmlink-pwb','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;