import { StepScene } from "@vk-io/scenes";
import { Keyboard, MessageContext } from "vk-io";
import { Bot } from "../core/Bot";
import { getCitiesByRegion, searchCity } from "../services/CityService";
import { getRegions } from "../services/RegionService";
import { getCollegeHandler, getCollegesByCity } from "../services/CollegeService";
import { getClient, setClient } from "../services/ClientService";
import { DateTime } from "luxon";
export default (then: Bot) => {
    then.sceneManager.addScenes([
        new StepScene('start-scene', [
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const user = await then.api.users.get({
                            user_ids: context.peerId.toString(),
                            fields: [ 'sex', 'country', 'city' ]
                        })
                        if ( user && user[0] ) {
                            context.scene.state.user = user[0]
                            context.scene.state.sex = user[0].sex

                            if ( user[0].city && user[0].city.title ) {
                                const city = await searchCity(user[0].city.title)
                                if ( city ) {
                                    context.scene.state._city = city
                                    return context.send({
                                        message: `Ваш город ${ city.name }?`,
                                        keyboard: Keyboard.keyboard([ [
                                            Keyboard.textButton({
                                                color: Keyboard.POSITIVE_COLOR,
                                                payload: {
                                                    type: 'yes'
                                                },
                                                label: "Да"
                                            }),
                                            Keyboard.textButton({
                                                color: Keyboard.NEGATIVE_COLOR,
                                                payload: {
                                                    type: 'no'
                                                },
                                                label: "Нет"
                                            })
                                        ] ])
                                    })
                                }
                                else {
                                    return context.scene.step.next()
                                }
                            }
                            else {
                                return context.scene.step.next()
                            }
                        }
                        else {
                            return context.scene.step.next()
                        }
                    }

                    if ( context.messagePayload && context.messagePayload.type ) {
                        if ( context.messagePayload.type === 'no' ) {
                            return context.scene.step.next()
                        }
                        else {
                            context.scene.state.region = context.scene.state._city.region_id
                            context.scene.state.city = context.scene.state._city.id
                            return context.scene.step.go(3)
                        }
                    }
                    else {
                        return context.send('Пожалуйста воспользуйтесь клавиатурой.')
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Определение города, получение первичной информации
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const regions = await getRegions()
                        return context.send({
                            message: "Выберите необходимый регион: ",
                            keyboard: Keyboard.keyboard([
                                ...regions.data.map(region => {
                                    return Keyboard.textButton({
                                        label: region.name,
                                        color: Keyboard.PRIMARY_COLOR,
                                        payload: {
                                            region: region.id
                                        }
                                    })
                                })
                            ])
                        })
                    }

                    if ( context.messagePayload && context.messagePayload.region ) {
                        context.scene.state.region = context.messagePayload.region
                        return context.scene.step.next()
                    }
                    else {
                        return context.send('Пожалуйста воспользуйтесь клавиатурой.')
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Выбор региона
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const cities = await getCitiesByRegion(context.messagePayload.region)
                        return context.send({
                            message: "Выберите необходимый город: ",
                            keyboard: Keyboard.keyboard([
                                cities.map(city => {
                                    return Keyboard.textButton({
                                        label: city.name,
                                        color: Keyboard.PRIMARY_COLOR,
                                        payload: {
                                            city: city.id
                                        }
                                    })
                                })
                            ])
                        })
                    }

                    if ( context.messagePayload && context.messagePayload.city ) {
                        context.scene.state.city = context.messagePayload.city
                        return context.scene.step.next()
                    }
                    else {
                        return context.send('Пожалуйста воспользуйтесь клавиатурой.')
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Выбор города
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const colleges = await getCollegesByCity(context.scene.state.city)
                        return context.send({
                            message: "Выберите необходимый колледж: ",
                            keyboard: Keyboard.keyboard([
                                colleges.map(college => {
                                    return Keyboard.textButton({
                                        label: college.name,
                                        color: Keyboard.PRIMARY_COLOR,
                                        payload: {
                                            college: college.id
                                        }
                                    })
                                })
                            ])
                        })
                    }

                    if ( context.messagePayload && context.messagePayload.college ) {
                        context.scene.state.college = context.messagePayload.college
                        context.scene.state.handler = await getCollegeHandler(context.messagePayload.college)

                        return context.scene.step.next()
                    }
                    else {
                        return context.send('Пожалуйста воспользуйтесь клавиатурой.')
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Выбор колледжа
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const { settings } = context.scene.state.handler
                        if ( settings.teacher ) {
                            await context.send({
                                message: "Вы хотите получать расписание для студентов или преподователей?",
                                keyboard: Keyboard.keyboard([ [
                                    Keyboard.textButton({
                                        payload: {
                                            type: 1
                                        },
                                        color: Keyboard.POSITIVE_COLOR,
                                        label: "Ученика"
                                    }),
                                    Keyboard.textButton({
                                        payload: {
                                            type: 2
                                        },
                                        color: Keyboard.NEGATIVE_COLOR,
                                        label: "Преподователя"
                                    })
                                ] ])
                            })
                        }
                        else {
                            context.scene.state.type = 1
                            return context.scene.step.next()
                        }
                    }
                    if ( context.messagePayload && context.messagePayload.type ) {
                        context.scene.state.type = context.messagePayload.type
                        return context.scene.step.next()
                    }
                    else {
                        return context.send('Пожалуйста воспользуйтесь клавиатурой.')
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Выбор типа пользователя
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        const { settings } = context.scene.state.handler
                        if ( settings.corps ) {
                            await context.send({
                                message: "Выберите необходимый корпус: ",
                                keyboard: Keyboard.builder().oneTime()
                            })
                        }
                        else {
                            return context.scene.step.next()
                        }
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Выбор корпуса
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {
                        if ( context.scene.state.type === 1 ) {
                            return context.send({
                                message: "Введите нужную группу, только учтите, что вводить нужно правильно как на сайте, иначе расписание не найдется: ",
                                keyboard: Keyboard.builder().oneTime()
                            })
                        }
                        else {
                            return context.send({
                                message: "Введите нужную фамилию преподователя, только учтите, что вводить нужно правильно как на сайте, иначе расписание не найдется: ",
                                keyboard: Keyboard.builder().oneTime()
                            })
                        }
                    }

                    if ( context.text ) {
                        context.scene.state.param = context.text
                        return context.scene.step.next()
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }, // Ввод группы/фамилии преподователя
            async (context: MessageContext) => {
                try {
                    if ( context.scene.step.firstTime || !context.text ) {

                        await setClient({
                            peer_id: context.peerId,
                            sex: context.scene.state.sex,
                            firstname: context.scene.state.user.first_name,
                            lastname: context.scene.state.user.last_name,
                            param: context.scene.state.param,
                            college_id: context.scene.state.college,
                            corps: context.scene.state.corps,
                            role_id: context.scene.state.type
                        })

                        const client = await getClient(context.peerId)
                        if ( client ) {
                            context.session.client = client
                        }

                        await context.send({
                            message: 'Поздравляю! Теперь можно получать расписание занятий',
                            keyboard: Keyboard.keyboard([
                                [
                                    Keyboard.textButton({
                                        color: Keyboard.NEGATIVE_COLOR,
                                        label: 'Вчера',
                                        payload: {
                                            command: 'yesterday'
                                        }
                                    }),
                                    Keyboard.textButton({
                                        color: Keyboard.PRIMARY_COLOR,
                                        label: 'Сегодня',
                                        payload: {
                                            command: 'today'
                                        }
                                    }),
                                    Keyboard.textButton({
                                        color: Keyboard.POSITIVE_COLOR,
                                        label: 'Завтра',
                                        payload: {
                                            command: 'tomorrow'
                                        }
                                    })
                                ],
                                [
                                    Keyboard.textButton({
                                        color: Keyboard.SECONDARY_COLOR,
                                        label: 'Послезавтра',
                                        payload: {
                                            command: 'after_tomorrow'
                                        }
                                    })
                                ]
                            ])
                        })

                        return context.scene.step.next()
                    }
                } catch ( e ) {
                    await context.send({
                        message: "Упс... Что-то пошло не так. Ошибка: " + e.toString()
                    })
                    return context.scene.leave()
                }
            }  // Сохранение данных
        ])
    ])
}