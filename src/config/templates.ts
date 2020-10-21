import Luxon from "../classes/Luxon";
import {getTable} from "../classes/Timetable";

export namespace templates {
    export const disciplineTemplate = (context, data) => {
        const {lang} = context

        let template = ``

        for (let i = 0; i < data.count; i++) {
            const item = data.items[i]
            template += `- ${lang["timetable"]["num"]}${item.num}`
            if (item.cabinet) template += ` - ${item.cabinet} ${lang["timetable"]["cabinet"]}`
            template += `\n- ${lang["timetable"]["discipline"]}${item.discipline}\n- ${lang["timetable"]["teacher"]}${item.teacher}\n\n`
        }

        return template
    }

    export const tableTemplate = async (context, date: Luxon) => {
        const {lang} = context
        const data = await getTable(context, date)
        let template: string = `📅 ${context.user.peer.param.toUpperCase()}, ${date.pin()}\n\n`

        if (data["count"] > 0)
            template += disciplineTemplate(context, data)
        else
            template += lang["not_found"]

        return template
    }
}


