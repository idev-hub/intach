"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
let sequelize;
if (process.env.NODE_ENV === "development") {
    sequelize = new sequelize_1.Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
        host: process.env.DBHOST,
        dialect: "mysql",
    });
}
else if (process.env.NODE_ENV === "production") {
    sequelize = new sequelize_1.Sequelize(process.env.DATABASE_URL, {
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
exports.default = sequelize;
