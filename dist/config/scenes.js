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
const vk_io_1 = require("vk-io");
const keyboards_1 = require("./keyboards");
const Peer_1 = __importDefault(require("../models/Peer"));
const SubscribeNews_1 = __importDefault(require("../models/SubscribeNews"));
bot_1.default.sceneManager.addScenes([
    new scenes_1.StepScene('start-scene', [
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.scene.step.firstTime || !context.text) {
                yield context.setActivity();
                context.session.peer = undefined;
                yield context.send({
                    message: "Для нормальной работы бота Вам нужно ввести свою группу.\n",
                    keyboard: vk_io_1.Keyboard.builder().oneTime()
                });
            }
            return context.scene.step.next();
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.scene.step.firstTime || !context.text) {
                yield context.setActivity();
                return context.send({
                    message: "Введите Вашу группу.",
                    keyboard: vk_io_1.Keyboard.builder().textButton({
                        label: "Подробнее",
                        color: vk_io_1.Keyboard.PRIMARY_COLOR,
                        payload: {
                            command: "detail"
                        }
                    }).inline()
                });
            }
            if (context.messagePayload && context.messagePayload.command === "detail") {
                yield context.setActivity();
                return context.reply({
                    message: "Необходимо ввести свою группу в точности как указано на сайте к примеру \"407\", \"102-тэоэ\".\n\n" +
                        "Если группа будет введена не верно, бот не сможет найти Ваше расписание, но вы можете запросто ввести свой данные заново - написав \"Начать\"\n\n" +
                        "Как правильно:\n" +
                        "✔ 107\n" +
                        "✔ 10\n" +
                        "✔ 201-3\n" +
                        "✔ 517з\n" +
                        "\n" +
                        "Как НЕ правильно:\n" +
                        "❌ \"107\"\n" +
                        "❌ группа 201-3"
                });
            }
            context.scene.state.param = context.text.toLowerCase().trim().replace(/\s/g, '');
            return context.scene.step.next();
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            yield context.setActivity();
            const peer = yield Peer_1.default.findOne({
                where: {
                    peerId: context.peerId
                }
            });
            if (peer) {
                yield peer.update({
                    peerId: context.peerId,
                    param: context.scene.state.param
                });
            }
            else {
                yield Peer_1.default.create({
                    peerId: context.peerId,
                    param: context.scene.state.param
                });
            }
            const subscribe = yield SubscribeNews_1.default.findOne({
                where: {
                    peerId: context.peerId
                }
            });
            if (!subscribe) {
                yield SubscribeNews_1.default.create({
                    peerId: context.peerId,
                    param: true
                });
            }
            yield context.send({
                message: 'Поздравлем!\n' +
                    'Теперь Вы можете полноценно пользоваться ботом.',
                keyboard: keyboards_1.mainKeyboard
            });
            yield context.send({
                message: 'Напишите "Сегодня" или "Завтра", что бы узнать своё расписание.',
                keyboard: vk_io_1.Keyboard.builder().textButton({
                    label: "Сегодня",
                    color: vk_io_1.Keyboard.PRIMARY_COLOR
                }).textButton({
                    label: "Завтра",
                    color: vk_io_1.Keyboard.POSITIVE_COLOR
                }).inline()
            });
            return context.scene.step.next();
        })
    ])
]);
