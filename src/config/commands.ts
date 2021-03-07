import { Bot } from "../core/Bot";
import { ButtonColor, Keyboard, MessageContext } from "vk-io";
import { getCollegeGroups, timetable } from "../services/CollegeService";
import { DateTime } from "luxon";
import getImageWeekDay from "../utils/getImageWeekDay";
import isInbox from "../middlewares/hearer/isInbox";
import isOutbox from "../middlewares/hearer/isOutbox";
import { getClient, setClient } from "../services/ClientService";
import subarray from "../utils/subarray";

export default ((app: Bot) => {

    /**
     * Команда ТЕСТ
     * Обновление или добавление личных данных пользователя
     * @beta
     **/
    app.hear("test", [ new RegExp(/^(test|тест)/i) ], [
        isInbox,
        async (context: MessageContext) => {
            const arr = []
            for ( let i = 0; i < 101; i++ ) {
                arr.push(i)
            }
            return context.send({
                message: 'hi',
                keyboard: Keyboard.keyboard(subarray(arr, 5, 8).map(_arr => {
                    return _arr.map(_item => {
                        return Keyboard.textButton({
                            label: _item
                        })
                    })
                }))
            })
        }
    ])


    /**
     * Команда СМЕНИТЬ ГРУППУ/ФАМИЛИЮ
     * Обновление личных данных пользователя
     * ТОЛЬКО ДЛЯ АДМИНИСТРАЦИИ
     * @beta
     **/
    app.hear("start", [ new RegExp(/^@(.*)/i) ], [
        isOutbox,
        async (context: MessageContext) => {
            try {
                const user = context.senderId
                const param = context.$match[1]

                const client = await getClient(user)
                if ( client ) {
                    await setClient({ peer_id: user.toString(), param: param })
                    return context.editMessage({
                        message: `Вам изменили группу с ${ client.param } на ${ param }.`
                    })
                }
            } catch ( e ) {
                return context.editMessage({
                    message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                })
            }
        }
    ])

    /**
     * Команда НАЧАТЬ
     * Обновление или добавление личных данных пользователя
     * @beta
     **/
    app.hear("start", [ new RegExp(/^(начать|start)/i) ], [
        isInbox,
        (context: MessageContext) => context.scene.enter("start-scene")
    ])

    /**
     * Команда ВЧЕРА
     * Команда получения расписания
     * @beta
     **/
    app.hear("yesterday", [ new RegExp(/^(вчера|в|d|yesterday)/i) ], [
        isInbox,
        async (context: MessageContext) => {
            try {
                const date = DateTime.now().minus({ days: 1 }),
                    { college_id, param } = context.session.client

                return context.send({
                    message: await timetable(parseInt(college_id), param.toString(), date),
                    keyboard: Keyboard.keyboard([ [
                        Keyboard.textButton({
                            color: ButtonColor.PRIMARY,
                            label: 'Сегодня',
                            payload: { command: 'today' }
                        }),
                        Keyboard.textButton({
                            color: ButtonColor.POSITIVE,
                            label: 'Завтра',
                            payload: { command: 'tomorrow' }
                        })
                    ] ]).inline(),
                    attachment: getImageWeekDay(date)
                })
            } catch ( e ) {
                return context.send("Упс... Что-то пошло не так. Ошибка: " + e.toString())
            }
        }
    ])

    /**
     * Команда СЕГОДНЯ
     * Команда получения расписания
     * @beta
     **/
    app.hear("today", [ new RegExp(/^(сегодня|с|c|today)/i) ], [
        isInbox,
        async (context: MessageContext) => {
            try {
                const date = DateTime.now(),
                    { college_id, param } = context.session.client
                return context.send({
                    message: await timetable(parseInt(college_id), param.toString(), date),
                    keyboard: Keyboard.keyboard([ [
                        Keyboard.textButton({
                            color: ButtonColor.NEGATIVE,
                            label: 'Вчера',
                            payload: { command: 'yesterday' }
                        }),
                        Keyboard.textButton({
                            color: ButtonColor.POSITIVE,
                            label: 'Завтра',
                            payload: { command: 'tomorrow' }
                        })
                    ] ]).inline(),
                    attachment: getImageWeekDay(date)
                })
            } catch ( e ) {
                return context.send("Упс... Что-то пошло не так. Ошибка: " + e.toString())
            }
        }
    ])

    /**
     * Команда ЗАВТРА
     * Команда получения расписания
     * @beta
     **/
    app.hear("tomorrow", [ new RegExp(/^(завтра|з|p|tomorrow)/i) ], [
        isInbox,
        async (context: MessageContext) => {
            try {
                const date = DateTime.now().plus({ days: 1 }),
                    { college_id, param } = context.session.client
                return context.send({
                    message: await timetable(parseInt(college_id), param.toString(), date),
                    keyboard: Keyboard.keyboard([ [
                        Keyboard.textButton({
                            color: ButtonColor.PRIMARY,
                            label: 'Сегодня',
                            payload: { command: 'today' }
                        }),
                        Keyboard.textButton({
                            color: ButtonColor.POSITIVE,
                            label: 'Послезавтра',
                            payload: { command: 'after_tomorrow' }
                        })
                    ] ]).inline(),
                    attachment: getImageWeekDay(date)
                })
            } catch ( e ) {
                return context.send("Упс... Что-то пошло не так. Ошибка: " + e.toString())
            }
        }
    ])

    /**
     * Команда ПОСЛЕЗАВТРА
     * Команда получения расписания
     * @beta
     **/
    app.hear("after_tomorrow", [ new RegExp(/^(послезавтра|пз|gp|after_tomorrow)/i) ], [
        isInbox,
        async (context: MessageContext) => {
            try {
                const date = DateTime.now().plus({ days: 2 }),
                    { college_id, param } = context.session.client

                return context.send({
                    message: await timetable(parseInt(college_id), param.toString(), date),
                    keyboard: Keyboard.keyboard([ [
                        Keyboard.textButton({
                            color: ButtonColor.PRIMARY,
                            label: 'Сегодня',
                            payload: { command: 'today' }
                        }),
                        Keyboard.textButton({
                            color: ButtonColor.POSITIVE,
                            label: 'Завтра',
                            payload: { command: 'tomorrow' }
                        })
                    ] ]).inline(),
                    attachment: getImageWeekDay(date)
                })
            } catch ( e ) {
                return context.send("Упс... Что-то пошло не так. Ошибка: " + e.toString())
            }
        }
    ])
})
