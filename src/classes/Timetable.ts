import Luxon from "./Luxon";
import axios from "axios"

export const setTemplate = (data) => {
    let template = ``

    for (let i = 0; i < data.count; i++) {
        const item = data.items[i]
        template += `Пара: №${item.num}`
        if (item.cabinet) template += ` - ${item.cabinet} кб.`
        template += `\nДисциплина: ${item.discipline}\nПреподователь: ${item.teacher}\n\n`
    }

    return template
}

export class Timetable {
    public readonly param

    constructor(param) {
        this.param = param
    }

    public async getTableTemplate(date: Luxon) {
        const data = await this.getTable(date)
        console.log(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date.pin()}/${this.param}`))
        if (data.count > 0) {
            let template = setTemplate(data)
            template += `📅 ${date.pin()}, ${this.param.toUpperCase()}`
            return template
        } else {
            let template = `Раписание не найдено\n\n`
            template += `📅 ${date.pin()}, ${this.param.toUpperCase()}`
            return template
        }
    }

    public async getTable(date: Luxon): Promise<any> {
        try {
            const response = await axios.post(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date.pin()}/${this.param}`))
            return {
                count: response.data.length,
                dayweek: {
                    name: date.weekday(),
                    num: date.local.weekday
                },
                items: response.data.map(item => {
                    let _item = {}
                    if (item.Groups) _item["group"] = item.Groups
                    if (item.Para) _item["num"] = item.Para
                    if (item.discip) _item["discipline"] = item.discip
                    if (item.prep) _item["teacher"] = item.prep
                    if (item.cab) _item["cabinet"] = item.cab
                    return _item
                })
            }
        } catch (error) {
            return new Error("Сервер не отвечает")
        }
    }
}
