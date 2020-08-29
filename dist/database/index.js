"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nedb_async_1 = __importDefault(require("nedb-async"));
const path_1 = __importDefault(require("path"));
exports.users = new nedb_async_1.default({ filename: path_1.default.join('./src/database', 'users.db') });
//# sourceMappingURL=index.js.map