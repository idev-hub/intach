import axios from "axios";
import { DateTime } from "luxon";

export const getColleges = async () => {
    return (await axios.get(`${ process.env.API }/colleges`)).data
}

export const getCollege = async (id: number) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }`)).data
}

export const getCollegeHandler = async (id: number) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }/handler`)).data
}

export const getCollegesByCity = async (id: number) => {
    return (await axios.get(`${ process.env.API }/colleges/city/${ id }`)).data
}

export const getCollegeGroups = async (id: number) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }/getGroups`)).data
}

export const getCollegeCorps = async (id: number) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }/getCorps`)).data
}

export const getCollegeLessons = async (id: number, param: string, date: string) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }/getLessons/${ param }/${ date }`)).data
}

export const getCollegeLessonsWeek = async (id: number, param: string, week: number) => {
    return (await axios.get(`${ process.env.API }/colleges/${ id }/getLessonsWeek/${ param }/${ week }`)).data
}

export const timetable = async (id: number, param: string, date: DateTime) => {
    const datestring = date.setLocale('ru').toFormat('dd.MM.yyyy')
    const table = await getCollegeLessons(id, param, datestring)
    let message = `📅 [ ${ datestring } ] - ${ date.setLocale('ru').toFormat('EEEE').toUpperCase() }`
    message += templateTimetable(table.data)

    return message
}

export const templateTimetable = (data: any) => {
    let message = `\n\n`

    if ( data.length > 0 ) {
        data.forEach(item => {
            message += `- Пара №${ item.number } - ${ item.cabinet }кб.\n`
            message += `- Дисциплина: ${ item.discipline }\n`
            message += `- Преподаватель: ${ item.teacher }\n`
            message += `\n`
        })
    }
    else {
        message += 'Не найдено...'
    }

    return message
}