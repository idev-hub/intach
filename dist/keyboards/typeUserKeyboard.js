"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
exports.default = vk_io_1.Keyboard.builder().textButton({
    label: "Ученик",
    payload: {
        command: 0
    },
    color: vk_io_1.Keyboard.POSITIVE_COLOR
}).textButton({
    label: "Учитель",
    payload: {
        command: 1
    },
    color: vk_io_1.Keyboard.PRIMARY_COLOR
}).oneTime();
