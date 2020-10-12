import Luxon from "./Luxon";
import axios from "axios"

export const getTable = async (context, date: Luxon) => {
    try {
        const response = await axios.post(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date.pin()}/${context.user.peer.param}`))
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
