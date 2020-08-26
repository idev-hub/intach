import {Keyboard, MessageContext} from "vk-io";
import bot from "../bot";
import {getTimetableOfGroup} from "../utils/fetches";

/**
 * Команда получения расписания за ВЧЕРА
 * @beta
 **/
bot.command('yesterday', async (context) => {

})

/**
 * Команда получения расписания за СЕГОДНЯ
 * @beta
 **/
bot.command('today', async (context) => {

})

/**
 * Команда получения расписания на ЗАВТРА
 * @beta
 **/
bot.command('tomorrow', async (context) => {

})

/**
 * Команда получения расписания на ПОСЛЕЗАВТРА
 * @beta
 **/
bot.command('after-tomorrow', async (context) => {

})

/**
 * Команда для связи с АДМИНИСТРАЦИЕЙ
 * @beta
 **/
bot.command('contact', async (context) => {

})

/**
 * Команда ПОМОЩЬ
 * @beta
 **/
bot.command('help', async (context) => {
    await context.send(`Помощь в разработке`)
})

/**
 * Команда сброса данных
 * @beta
 **/
bot.command('discharge', ['start', 'начать'], async (context) => {

})




/**
 * Команда публикации поста в подслушано
 * @beta
 **/
bot.command('overheard', ["c", "с"], async (context) => {
    await context.send({
        message: "https://m.vk.com/wall-188796137?act=add&from=suggest",
    })
})


/**
 * Команда получение расписания на определенную дату
 * @beta
 **/
bot.command('date', /^\/date (.+)/i, async (context) => {
    const date = context.$match[1].split('').join('')

    try {
        const timetable = await getTimetableOfGroup(date, "107")

        if(timetable.status === 0){
            await context.send(JSON.stringify(timetable.response))
        } else {
            await context.send(timetable.response.toString())
        }
    } catch (e) {
        console.error(e)
    }
})



/**
 * ТЕСТОВАЯ команда
 * @beta
 **/
bot.command('test', async (context) => {
    try {
        const timetable = await getTimetableOfGroup("20.05.2020", "107")

        if(timetable.status === 0){
            await context.send({
                message: 'ТЕСТ!',
                keyboard: Keyboard.builder()
                    .textButton({
                        label: 'Начать',
                        payload: {
                            command: 'start'
                        }
                    }).inline()
            })
        } else {
            await context.send(timetable.response.toString())
        }
    } catch (e) {
        console.error(e)
    }
})
