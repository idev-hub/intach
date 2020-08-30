"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vk_io_1 = require("vk-io");
function GenerateKeyboards(items = [], rows = 4, columns = 5, coefficientColor = 3) {
    let keyboards = [], index = items.length;
    for (let r = 0; r < rows; r++) {
        let col = [];
        for (let c = 0; c < columns; c++) {
            index--;
            if (index >= 0) {
                col.push(vk_io_1.Keyboard.textButton({
                    label: items[index]["text"],
                    payload: { command: items[index]['command'] },
                    color: index % coefficientColor ? vk_io_1.Keyboard.POSITIVE_COLOR : vk_io_1.Keyboard.NEGATIVE_COLOR
                }));
            }
        }
        keyboards.push(col);
    }
    return keyboards;
}
exports.GenerateKeyboards = GenerateKeyboards;
