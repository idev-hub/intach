"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const sequelize_1 = require("sequelize");
class Database extends sequelize_1.Sequelize {
    constructor(...params) {
        super(...params);
    }
}
exports.Database = Database;
