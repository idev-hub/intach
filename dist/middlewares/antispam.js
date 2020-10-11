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
exports.default = (context, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { session, createdAt, text } = context;
    const { pastMessage } = session;
    const sec = 10;
    if (session.pastMessage) {
        if (text === pastMessage.text) {
            if (((createdAt - pastMessage.createdAt) - sec) < 0) {
                return context.reply({
                    message: "⚠ Предупреждаем. ⚠ \n\n" +
                        "За спам могут выдать блокировку.\n" +
                        "Прежде чем повторять тот же запрос убедитесь, нужно ли Вам это, ведь ответ на тот же запрос не изменится\n\n" +
                        "Если бот не отправляет Вам расписание, проверьте корректность Ваших данных. Чтобы поменять данные - напишите \"Начать\".\n\n" +
                        "Если вы уверены, что всё верно и на сайте присутствует расписание на запрашиваемый день, напишите нашей администрации, мы постараемся Вам помочь",
                    keyboard: vk_io_1.Keyboard.builder().textButton({
                        label: "Вызвать администрацию",
                        color: vk_io_1.Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "call"
                        }
                    }).textButton({
                        label: "Начать",
                        color: vk_io_1.Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "start"
                        }
                    }).inline()
                });
            }
            else {
                session.pastMessage = context;
            }
        }
        else {
            session.pastMessage = context;
        }
    }
    else {
        session.pastMessage = context;
    }
    return next();
});
