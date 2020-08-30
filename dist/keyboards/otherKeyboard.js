"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
exports.default = vk_io_1.Keyboard.builder()
    .textButton({
    label: "Обновить личные данные",
    payload: {
        command: "start"
    },
    color: vk_io_1.Keyboard.PRIMARY_COLOR
})
    .row()
    .textButton({
    label: "Инструкция по боту",
    payload: {
        command: "help"
    },
    color: vk_io_1.Keyboard.SECONDARY_COLOR
})
    .inline();
