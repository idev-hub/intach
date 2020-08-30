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
const bot_1 = __importDefault(require("../services/bot"));
const scenes_1 = require("@vk-io/scenes");
const database_1 = require("../database");
const typeUserKeyboard_1 = __importDefault(require("../keyboards/typeUserKeyboard"));
const ifLoginKeyboard_1 = __importDefault(require("../keyboards/ifLoginKeyboard"));
bot_1.default.sceneManager.addScenes([
    new scenes_1.StepScene('start-scene', [
        (context) => {
            context.session.user = undefined;
            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Привет. Нужно ответить на пару вопросов. И так.\nВы ученик? Или учитель.',
                    keyboard: typeUserKeyboard_1.default
                });
            }
            if (context.messagePayload && (context.messagePayload.command === "pupil" || context.messagePayload.command === "teacher")) {
                context.scene.state.type = context.messagePayload.command;
                return context.scene.step.next();
            }
            else {
                return context.send({
                    message: 'Нужно нажать на кнопку.',
                    keyboard: typeUserKeyboard_1.default
                });
            }
        },
        (context) => {
            const { type } = context.scene.state;
            if (context.scene.step.firstTime || !context.text) {
                if (type === "pupil") {
                    return context.send({
                        message: 'Введите свою группу. Как указано на официальном сайте.\nПример: "107", "202", "10", "201-3", "517з"'
                    });
                }
                else if (type === "teacher") {
                    return context.send({
                        message: 'Введите свою фамилию и инициалы. Пример(Все знаки точки и пробелы учитываються, пишите в точности как в образце, только себя): \nКонобеев В.В.'
                    });
                }
            }
            context.scene.state.param = context.text;
            return context.scene.step.next();
        },
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            const { type, param } = yield context.scene.state;
            const user = yield database_1.users.asyncFindOne({ _id: context.peerId });
            if (user) {
                yield database_1.users.asyncUpdate({ _id: context.peerId }, {
                    $set: {
                        type: type,
                        param: param
                    }
                }, {});
            }
            else {
                yield database_1.users.asyncInsert({ _id: context.peerId, type: type, param: param });
            }
            return context.scene.step.next();
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("BOT: ", `new user register from by id - ${context.peerId}: type - ${context.scene.state.type}: param - ${context.scene.state.param}`);
            yield context.send({
                message: "Замечательно! Теперь вы можете получить своё расписание.",
                keyboard: ifLoginKeyboard_1.default
            });
            return context.scene.step.next();
        })
    ])
]);
