"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require("express");
const bot_1 = __importDefault(require("./bot"));
const database_1 = require("./database");
require("./scenes/scenes");
require("./commands/commands");
database_1.users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.');
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e);
});
const app = express();
const port = process.env.PORT || 80;
app.get("*", function (req, res) {
    res.send("<h1><a href='https://vk.com/in_teach'>InTach</a></h1>");
});
app.listen(port, function () {
    console.log(`INFO: App is listening on port ${port}!`);
    bot_1.default.updates.startWebhook().then(() => {
        console.log("INFO: BOT RUNNING");
    }).catch(console.error);
});
