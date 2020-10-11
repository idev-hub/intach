"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainKeyboard = void 0;
const vk_io_1 = require("vk-io");
exports.mainKeyboard = vk_io_1.Keyboard.keyboard([
    [
        vk_io_1.Keyboard.textButton({
            label: "Послезавтра",
            color: vk_io_1.Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "after-tomorrow"
            }
        }),
        vk_io_1.Keyboard.textButton({
            label: "Сегодня",
            color: vk_io_1.Keyboard.PRIMARY_COLOR,
            payload: {
                command: "today"
            }
        }),
        vk_io_1.Keyboard.textButton({
            label: "Завтра",
            color: vk_io_1.Keyboard.POSITIVE_COLOR,
            payload: {
                command: "tomorrow"
            }
        })
    ],
    [
        vk_io_1.Keyboard.textButton({
            label: "На неделю",
            color: vk_io_1.Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "week"
            }
        }),
        vk_io_1.Keyboard.textButton({
            label: "Другое",
            color: vk_io_1.Keyboard.POSITIVE_COLOR,
            payload: {
                command: "other"
            }
        })
    ]
]);
