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
const vk_io_1 = require("vk-io");
const SubscribeNews_1 = __importDefault(require("../models/SubscribeNews"));
const random_1 = require("../utils/random");
const Luxon_1 = __importDefault(require("../classes/Luxon"));
const Timetable_1 = require("../classes/Timetable");
const getAttachmentDayWeek_1 = require("../utils/getAttachmentDayWeek");
bot_1.default.command("ok", ["ok", "ок"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.session.peer)
        context.session.peer = undefined;
}));
bot_1.default.command("start", ["начать", "start"], (context) => {
    return context.scene.enter("start-scene");
});
bot_1.default.command('today', ["сегодня", "today"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.setActivity();
    let table = new Timetable_1.Timetable(context.session.peer.param);
    const date = new Luxon_1.default();
    return context.send({
        message: yield table.getTableTemplate(date),
        attachment: getAttachmentDayWeek_1.getAttachmentDayWeek(date.week()),
        keyboard: vk_io_1.Keyboard.builder()
            .textButton({
            label: "Завтра",
            payload: {
                command: "tomorrow"
            },
            color: vk_io_1.Keyboard.POSITIVE_COLOR
        }).textButton({
            label: "Послезавтра",
            payload: {
                command: "after-tomorrow"
            },
            color: vk_io_1.Keyboard.NEGATIVE_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('tomorrow', ["завтра", "tomorrow"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.setActivity();
    const date = new Luxon_1.default().add(24);
    let table = new Timetable_1.Timetable(context.session.peer.param);
    return context.send({
        message: yield table.getTableTemplate(date),
        attachment: getAttachmentDayWeek_1.getAttachmentDayWeek(date.week()),
        keyboard: vk_io_1.Keyboard.builder()
            .textButton({
            label: "Сегодня",
            payload: {
                command: "today"
            },
            color: vk_io_1.Keyboard.PRIMARY_COLOR
        }).textButton({
            label: "Послезавтра",
            payload: {
                command: "after-tomorrow"
            },
            color: vk_io_1.Keyboard.NEGATIVE_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('after-tomorrow', ["послезавтра", "after-tomorrow"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.setActivity();
    let table = new Timetable_1.Timetable(context.session.peer.param);
    const date = new Luxon_1.default().add(48);
    return context.send({
        message: yield table.getTableTemplate(date),
        attachment: getAttachmentDayWeek_1.getAttachmentDayWeek(date.week()),
        keyboard: vk_io_1.Keyboard.builder()
            .textButton({
            label: "Сегодня",
            payload: {
                command: "today"
            },
            color: vk_io_1.Keyboard.PRIMARY_COLOR
        }).textButton({
            label: "Завтра",
            payload: {
                command: "tomorrow"
            },
            color: vk_io_1.Keyboard.POSITIVE_COLOR
        })
            .inline()
    });
}));
bot_1.default.command('week', ["На неделю", "week"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    yield context.setActivity();
    let table = new Timetable_1.Timetable(context.session.peer.param);
    let time = 0;
    for (let i = 0; i < 7; i++) {
        const date = new Luxon_1.default().add(time);
        if (date.week() !== 7) {
            const data = yield table.getTable(date);
            if (data.count > 0) {
                let template = Timetable_1.setTemplate(data);
                template += `📅 ${date.pin()}, ${context.session.peer.param.toUpperCase()}`;
                yield context.send({
                    message: template,
                    attachment: getAttachmentDayWeek_1.getAttachmentDayWeek(date.week()),
                });
            }
        }
        time += 24;
    }
    return context.send("⭕ Расписание закончилось ⭕");
}));
bot_1.default.command('subscribe-news', ["Подписаться на новости"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.session.peer.subscribe)
        context.session.peer.subscribe.param = true;
    const subscribe = yield SubscribeNews_1.default.findOne({ where: { peerId: context.peerId } });
    if (subscribe) {
        yield subscribe.update({ param: true });
    }
    else {
        yield SubscribeNews_1.default.create({ peerId: context.peerId, param: true });
    }
    return context.reply("Вы успешно подписались на новости бота.");
}));
bot_1.default.command('unsubscribe-news', ["Отписаться от новостей"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    if (context.session.peer.subscribe)
        context.session.peer.subscribe.param = false;
    const subscribe = yield SubscribeNews_1.default.findOne({ where: { peerId: context.peerId } });
    if (subscribe) {
        yield subscribe.update({ param: false });
    }
    else {
        yield SubscribeNews_1.default.create({ peerId: context.peerId, param: false });
    }
    return context.reply("Вы успешно отписались от новостей бота.");
}));
bot_1.default.command('call', ["Вызвать администрацию"], (context) => __awaiter(void 0, void 0, void 0, function* () {
    const admins = yield bot_1.default.api.groups.getMembers({
        group_id: process.env.GROUP_ID,
        filter: "managers"
    });
    yield bot_1.default.api.messages.send({
        user_ids: admins.items.map(i => i["id"]),
        random_id: random_1.randomInt(0, 31),
        message: `@id${context.peerId} - вызвал админа.`,
        keyboard: vk_io_1.Keyboard.builder().urlButton({
            label: "Открыть чат",
            url: `https://vk.com/gim${process.env.GROUP_ID}?sel=${context.peerId}`
        }).inline()
    });
    return context.reply({
        message: "Администрация спешит на помощь!\n" +
            "Пожалуйста ожидайте"
    });
}));
bot_1.default.command('other', ["другое", "other"], (context) => {
    return context.send({
        message: `Другие возможности:

📌 Нужна справка по боту?
Нажмите "Справка по боту" и откроется статья с описанием бота, его команд и возможностей. В справке так же содержатся ответы на популярные вопросы.

🆘 Возникли проблемы? Или Вы хотите предложить хорошую идею для бота? 
Нажмите "Вызвать администрацию" и мы Вам ответим.

🆘 Ошиблись при вводе данных? Хотите сменить группу
Нажмите "Сбросить данные".

${context.session.peer.subscribe.param
            ? `🚀 Больше не хотите быть вкурсе всех новостей бота?
Нажмите на кнопку "Отписаться от новостей".`
            : `🚀 Хотите быть вкурсе всех новостей бота?
Нажмите на кнопку "Подписаться на новости" и узнавайте первыми о новостях группы и обновлениях бота.`}`,
        keyboard: vk_io_1.Keyboard.builder().textButton({
            label: "Вызвать администрацию",
            color: vk_io_1.Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "call"
            }
        }).row().textButton({
            label: context.session.peer.subscribe.param ? "Отписаться от новостей" : "Подписаться на новости",
            color: context.session.peer.subscribe.param ? vk_io_1.Keyboard.SECONDARY_COLOR : vk_io_1.Keyboard.POSITIVE_COLOR,
            payload: {
                command: context.session.peer.subscribe.param ? "unsubscribe-news" : "subscribe-news"
            }
        }).row().urlButton({
            label: "Справка по боту",
            url: "https://vk.com/@in_teach-spravka-po-botu"
        }).row().textButton({
            label: "Сбросить данные",
            color: vk_io_1.Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "start"
            }
        }).inline()
    });
});
