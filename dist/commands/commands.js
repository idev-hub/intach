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
const Users_1 = __importDefault(require("../database/models/Users"));
const bot_1 = __importDefault(require("../services/bot"));
const otherKeyboard_1 = __importDefault(require("../keyboards/otherKeyboard"));
const ifLoginKeyboard_1 = __importDefault(require("../keyboards/ifLoginKeyboard"));
const Luxon_1 = __importDefault(require("../utils/Luxon"));
const timetable_1 = require("../services/timetable");
const vk_io_1 = require("vk-io");
const Random_1 = require("../utils/Random");
bot_1.default.command('after-tomorrow', ["послезавтра", "пз"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.send({
        message: yield timetable_1.getTimetable(context, new Luxon_1.default().add(48).pin()),
        keyboard: vk_io_1.Keyboard.builder()
            .textButton({
            label: "Завтра",
            payload: {
                command: "tomorrow"
            },
            color: vk_io_1.Keyboard.POSITIVE_COLOR
        })
            .textButton({
            label: "Сегодня",
            payload: {
                command: "today"
            },
            color: vk_io_1.Keyboard.PRIMARY_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('tomorrow', ["завтра", "з"], (context) => __awaiter(void 0, void 0, void 0, function* () {
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
            .textButton({
            label: "Сегодня",
            payload: {
                command: "today"
            },
            color: vk_io_1.Keyboard.PRIMARY_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('today', ["сегодня", "с"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.send({
        message: yield timetable_1.getTimetable(context, new Luxon_1.default().pin()),
        keyboard: vk_io_1.Keyboard.builder()
            .textButton({
            label: "Завтра",
            payload: {
                command: "tomorrow"
            },
            color: vk_io_1.Keyboard.POSITIVE_COLOR
        })
            .textButton({
            label: "Послезавтра",
            payload: {
                command: "after-tomorrow"
            },
            color: vk_io_1.Keyboard.POSITIVE_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('yesterday', ["вчера", "в"], (context) => __awaiter(void 0, void 0, void 0, function* () {
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
            .textButton({
            label: "Сегодня",
            payload: {
                command: "today"
            },
            color: vk_io_1.Keyboard.PRIMARY_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('keyboard', ["клава", "клавиатура"], (context) => {
    return context.send({
        message: "Клавиатура обновлена!",
        keyboard: ifLoginKeyboard_1.default
    });
});
bot_1.default.command('start', ["начать", "start"], (context) => {
    return context.scene.enter("start-scene");
});
bot_1.default.command('other', ["прочее", "еще"], (context) => {
    return context.send({
        message: `Вы можете сообщить об ошибках в боте, предложить крутые идеи для него или просто пообщаться с админами, нажав на кнопку "Написать".\n`,
        keyboard: otherKeyboard_1.default
    });
});
bot_1.default.command('support', ["помощь", "помогите"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.default.findAll({ where: { perpermission: 2 } });
    for (let i = 0; i < users.length; i++) {
        yield bot_1.default.api.messages.send({
            peer_id: users[i].peerId,
            random_id: Random_1.randomInt(0, 31),
            message: `Вас запросил - @id${context.peerId}, ответьте ему.\nСсылка на беседу:\nvk.com/gim147858640?sel=${context.peerId}`
        });
    }
    return context.send("Заявка отправлена. Как только администоры увидят, они вам ответят.");
}));
bot_1.default.command('ban', /^\/ban (.+)/i, (context) => __awaiter(void 0, void 0, void 0, function* () {
    return context.send("Данная функция еще не реализована.");
}));
bot_1.default.command('admin', ["/admin/e4f58a805a6e1fd0f6bef58c86f9ceb3/2"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.default.findOne({ where: { peerId: context.peerId } });
    if (user) {
        yield user.update({ perpermission: 2 });
        return context.send("Успешно!");
    }
    else {
        return context.send("Ошибка!");
    }
}));
