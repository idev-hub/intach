"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
class Luxon {
    constructor(zone = "Asia/Yekaterinburg", date = luxon_1.DateTime.local()) {
        this.getISO = () => this.local.toISO();
        this.week = () => this.local.weekday;
        this.pin = (format = 'dd.LL.yyyy') => this.local.toFormat(format);
        this.local = date;
        if (zone)
            this.local.setZone(zone);
    }
    add(_hours) {
        this.local = this.local.plus({ hours: _hours });
        return this;
    }
    subtract(_hours) {
        this.local = this.local.minus({ hours: _hours });
        return this;
    }
}
exports.default = Luxon;
