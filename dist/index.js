"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const database_1 = __importDefault(require("./database"));
const bot_1 = __importDefault(require("./services/bot"));
require("./scenes/scenes");
require("./commands/commands");
const port = parseInt(process.env.PORT) || 3000;
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.default.sync({ force: false });
        console.log("Database connected successfully.");
        yield bot_1.default.updates.startWebhook({ port: port });
        console.log("The bot has been successfully launched on the port:", port);
        console.log(process.env.NODE_ENV);
    }
    catch (e) {
        console.error(e);
    }
}))();
