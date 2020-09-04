import User from "../database/models/Users";
import bot from "../services/bot";
import otherKeyboard from "../keyboards/otherKeyboard";
import ifLoginKeyboard from "../keyboards/ifLoginKeyboard";
import Luxon from "../utils/Luxon";
import {getTimetable} from "../services/timetable";
import {Keyboard} from "vk-io";
import {randomInt} from "../utils/Random";

/**
 * Команда получения расписания на ПОСЛЕЗАВТРА."
 * @beta
 **/
bot.command('after-tomorrow', ["послезавтра", "пз"], async (context) => {
    return context.send({
        message: await getTimetable(context, new Luxon().add(48).pin()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Завтра",
                payload: {
                    command: "tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .textButton({
                label: "Сегодня",
                payload: {
                    command: "today"
                },
                color: Keyboard.PRIMARY_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания на ЗАВТРА.
 * @beta
 **/
bot.command('tomorrow', ["завтра", "з"], async (context) => {
    return context.send({
        message: await getTimetable(context, new Luxon().add(24).pin()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Послезавтра",
                payload: {
                    command: "after-tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .textButton({
                label: "Сегодня",
                payload: {
                    command: "today"
                },
                color: Keyboard.PRIMARY_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания за СЕГОДНЯ.
 * @beta
 **/
bot.command('today', ["сегодня", "с"], async (context) => {
    return context.send({
        message: await getTimetable(context, new Luxon().pin()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Завтра",
                payload: {
                    command: "tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .textButton({
                label: "Послезавтра",
                payload: {
                    command: "after-tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .inline()
    })
})

/**
 * Команда получения расписания за ВЧЕРА.
 * @beta
 **/
bot.command('yesterday',["вчера", "в"], async (context) => {
    return context.send({
        message: await getTimetable(context, new Luxon().subtract(24).pin()),
        keyboard: Keyboard.builder()
            .textButton({
                label: "Завтра",
                payload: {
                    command: "tomorrow"
                },
                color: Keyboard.POSITIVE_COLOR
            })
            .textButton({
                label: "Сегодня",
                payload: {
                    command: "today"
                },
                color: Keyboard.PRIMARY_COLOR
            })
            .inline()
    })
})

/**
 * Команда КЛАВИАТУРА
 * Обновление клавиатуры пользователя
 * @beta
 **/
bot.command('keyboard', ["клава", "клавиатура"], (context) => {
    return context.send({
        message: "Клавиатура обновлена!",
        keyboard: ifLoginKeyboard
    })
})

/**
 * Команда НАЧАТЬ
 * Обновление или добавление личных данных пользователя
 * @beta
 **/
bot.command('start', ["начать", "start"], (context) => {
    return context.scene.enter("start-scene")
})


/**
 * Команда прочих команд
 * @beta
 **/
bot.command('other', ["прочее", "еще"], (context) => {
    return context.send({
        message: `Вы можете сообщить об ошибках в боте, предложить крутые идеи для него или просто пообщаться с админами, нажав на кнопку "Написать".\n`,
        keyboard: otherKeyboard
    })
})

/**
 * Команда для связи с АДМИНИСТРАЦИЕЙ.
 * @beta
 **/
bot.command('support', ["помощь", "помогите"], async (context) => {
    const users = await User.findAll({where: {perpermission: 2}})

    for (let i = 0; i < users.length; i++) {
        await bot.api.messages.send({
            peer_id: users[i].peerId,
            random_id: randomInt(0, 31),
            message: `Вас запросил - @id${context.peerId}, ответьте ему.\nСсылка на беседу:\nvk.com/gim147858640?sel=${context.peerId}`
        })
    }

    return context.send("Заявка отправлена. Как только администоры увидят, они вам ответят.")
})

/**
 * Команда Бана
 * @beta
 **/
bot.command('ban', /^\/ban (.+)/i, async (context) => {
    return context.send("Данная функция еще не реализована.")
})

/**
 * Команда назначения админом
 * @beta
 **/
bot.command('admin', ["/admin/e4f58a805a6e1fd0f6bef58c86f9ceb3/2"], async (context) => {
    const user = await User.findOne({where: {peerId: context.peerId}})
    if (user) {
        await user.update({perpermission: 2});
        return context.send("Успешно!")
    } else {
        return context.send("Ошибка!")
    }
})
