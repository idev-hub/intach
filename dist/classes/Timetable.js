"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timetable = exports.setTemplate = void 0;
const axios_1 = __importDefault(require("axios"));
exports.setTemplate = (data) => {
    let template = ``;
    for (let i = 0; i < data.count; i++) {
        const item = data.items[i];
        template += `Пара: №${item.num}`;
        if (item.cabinet)
            template += ` - ${item.cabinet} кб.`;
        template += `\nДисциплина: ${item.discipline}\nПреподователь: ${item.teacher}\n\n`;
    }
    return template;
};
class Timetable {
    constructor(param) {
        this.param = param;
    }
    getTableTemplate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getTable(date);
            if (data.count > 0) {
                let template = exports.setTemplate(data);
                template += `📅 ${date.pin()}, ${this.param.toUpperCase()}`;
                return template;
            }
            else {
                let template = `Раписание не найдено\n\n`;
                template += `📅 ${date.pin()}, ${this.param.toUpperCase()}`;
                return template;
            }
        });
    }
    getTable(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.post(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date.pin()}/${this.param}`));
                return {
                    count: response.data.length,
                    dayweek: {
                        name: date.weekday(),
                        num: date.local.weekday
                    },
                    items: response.data.map(item => {
                        let _item = {};
                        if (item.Groups)
                            _item["group"] = item.Groups;
                        if (item.Para)
                            _item["num"] = item.Para;
                        if (item.discip)
                            _item["discipline"] = item.discip;
                        if (item.prep)
                            _item["teacher"] = item.prep;
                        if (item.cab)
                            _item["cabinet"] = item.cab;
                        return _item;
                    })
                };
            }
            catch (error) {
                return new Error("Сервер не отвечает");
            }
        });
    }
}
exports.Timetable = Timetable;
