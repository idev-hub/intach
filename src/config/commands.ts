import {Keyboard} from "vk-io";
import {randomInt} from "../utils/random";
import Luxon from "../classes/Luxon";
import {getTable} from "../classes/Timetable";
import {getAttachmentDayWeek} from "../utils/getAttachmentDayWeek";
import {templates} from "./templates";
import {keyboards} from "./keyboards";
import {peer} from "../services/peer";
import genKeyboard from "../utils/genKeyboard";
import isLogin from "../middlewares/hearer/isLogin";
import Language from "../classes/Language";
import getUser = peer.getUser;
import {Bot} from "../classes/Bot";
import {getAdmins} from "../services/admin";
import isOutbox from "../middlewares/hearer/isOutbox";

export default ((app: Bot) => {
    app.hear("test", ["/test"], [
        async (context, next) => {
            await context.send("message one")
            return next()
        },
        async (context, next) => {
            return context.send({
                message: "test",
                template: JSON.stringify({
                    type: "carousel",
                    elements: [
                        {
                            title: "Камень.Ножницы.Бумага",
                            description: "Сможешь победить великий рандом?",
                            photo_id: "-109837093_457242809",
                            buttons: [{
                                action: {
                                    type: "text",
                                    label: "Играть",
                                    payload: {
                                        command: "game"
                                    }
                                }
                            }]
                        }
                    ]
                }),
            })
        }
    ])

    /**
     * Команда ВЫЗОВА РЕКЛАМЫ
     * Отправляет пользователю рекламу
     * @beta
     **/
    app.hear("ads", ["/ads"], [
        async (context) => {
            const {lang} = context
            return context.reply({
                message: lang["ads"],
                attachment: "photo-147858640_457239306",
                keyboard: Keyboard.builder().urlButton({
                    label: lang["button"]["see"],
                    url: "https://vk.cc/aAOc4w"
                }).inline()
            })
        }
    ])

    /**
     * Команда ВОЗВРАТА НАЗАД
     * Отправляет клавиатуру расписания
     * @beta
     **/
    app.hear("main", ["назад", "вернутся"], [
        isLogin,
        async (context) => {
            const {lang} = context
            context.setActivity()
            return context.reply({
                message: lang["actual"],
                keyboard: keyboards.mainKeyboard(context)
            })
        }
    ])

    /**
     * Команда НАЧАТЬ
     * Обновление или добавление личных данных пользователя
     * @beta
     **/
    app.hear("start", [new RegExp(/(\s+)?(начать|start)/i)], [
        (context) => context.scene.enter("start-scene")
    ])

    /**
     * Команда получения расписания за СЕГОДНЯ.
     * @beta
     **/
    app.hear("today", [new RegExp(/(\s+)?(сегодня)/i)], [
        isLogin,
        async (context) => {
            const {lang} = context
            const date = new Luxon('Asia/Yekaterinburg')

            await context.setActivity()
            return context.send({
                message: await templates.tableTemplate(context, date),
                attachment: getAttachmentDayWeek(date.week()),
                keyboard: Keyboard.builder()
                    .textButton({
                        label: lang["button"]["tomorrow"],
                        payload: {
                            command: "tomorrow"
                        },
                        color: Keyboard.POSITIVE_COLOR
                    }).textButton({
                        label: lang["button"]["after_tomorrow"],
                        payload: {
                            command: "after_tomorrow"
                        },
                        color: Keyboard.NEGATIVE_COLOR
                    })
                    .inline()
            })
        }
    ])

    /**
     * Команда получения расписания на ЗАВТРА.
     * @beta
     **/
    app.hear("tomorrow", [new RegExp(/(\s+)?(завтра)/i)], [
        isLogin,
        async (context) => {
            const {lang} = context
            const date = new Luxon('Asia/Yekaterinburg').add(24)
            const keyboards = [
                !context.isChat ? Keyboard.textButton({
                    label: lang["button"]["today"],
                    payload: {command: "today"},
                    color: Keyboard.PRIMARY_COLOR
                }) : undefined,
                Keyboard.textButton({
                    label: lang["button"]["after_tomorrow"],
                    payload: {command: "after_tomorrow"},
                    color: Keyboard.NEGATIVE_COLOR
                })
            ]

            await context.setActivity()
            return context.send({
                message: await templates.tableTemplate(context, date),
                attachment: getAttachmentDayWeek(date.week()),
                keyboard: genKeyboard(2, keyboards).inline()
            })
        }
    ])

    /**
     * Команда получения расписания на Послезавтра.
     * @beta
     **/
    app.hear("after_tomorrow", [new RegExp(/(\s+)?(послезавтра)/i)], [
        isLogin,
        async (context) => {
            const {lang} = context
            const date = new Luxon('Asia/Yekaterinburg').add(48)
            const keyboards = [
                !context.isChat ? Keyboard.textButton({
                    label: lang["button"]["today"],
                    payload: {command: "today"},
                    color: Keyboard.PRIMARY_COLOR
                }) : undefined,
                Keyboard.textButton({
                    label: lang["button"]["tomorrow"],
                    payload: {command: "tomorrow"},
                    color: Keyboard.POSITIVE_COLOR
                })
            ]

            await context.setActivity()
            return context.send({
                message: await templates.tableTemplate(context, date),
                attachment: getAttachmentDayWeek(date.week()),
                keyboard: genKeyboard(2, keyboards).inline()
            })
        }
    ])

    /**
     * Команда получения расписания на НЕДЕЛЮ.
     * @beta
     **/
    app.hear("week", [new RegExp(/(\s+)?(на неделю)/i)], [
        isLogin,
        async (context) => {
            const {lang} = context
            let time = 0

            await context.send(lang["timetable"]["start"])
            await context.setActivity()

            for (let i = 0; i < 7; i++) {
                const date = new Luxon().add(time)

                if (date.week() !== 7) {
                    const data = await getTable(context.user.peer.param, date)
                    if (data["count"] > 0) {

                        let template = `📅 ${date.pin()}, ${context.user.peer.param.toUpperCase()}\n\n`
                        template += templates.disciplineTemplate(context, data)

                        await context.send({
                            message: template,
                            attachment: getAttachmentDayWeek(date.week()),
                        })
                    }
                }
                time += 24
            }

            return context.send(lang["timetable"]["end"])
        }
    ])

    /**
     * Команда подписки на новости.
     * @beta
     **/
    app.hear("subscribe-news", ["Подписаться на новости"], [
        isLogin,
        async (context) => {
            const {lang} = context

            await context.setActivity()
            await peer.setSubscribe(context, true)
            return context.reply({
                message: lang["newsletter"]["subscribed"],
                keyboard: keyboards.mainKeyboard(context)
            })
        }
    ])

    /**
     * Команда отписки от новостей.
     * @beta
     **/
    app.hear("unsubscribe-news", ["Отписаться от новостей"], [
        isLogin,
        async (context) => {
            const {lang} = context

            await context.setActivity()
            await peer.setSubscribe(context, false)
            return context.reply({
                message: lang["newsletter"]["unsubscribed"],
                keyboard: keyboards.mainKeyboard(context)
            })
        }
    ])

    /**
     * Команда вызова администраторов.
     * @beta
     **/
    app.hear("call_admins", ["Вызвать администрацию"], [
        async (context) => {
            await context.setActivity()

            const {lang} = context
            const admins = await getAdmins(this)
            if (admins) {
                await app.api.messages.send({
                    user_ids: admins.map(i => i["id"]),
                    random_id: randomInt(0, 31),
                    message: `@id${context.peerId} - вызвал админа.`,
                    keyboard: Keyboard.builder().urlButton({
                        label: "Открыть чат",
                        url: `https://vk.com/gim${process.env.GROUP_ID}?sel=${context.peerId}`
                    }).inline()
                })
                return context.reply(lang["call_admins"]["caused"])
            } else {
                return context.reply(lang["call_admins"]["error"])
            }
        }
    ])

    /**
     * Команда прочих команд
     * @beta
     **/
    app.hear("other", [new RegExp(/(\s+)?(прочее|другое)/i)], [
        isLogin,
        (context) => {
            const {lang} = context

            context.setActivity()
            return context.send({
                message: lang.other(context),
                keyboard: keyboards.otherKeyboard(context)
            })
        }
    ])

    /**
     * Команда камень ножницы бумага
     * @beta
     **/
    app.hear("game", [new RegExp(/(\s+)?(играть)/i)], [
        (context) => context.scene.enter("rock-paper-scissors")
    ])

    /**
     * Команда смены языка
     * @beta
     **/
    app.hear("language_switch", ["сменить язык"], [
        isLogin,
        (context) => {
            context.setActivity()
            return context.send({
                message: "Выберите язык",
                keyboard: keyboards.languageKeyboard(context)
            })
        }
    ])

    const languages = new Language().languages
    for (let i = 0; i < languages.length; i++) {
        const lang = Object.keys(languages[i])[0]
        app.hear("lang" + lang, [], [
            async (context) => {
                const user = await getUser(context)
                if (user) {
                    const used = user.toJSON()["lang"]
                    user.update({lang: lang}).then(() => {
                        context.lang = new Language(lang).template()
                        return context.send({
                            message: `Вы сменили язык с ${used.toUpperCase()} на ${lang.toUpperCase()}`,
                            keyboard: keyboards.mainKeyboard(context)
                        })
                    })
                }
            }
        ])
    }

    /**
     * Команда смены группы
     * @beta
     **/
    app.hear("rename", [new RegExp(/^(!group+\s)(.*)/i)], [
        isOutbox,
        async (context) => {
            if (context.$match[2])
                await app.api.messages.delete({
                    peer_id: context.peerId,
                    delete_for_all: true,
                    message_ids: context.id
                })

            let user = await peer.getUser(context)
            await peer.setUser(context, context.$match[2])
            if(!user){
                await peer.setSubscribe(context, true)
            }

            context.lang = new Language("ru").template()
            return context.send({
                message: (user)?`Вам изменили группу с ${user.get("param")} на ${context.$match[2]}`:`Вам присвоили группу ${context.$match[2]}`,
                keyboard: keyboards.mainKeyboard(context)
            })
        }
    ])
})
