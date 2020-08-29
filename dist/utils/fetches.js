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
const node_fetch_1 = __importDefault(require("node-fetch"));
/*
* Получение расписания для учеников по дате и группе
* */
exports.getTimetableOfGroup = (date, group) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dates = yield exports.getAllDates();
        if (dates.status === 0) {
            if (dates.response.indexOf(date, 0) != -1) {
                const response = yield node_fetch_1.default(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date}/${group}`), {
                    method: 'POST'
                });
                return {
                    status: 0,
                    response: yield response.json()
                };
            }
            else {
                throw (new Error("На этот день расписание отсутствует"));
            }
        }
        else {
            throw (new Error("Ошибка получения доступных дат"));
        }
    }
    catch (e) {
        return {
            status: 1,
            response: e
        };
    }
});
/*
* Получение расписания для учителей по дате и фамилии
* */
exports.getTimetableOfTeacher = (date, family) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(encodeURI(`https://api.chgpgt.ru/api/getRaspisanPrepod/${date}/${family}`), {
            method: 'POST'
        });
        return {
            status: 0,
            response: yield response.json()
        };
    }
    catch (e) {
        return {
            status: 1,
            response: e
        };
    }
});
/*
* Получение списка преподователей
* */
exports.getTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(encodeURI(`https://api.chgpgt.ru/api/getprepod`), {
            method: 'POST'
        });
        return {
            status: 0,
            response: yield response.json()
        };
    }
    catch (e) {
        return {
            status: 1,
            response: e
        };
    }
});
/*
* Получение всех дат расписания
* */
exports.getAllDates = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(encodeURI(`https://api.chgpgt.ru/api/getAllDates`), {
            method: 'POST'
        });
        return {
            status: 0,
            response: yield response.json()
        };
    }
    catch (e) {
        return {
            status: 1,
            response: e
        };
    }
});
/*
* Получение минимальной и максимальной даты расписания
* */
exports.getMinMaxDate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield node_fetch_1.default(encodeURI(`https://api.chgpgt.ru/api/minMaxDate`), {
            method: 'POST'
        });
        return {
            status: 0,
            response: yield response.json()
        };
    }
    catch (e) {
        return {
            status: 1,
            response: e
        };
    }
});
//# sourceMappingURL=fetches.js.map