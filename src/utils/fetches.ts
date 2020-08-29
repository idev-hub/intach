import fetch from "node-fetch"

/*
* Получение расписания для учеников по дате и группе
* */
export const getTimetableOfGroup = async (date: string, group: string) => {
    try {
        const dates = await getAllDates()
        if(dates.status === 0){
            if(dates.response.indexOf(date, 0) != -1){
                const response = await fetch(encodeURI(`https://api.chgpgt.ru/api/getRaspisanGroups/${date}/${group}`), {
                    method: 'POST'
                })

                return {
                    status: 0,
                    response: await response.json()
                }
            } else {
                throw(new Error("На этот день расписание отсутствует"))
            }
        } else {
            throw(new Error("Ошибка получения доступных дат"))
        }
    } catch (e) {
        return {
            status: 1,
            response: e
        }
    }
}

/*
* Получение расписания для учителей по дате и фамилии
* */
export const getTimetableOfTeacher = async (date: string, family: string) => {
    try {
        const response = await fetch(encodeURI(`https://api.chgpgt.ru/api/getRaspisanPrepod/${date}/${family}`), {
            method: 'POST'
        })

        return {
            status: 0,
            response: await response.json()
        }
    } catch (e) {
        return {
            status: 1,
            response: e
        }
    }
}

/*
* Получение списка преподователей
* */
export const getTeachers = async () => {
    try {
        const response = await fetch(encodeURI(`https://api.chgpgt.ru/api/getprepod`), {
            method: 'POST'
        })

        return {
            status: 0,
            response: await response.json()
        }
    } catch (e) {
        return {
            status: 1,
            response: e
        }
    }
}

/*
* Получение всех дат расписания
* */
export const getAllDates = async () => {
    try {
        const response = await fetch(encodeURI(`https://api.chgpgt.ru/api/getAllDates`), {
            method: 'POST'
        })

        return {
            status: 0,
            response: await response.json()
        }
    } catch (e) {
        return {
            status: 1,
            response: e
        }
    }
}

/*
* Получение минимальной и максимальной даты расписания
* */
export const getMinMaxDate = async () => {
    try {
        const response = await fetch(encodeURI(`https://api.chgpgt.ru/api/minMaxDate`), {
            method: 'POST'
        })

        return {
            status: 0,
            response: await response.json()
        }
    } catch (e) {
        return {
            status: 1,
            response: e
        }
    }
}
