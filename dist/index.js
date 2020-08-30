"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bot_1 = __importDefault(require("./services/bot"));
const database_1 = require("./database");
require("./scenes/scenes");
require("./commands/commands");
database_1.users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.');
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e);
});
bot_1.default.updates.startWebhook({ port: parseInt(process.env.PORT) || 5000 }).then(() => {
    console.log("INFO: BOT RUNNING");
}).catch(console.error);
