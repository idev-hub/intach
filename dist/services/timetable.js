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
Object.defineProperty(exports, "__esModule", { value: true });
const fetches_1 = require("../utils/fetches");
exports.translated = (type, array) => {
    let template = "";
    if (type === 1) {
        if (array.length > 0) {
            for (const item of array) {
                template += `\n\nПара: №${item.Para}\nГруппа: ${item.groups}\nДисциплина: ${item.Sokr_predmet} ${item.cabinet != `\nКабинет: ${item.cabinet}` ? `` : ''}`;
            }
        }
        else
            template = `\n\n🔍 Расписание не найдено...`;
    }
    else if (type === 0) {
        if (array.length > 0) {
            for (const item of array) {
                template += `\n\nПара: №${item.Para}\nПреподователь: ${item.prep}\nДисциплина: ${item.discip} ${item.cabinet != `\nКабинет: ${item.cabinet}` ? `` : ''}`;
            }
        }
        else
            template = `\n\n🔍 Расписание не найдено...`;
    }
    return template;
};
exports.getTimetable = (context, date) => __awaiter(void 0, void 0, void 0, function* () {
    const { session } = context;
    let timetable = { response: [] };
    if (session.user.type === 0)
        timetable = yield fetches_1.getTimetableOfGroup(date, session.user.param);
    else if (session.user.type === 1)
        timetable = yield fetches_1.getTimetableOfTeacher(date, session.user.param);
    return `📅 Расписание для "${session.user.param}" на "${date}": ${exports.translated(session.user.type, timetable.response)}`;
});
