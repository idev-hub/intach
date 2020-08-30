"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Typify {
    constructor(_json, _toJson) {
        this.typifyJson = () => {
            if (this.json) {
                if (Array.isArray(this.json)) {
                    for (let obj of this.json) {
                        this.array.push(this.toLine(obj, this.toJson));
                    }
                }
                else {
                    this.array.push(this.toLine(this.json, this.toJson));
                }
            }
            return this.array;
        };
        this.toLine = (obj1, obj2) => {
            let data = {};
            Object.keys(obj1).map((key, index) => {
                Object.keys(obj2).map((toKey) => {
                    if (index == obj2[toKey])
                        data[toKey] = obj1[key];
                });
            });
            return data;
        };
        this.json = _json;
        this.toJson = _toJson;
        this.array = [];
    }
}
exports.default = Typify;
