import {Sequelize} from "sequelize";

const db = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql"
});

export default db;
