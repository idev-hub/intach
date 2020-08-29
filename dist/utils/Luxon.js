"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
class Luxon {
    /**
     * Расширение функционала времени
     * @param zone {string} - Строка со временой зоной
     * @param date {DateTime} - Дата и время
     **/
    constructor(zone = "Asia/Yekaterinburg", date = luxon_1.DateTime.local()) {
        /**
         * Возвращяет преобразованное в ISO формат время
         * @returns {string} Строка содержащяя время в ISO формате
         **/
        this.getISO = () => this.local.toISO();
        /**
         * Проверяет какой день недели в указаную дату
         * @returns {number} Номер дня недели от 1 до 7
         **/
        this.week = () => this.local.weekday;
        /**
         * Форматирует дату к указаному шаблону
         * @param format {string} Строка формата времени
         * @returns {string} Отформатированная в строку дата
         **/
        this.pin = (format = 'dd.LL.yyyy') => this.local.toFormat(format);
        this.local = date;
        if (zone)
            this.local.setZone(zone);
    }
    /**
     * Добавляет указанное количество часов к текущему времени
     * @param _hours {number} Колличество часов
     * @returns {Luxon} Luxon
     **/
    add(_hours) {
        this.local = this.local.plus({ hours: _hours });
        return this;
    }
    /**
     * Убавляет указанное количество часов у текущего времени
     * @param _hours {number} Колличество часов
     * @returns {Luxon} Luxon
     **/
    subtract(_hours) {
        this.local = this.local.minus({ hours: _hours });
        return this;
    }
}
exports.default = Luxon;
//# sourceMappingURL=Luxon.js.map