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
const bot_1 = __importDefault(require("../bot"));
const otherKeyboard_1 = __importDefault(require("../keyboards/otherKeyboard"));
const ifLoginKeyboard_1 = __importDefault(require("../keyboards/ifLoginKeyboard"));
const Luxon_1 = __importDefault(require("../utils/Luxon"));
const timetable_1 = require("../services/timetable");
const vk_io_1 = require("vk-io");
const commands = [
    {
        name: "start",
        description: "Команда добавления/обновления личных данных.",
        handler: (context) => {
            return context.scene.enter("start-scene");
        }
    },
    {
        name: "keyboard",
        description: "Если у вас каким-то образом пропала клавиатура, её можно обновить этой коммандой.",
        handler: (context) => {
            return context.send({
                message: "Клавиатура обновлена!",
                keyboard: ifLoginKeyboard_1.default
            });
        }
    },
    {
        name: "yesterday",
        description: "Команда получения расписания за ВЧЕРА.",
        handler: (context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.send({
                message: yield timetable_1.getTimetable(context, new Luxon_1.default().subtract(24).pin()),
                keyboard: vk_io_1.Keyboard.builder()
                    .textButton({
                    label: "Завтра",
                    payload: {
                        command: "tomorrow"
                    },
                    color: vk_io_1.Keyboard.POSITIVE_COLOR
                })
                    .inline()
            });
        })
    },
    {
        name: "today",
        description: "Команда получения расписания за СЕГОДНЯ.",
        handler: (context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.send({
                message: yield timetable_1.getTimetable(context, new Luxon_1.default().pin()),
                keyboard: vk_io_1.Keyboard.builder()
                    .textButton({
                    label: "Завтра",
                    payload: {
                        command: "tomorrow"
                    },
                    color: vk_io_1.Keyboard.POSITIVE_COLOR
                }).inline()
            });
        })
    },
    {
        name: "tomorrow",
        description: "Команда получения расписания на ЗАВТРА.",
        handler: (context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.send({
                message: yield timetable_1.getTimetable(context, new Luxon_1.default().add(24).pin()),
                keyboard: vk_io_1.Keyboard.builder()
                    .textButton({
                    label: "Послезавтра",
                    payload: {
                        command: "after-tomorrow"
                    },
                    color: vk_io_1.Keyboard.POSITIVE_COLOR
                })
                    .inline()
            });
        })
    },
    {
        name: "after-tomorrow",
        description: "Команда получения расписания на ПОСЛЕЗАВТРА.",
        handler: (context) => __awaiter(void 0, void 0, void 0, function* () {
            return context.send({
                message: yield timetable_1.getTimetable(context, new Luxon_1.default().add(48).pin()),
                keyboards: vk_io_1.Keyboard.builder()
                    .textButton({
                    label: "Завтра",
                    payload: {
                        command: "tomorrow"
                    },
                    color: vk_io_1.Keyboard.POSITIVE_COLOR
                })
                    .inline()
            });
        })
    },
];
for (const command of commands) {
    if (!command["not"])
        bot_1.default.command(command.name, command.handler);
}
bot_1.default.command('help', (context) => {
    let template = "";
    for (const command of commands) {
        template += `["/${command.name}"] - ${command.description}\n`;
    }
    return context.send(template);
});
bot_1.default.command('other', (context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.send({
        message: "Еще команды:",
        keyboard: otherKeyboard_1.default
    });
}));
bot_1.default.command('date', /^\/date (.+)/i, (context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.send("Данная функция еще не реализована.");
}));
