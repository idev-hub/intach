"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Typify {
    /**
     * Конструктор который принимает в себя два Json объекта для работы с внутреними функциями
     * @param _json {object} - То что нужно перевести
     * @param _toJson {object} - Во что нужно перевести
     **/
    constructor(_json, _toJson) {
        /**
         * Перебирает массив с данными и выполняет преоброзование из одного json объекта в другой
         * @returns {Array<object>} - Возвращяет новый массив преобразовынных объектов
         **/
        this.typifyJson = () => {
            if (this.json) { // Проверка на существование
                if (Array.isArray(this.json)) { // Проверка на массив
                    for (let obj of this.json) {
                        this.array.push(this.toLine(obj, this.toJson));
                    }
                }
                else { // Если это не массив
                    this.array.push(this.toLine(this.json, this.toJson));
                }
            }
            return this.array;
        };
        /**
         * Совершает преоброзование одного объекта в другой
         * @param obj1 {object} - Из чего нужно перевести
         * @param obj2 {object} - Во что нужно перевести
         * @returns {object} - Возвращяет преобразованный объект
         **/
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
//# sourceMappingURL=Typify.js.map