import bot from "../services/bot";
import {Keyboard} from "vk-io";
import SubscribeNews from "../models/SubscribeNews";
import {randomInt} from "../utils/random";
import Luxon from "../classes/Luxon";
import {setTemplate, Timetable} from "../classes/Timetable";
import {getAttachmentDayWeek} from "../utils/getAttachmentDayWeek";
import isAdmin from "../middlewares/isAdmin";

bot.command("test", ["!", "test"], async (context) => {
    const admin = await isAdmin(context)
})

/**
 * Команда НАЧАТЬ
 * Обновление или добавление личных данных пользователя
 * @beta
 **/
bot.command("start", ["начать", "start"], (context) => {
    return context.scene.enter("start-scene")
})

/**
 * Команда получения расписания за СЕГОДНЯ.
 * @beta
 **/
bot.command('today', ["сегодня", "today"], async (context) => {
    await context.setActivity()

    let table = new Timetable(context.session.peer.param)

    const date = new Luxon()
    return context.send({
        message: await table.getTableTemplate(date),
        attachment: getAttachmentDayWeek(date.week()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Завтра",
                payload: {
                    command: "tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            }).textButton({
                label: "Послезавтра",
                payload: {
                    command: "after-tomorrow"
                },
                color: Keyboard.NEGATIVE_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания на ЗАВТРА.
 * @beta
 **/
bot.command('tomorrow', ["завтра", "tomorrow"], async (context) => {
    await context.setActivity()
    const date = new Luxon().add(24)

    let table = new Timetable(context.session.peer.param)

    return context.send({
        message: await table.getTableTemplate(date),
        attachment: getAttachmentDayWeek(date.week()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Сегодня",
                payload: {
                    command: "today"
                },
                color: Keyboard.PRIMARY_COLOR
            }).textButton({
                label: "Послезавтра",
                payload: {
                    command: "after-tomorrow"
                },
                color: Keyboard.NEGATIVE_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания на Послезавтра.
 * @beta
 **/
bot.command('after-tomorrow', ["послезавтра", "after-tomorrow"], async (context) => {
    await context.setActivity()

    let table = new Timetable(context.session.peer.param)

    const date = new Luxon().add(48)
    return context.send({
        message: await table.getTableTemplate(date),
        attachment: getAttachmentDayWeek(date.week()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Сегодня",
                payload: {
                    command: "today"
                },
                color: Keyboard.PRIMARY_COLOR
            }).textButton({
                label: "Завтра",
                payload: {
                    command: "tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания на НЕДЕЛЮ.
 * @beta
 **/
bot.command('week', ["На неделю", "week"], async (context) => {
    await context.setActivity()
    let table = new Timetable(context.session.peer.param)

    let time = 0
    for (let i = 0; i < 7; i++) {
        const date = new Luxon().add(time)

        if (date.week() !== 7) {
            const data = await table.getTable(date)
            if (data.count > 0) {

                let template = setTemplate(data)
                template += `📅 ${date.pin()}, ${context.session.peer.param.toUpperCase()}`

                await context.send({
                    message: template,
                    attachment: getAttachmentDayWeek(date.week()),
                })
            }
        }
        time += 24
    }

    return context.send("⭕ Расписание закончилось ⭕")
})

/**
 * Команда подписки на новости.
 * @beta
 **/
bot.command('subscribe-news', ["Подписаться на новости"], async (context) => {
    if (context.session.peer.subscribe) context.session.peer.subscribe.param = true
    const subscribe = await SubscribeNews.findOne({where: {peerId: context.peerId}})
    if (subscribe) {
        await subscribe.update({param: true})
    } else {
        await SubscribeNews.create({peerId: context.peerId, param: true})
    }
    return context.reply("Вы успешно подписались на новости бота.")
})

/**
 * Команда отписки от новостей.
 * @beta
 **/
bot.command('unsubscribe-news', ["Отписаться от новостей"], async (context) => {
    if (context.session.peer.subscribe) context.session.peer.subscribe.param = false
    const subscribe = await SubscribeNews.findOne({where: {peerId: context.peerId}})
    if (subscribe) {
        await subscribe.update({param: false})
    } else {
        await SubscribeNews.create({peerId: context.peerId, param: false})
    }
    return context.reply("Вы успешно отписались от новостей бота.")
})

/**
 * Команда вызова администраторов.
 * @beta
 **/
bot.command('call', ["Вызвать администрацию"], async (context) => {
    const admins = await bot.api.groups.getMembers({
        group_id: process.env.GROUP_ID,
        // @ts-ignore
        filter: "managers"
    })

    await bot.api.messages.send({
        user_ids: admins.items.map(i => i["id"]),
        random_id: randomInt(0, 31),
        message: `@id${context.peerId} - вызвал админа.`,
        keyboard: Keyboard.builder().urlButton({
            label: "Открыть чат",
            url: `https://vk.com/gim${process.env.GROUP_ID}?sel=${context.peerId}`
        }).inline()
    })

    return context.reply({
        message: "Администрация спешит на помощь!\n" +
            "Пожалуйста ожидайте"
    })
})

/**
 * Команда прочих команд
 * @beta
 **/
bot.command('other', ["другое", "other"], (context) => {
    return context.send({
        message: `Другие возможности:

📌 Нужна справка по боту?
Нажмите "Справка по боту" и откроется статья с описанием бота, его команд и возможностей. В справке так же содержатся ответы на популярные вопросы.

🆘 Возникли проблемы? Или Вы хотите предложить хорошую идею для бота? 
Нажмите "Вызвать администрацию" и мы Вам ответим.

🆘 Ошиблись при вводе данных? Хотите сменить группу
Нажмите "Сбросить данные".

${context.session.peer.subscribe.param
            ? `🚀 Больше не хотите быть вкурсе всех новостей бота?
Нажмите на кнопку "Отписаться от новостей".`
            : `🚀 Хотите быть вкурсе всех новостей бота?
Нажмите на кнопку "Подписаться на новости" и узнавайте первыми о новостях группы и обновлениях бота.`}`,
        keyboard: Keyboard.builder().textButton({
            label: "Вызвать администрацию",
            color: Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "call"
            }
        }).row().textButton({
            label: context.session.peer.subscribe.param ? "Отписаться от новостей" : "Подписаться на новости",
            color: context.session.peer.subscribe.param ? Keyboard.SECONDARY_COLOR : Keyboard.POSITIVE_COLOR,
            payload: {
                command: context.session.peer.subscribe.param ? "unsubscribe-news" : "subscribe-news"
            }
        }).row().urlButton({
            label: "Справка по боту",
            url: "https://vk.com/@in_teach-spravka-po-botu"
        }).row().textButton({
            label: "Сбросить данные",
            color: Keyboard.NEGATIVE_COLOR,
            payload: {
                command: "start"
            }
        }).inline()
    })
})
