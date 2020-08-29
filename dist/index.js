"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./bot"));
const database_1 = require("./database");
require("./scenes/scenes");
require("./commands/commands");
database_1.users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.');
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e);
});
const http = require("http");
http.createServer(function (request, response) {
    response.end("InTach");
}).listen(process.env.YOUR_PORT || process.env.PORT || 80, () => {
    console.log("INFO: Server host");
    bot_1.default.updates.startPolling().then(() => {
        console.log("INFO: BOT RUNNING");
    }).catch(console.error);
});
//# sourceMappingURL=index.js.map