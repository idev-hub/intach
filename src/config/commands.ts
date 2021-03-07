import { Bot } from "../core/Bot";
import { ButtonColor, Keyboard, MessageContext } from "vk-io";
import { timetable } from "../services/CollegeService";
import { DateTime } from "luxon";
import getImageWeekDay from "../utils/getImageWeekDay";

export default ((app: Bot) => {
    /**
     * Команда НАЧАТЬ
     * Обновление или добавление личных данных пользователя
     * @beta
     **/
    app.hear("start", [ new RegExp(/^(начать|start)/i) ], [
        (context: MessageContext) => context.scene.enter("start-scene")
    ])

    /**
     * Команда ВЧЕРА
     * Команда получения расписания
     * @beta
     **/
    app.hear("yesterday", [ new RegExp(/^(вчера|в|d|yesterday)/i) ], [
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
