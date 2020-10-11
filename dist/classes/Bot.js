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
exports.Bot = void 0;
const vk_io_1 = require("vk-io");
const hear_1 = require("@vk-io/hear");
const session_1 = require("@vk-io/session");
const scenes_1 = require("@vk-io/scenes");
const antispam_1 = __importDefault(require("../middlewares/antispam"));
const authorized_1 = __importDefault(require("../middlewares/authorized"));
const random_1 = require("../utils/random");
const SubscribeNews_1 = __importDefault(require("../models/SubscribeNews"));
const Peer_1 = __importDefault(require("../models/Peer"));
class Bot extends vk_io_1.VK {
    constructor(param) {
        super(param);
        this.hearManager = new hear_1.HearManager();
        this.sessionManager = new session_1.SessionManager();
        this.sceneManager = new scenes_1.SceneManager();
        this.command = (name, conditions, handle, middlewares) => {
            this.hearManager.hear([
                (text, { state }) => (state.command === name.toLowerCase()),
                ...conditions
            ], handle);
        };
        this.updates.on('wall_post_new', (context, next) => __awaiter(this, void 0, void 0, function* () {
            const subscribes = yield SubscribeNews_1.default.findAll({ where: { param: true } });
            if (subscribes.length > 0) {
                const size = 100;
                const integration = [];
                const ids = subscribes.map(s => s["peerId"]);
                for (let i = 0; i < Math.ceil(ids.length / size); i++)
                    integration[i] = ids.slice((i * size), (i * size) + size);
                for (let i = 0; i < integration.length; i++) {
                    yield this.api.messages.send({
                        user_ids: integration[i],
                        random_id: random_1.randomInt(0, 31),
                        attachment: context.wall.toString(),
                        keyboard: vk_io_1.Keyboard.builder().textButton({
                            label: "Отписаться от новостей",
                            color: vk_io_1.Keyboard.NEGATIVE_COLOR,
                            payload: {
                                command: "unsubscribe-news"
                            }
                        }).inline()
                    });
                }
            }
            return next();
        }));
        this.updates.on('message_new', this.sessionManager.middleware);
        this.updates.on('message_new', this.sceneManager.middleware);
        this.updates.on('message_new', this.sceneManager.middlewareIntercept);
        this.updates.on('message', (context, next) => {
            const { messagePayload, text } = context;
            if (context.isOutbox) {
                const command = context.text.toLowerCase().trim();
                if (command[0] === "!") {
                    Peer_1.default.findOne({ where: { peerId: context.peerId } }).then(result => {
                        if (result) {
                            const oldParam = result.toJSON()["param"];
                            const newParam = command.replace("!", "");
                            result.update({ param: newParam }).then(() => {
                                return context.editMessage({
                                    message: `Ваша группа изменена с ${oldParam} на ${newParam}.\nНапишите ок, что бы применить эти данные`,
                                    keyboard: vk_io_1.Keyboard.builder().textButton({
                                        label: "ок",
                                        payload: {
                                            command: "ok"
                                        },
                                        color: vk_io_1.Keyboard.POSITIVE_COLOR
                                    }).inline()
                                });
                            });
                        }
                    });
                }
                return undefined;
            }
            context.text = text.toLowerCase();
            context.state.command = messagePayload && messagePayload.command
                ? messagePayload.command.toLowerCase()
                : null;
            return next();
        });
        this.updates.on('message_new', antispam_1.default);
        this.updates.on('message_new', authorized_1.default);
        this.updates.on('message_new', this.hearManager.middleware);
    }
}
exports.Bot = Bot;
