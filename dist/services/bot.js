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
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
const hear_1 = require("@vk-io/hear");
const session_1 = require("@vk-io/session");
const scenes_1 = require("@vk-io/scenes");
const database_1 = require("../database");
class Bot extends vk_io_1.VK {
    constructor(props) {
        super(props);
        this.hearManager = new hear_1.HearManager();
        this.sessionManager = new session_1.SessionManager();
        this.sceneManager = new scenes_1.SceneManager();
        this.command = (name, conditions, handle) => {
            if (typeof handle !== 'function') {
                handle = conditions;
                conditions = [`/${name.toLowerCase()}`];
            }
            if (!Array.isArray(conditions)) {
                conditions = [conditions];
            }
            this.hearManager.hear([
                (text, { state }) => (state.command === name.toLowerCase()),
                ...conditions
            ], handle);
        };
        this.updates.on('message', (ctx, next) => ctx.isOutbox ? undefined : next());
        this.updates.on('message_new', this.sessionManager.middleware);
        this.updates.on('message_new', this.sceneManager.middleware);
        this.updates.on('message_new', this.sceneManager.middlewareIntercept);
        this.updates.on('message_new', (context, next) => {
            const { messagePayload, text } = context;
            context.text = text.toLowerCase();
            context.state.command = messagePayload && messagePayload.command
                ? messagePayload.command.toLowerCase()
                : null;
            console.log("BOT: ", `new message from by id - ${context.peerId}: text - ${context.text}`);
            return next();
        });
        this.updates.on('message_new', (context, next) => __awaiter(this, void 0, void 0, function* () {
            const { peerId, session } = context;
            if (!session.user) {
                const user = yield database_1.users.asyncFindOne({ _id: peerId });
                if (user) {
                    session.user = user;
                    return next();
                }
                else
                    return context.scene.enter('start-scene');
            }
            else
                return next();
        }));
        this.updates.on('message_new', this.hearManager.middleware);
    }
}
exports.Bot = Bot;
exports.default = new Bot({
    token: process.env.TOKEN,
    webhookConfirmation: process.env.CONFIRM,
    webhookSecret: process.env.SECRET
});
