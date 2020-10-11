"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let database = new sequelize_1.Sequelize({
    host: process.env.DBHOST,
    username: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBUSER,
    dialect: "mysql",
});
if (process.env.NODE_ENV !== "development") {
    database = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        ssl: true,
    });
}
exports.default = database;
