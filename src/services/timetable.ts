import {getTimetableOfGroup, getTimetableOfTeacher} from "../utils/fetches";

export const translated = (type: number, array): string => {
    let template = ""

    if (type === 1) {
        if (array.length > 0){
            for (const item of array) {
                template += `\n\nПара: №${item.Para}\nГруппа: ${item.groups}\nДисциплина: ${item.Sokr_predmet} ${item.cabinet!=`\nКабинет: ${item.cabinet}`?``:''}`
            }
        } else template = `\n\n🔍 Расписание не найдено...`
    } else if (type === 0) {
        if (array.length > 0){
            for (const item of array) {
                template += `\n\nПара: №${item.Para}\nПреподователь: ${item.prep}\nДисциплина: ${item.discip} ${item.cabinet!=`\nКабинет: ${item.cabinet}`?``:''}`
            }
        } else template = `\n\n🔍 Расписание не найдено...`
    }

    return template
}

export const getTimetable = async (context, date) => {
    const {session} = context
    let timetable = {response: []}

    if (session.user.type === 0) timetable = await getTimetableOfGroup(date, session.user.param)
    else if (session.user.type === 1) timetable = await getTimetableOfTeacher(date, session.user.param)

    return `📅 Расписание для "${session.user.param}" на "${date}": ${translated(session.user.type, timetable.response)}`
}
