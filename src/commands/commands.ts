import bot from "../bot";
import {getTeachers, getTimetableOfGroup, getTimetableOfTeacher} from "../utils/fetches";
import otherKeyboard from "../keyboards/otherKeyboard";
import ifLoginKeyboard from "../keyboards/ifLoginKeyboard";
import supportKeyboard from "../keyboards/supportKeyboard";
import Luxon from "../utils/Luxon";
import {getTimetable, translated} from "../services/timetable";
import {Keyboard} from "vk-io";

const commands = [
    {
        name: "start",
        description: "Команда добавления/обновления личных данных.",
        handler: (context) => {
            return context.scene.enter("start-scene")
        }
    },
    {
        name: "keyboard",
        description: "Если у вас каким-то образом пропала клавиатура, её можно обновить этой коммандой.",
        handler: (context) => {
            return context.send({
                message: "Клавиатура обновлена!",
                keyboard: ifLoginKeyboard
            })
        }
    },
    {
        name: "yesterday",
        description: "Команда получения расписания за ВЧЕРА.",
        handler: async (context) => {
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
                    .inline()
            })
        }
    },
    {
        name: "today",
        description: "Команда получения расписания за СЕГОДНЯ.",
        handler: async (context) => {
            return context.send({
                message: await getTimetable(context, new Luxon().pin()),
                keyboard: Keyboard.builder()
                    .textButton({
                        label: "Завтра",
                        payload: {
                            command: "tomorrow"
                        },
                        color: Keyboard.POSITIVE_COLOR
                    }).inline()
            })
        }
    },
    {
        name: "tomorrow",
        description: "Команда получения расписания на ЗАВТРА.",
        handler: async (context) => {
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
                    .inline()
            })
        }
    },
    {
        name: "after-tomorrow",
        description: "Команда получения расписания на ПОСЛЕЗАВТРА.",
        handler: async (context) => {
            return context.send({
                message: await getTimetable(context, new Luxon().add(48).pin()),
                keyboards: Keyboard.builder()
                    .textButton({
                        label: "Завтра",
                        payload: {
                            command: "tomorrow"
                        },
                        color: Keyboard.POSITIVE_COLOR
                    })
                    .inline()
            })
        }
    },
    // {
    //     name: "support",
    //     description: "Команда для связи с АДМИНИСТРАЦИЕЙ.",
    //     handler: (context) => {
    //         console.log("support")
    //     }
    // },
    // {
    //     name: `date ${new Luxon().pin()}`,
    //     description: "Команда для получения расписания на определенный день.",
    //     not: true
    // },
]

for (const command of commands) {
    if (!command["not"]) bot.command(command.name, command.handler)
}

/**
 * Команда ПОМОЩЬ
 * @beta
 **/
bot.command('new', ['start', 'начать', 'привет', 'хай', 'hi', 'hello', 'ку'], (context) => {
    return context.scene.enter("start-scene")
})

/**
 * Команда ПОМОЩЬ
 * @beta
 **/
bot.command('help', (context) => {
    let template = ""
    for (const command of commands) {
        template += `["/${command.name}"] - ${command.description}\n`
    }
    return context.send(template)
})


/**
 * Команда прочих команд
 * @beta
 **/
bot.command('other', async (context) => {
    // await context.send({
    //     message: "Вы можете сообщить об ошибках в боте или предложить крутые идеи для него, нажав на кнопку ниже.",
    //     keyboard: supportKeyboard
    // })
    return context.send({
        message: "Еще команды:",
        keyboard: otherKeyboard
    })
})


/**
 * Команда получение расписания на определенную дату
 * @beta
 **/
bot.command('date', /^\/date (.+)/i, async (context) => {
    // const date = context.$match[1].split('').join('')
    //
    // try {
    //     const timetable = await getTimetableOfGroup(date, "107")
    //
    //     if (timetable.status === 0) {
    //         await context.send(JSON.stringify(timetable.response))
    //     } else {
    //         await context.send(timetable.response.toString())
    //     }
    // } catch (e) {
    //     console.error(e)
    // }
    return  context.send("Данная функция еще не реализована.")
})
