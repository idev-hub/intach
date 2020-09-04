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
const typeUserKeyboard_1 = __importDefault(require("../keyboards/typeUserKeyboard"));
const ifLoginKeyboard_1 = __importDefault(require("../keyboards/ifLoginKeyboard"));
const Users_1 = __importDefault(require("../database/models/Users"));
const ArrayService_1 = require("../utils/ArrayService");
const GenerateKeyboards_1 = require("../utils/GenerateKeyboards");
const vk_io_1 = require("vk-io");
const fetches_1 = require("../utils/fetches");
bot_1.default.sceneManager.addScenes([
    new scenes_1.StepScene('start-scene', [
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            yield context.setActivity();
            context.session.user = undefined;
            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Привет. Нужно ответить на пару вопросов. И так.\nВы ученик? Или учитель.',
                    keyboard: typeUserKeyboard_1.default
                });
            }
            if (context.text === "ученик") {
                context.scene.state.type = 0;
                return context.scene.step.next();
            }
            else if (context.text === "учитель") {
                context.scene.state.type = 1;
                return context.scene.step.next();
            }
            else {
                return context.send({
                    message: 'Введите учитель или ученик. Или воспользуйтесь клавиатурой.',
                    keyboard: typeUserKeyboard_1.default
                });
            }
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            yield context.setActivity();
            const { type } = context.scene.state;
            if (context.scene.step.firstTime || !context.text) {
                if (type === 0) {
                    const users = yield Users_1.default.findAll({ where: { type: 0 } });
                    const groups = ArrayService_1.unique(users.map((user) => user["param"]));
                    return context.send({
                        message: '&#128221; Введите свою группу. Как указано на официальном сайте.\n\nКак правильно:\n&#10004; 107\n&#10004; 10\n&#10004; 201-3\n&#10004; 517з\n\nКак НЕ правильно:\n&#10060; "107"\n&#10060; группа 201-3',
                        keyboard: vk_io_1.Keyboard.keyboard(GenerateKeyboards_1.GenerateKeyboards(groups.map((_group) => {
                            return {
                                command: _group,
                                text: _group
                            };
                        }), 10, 4, 2))
                    });
                }
                else if (type === 1) {
                    const teachers = yield fetches_1.getTeachers();
                    const families = ArrayService_1.unique(teachers.response.map((teacher) => {
                        return teacher["FIO"].split(" ").map((n, pos) => {
                            if (pos === 0)
                                return `${n} `;
                            else
                                return `${n[0]}.`;
                        }).join("");
                    })).sort(() => Math.random() - 0.5);
                    return context.send({
                        message: '&#128221; Введите свою фамилию и инициалы.\n\nКак правильно:\n&#10004; Конобеев В.В.\n &#10004; Дятлова Л.И.\n &#10004; Еркибаева Л.Х.\n\nКак НЕ правильно:\n&#10060; Конобеев В.В \n&#10060; Дятлова Л И\n&#10060; Еркибаева',
                        keyboard: vk_io_1.Keyboard.keyboard(GenerateKeyboards_1.GenerateKeyboards(families.map((_family) => {
                            return {
                                command: _family,
                                text: _family
                            };
                        }), 10, 3, 2))
                    });
                }
            }
            context.scene.state.param = context.text;
            return context.scene.step.next();
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            yield context.setActivity();
            const { type, param } = yield context.scene.state;
            const user = yield Users_1.default.findOne({ where: { peerId: context.peerId } });
            if (user) {
                yield user.update({ type: type, param: param });
            }
            else {
                yield Users_1.default.create({ peerId: context.peerId, type: type, param: param });
            }
            return context.scene.step.next();
        }),
        (context) => __awaiter(void 0, void 0, void 0, function* () {
            yield context.send({
                message: "Замечательно! Теперь вы можете получить своё расписание.",
                keyboard: ifLoginKeyboard_1.default
            });
            return context.scene.step.next();
        })
    ])
]);
