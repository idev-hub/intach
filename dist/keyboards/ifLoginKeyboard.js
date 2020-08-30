"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
exports.default = vk_io_1.Keyboard.builder()
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
    .textButton({
    label: "Вчера",
    payload: {
        command: "yesterday"
    },
    color: vk_io_1.Keyboard.NEGATIVE_COLOR
})
    .row()
    .textButton({
    label: "Послезавтра",
    payload: {
        command: "after-tomorrow"
    },
    color: vk_io_1.Keyboard.POSITIVE_COLOR
})
    .textButton({
    label: "Прочее",
    payload: {
        command: "other"
    },
    color: vk_io_1.Keyboard.NEGATIVE_COLOR
});
