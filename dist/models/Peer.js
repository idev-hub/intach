"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../services/database"));
const Peer = database_1.default.define("peer", {
    peerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    param: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
exports.default = Peer;
