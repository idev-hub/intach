"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = (arr) => {
    let result = [];
    for (let str of arr) {
        if (!result.includes(str)) {
            result.push(str);
        }
    }
    return result;
};
//# sourceMappingURL=ArrayService.js.map