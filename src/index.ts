import chgpgt from "./bot"
import './scenes/overheard'
import './commands/commands'

chgpgt.updates.start().catch(console.error)


// import {studyBot} from "./studyBot";
// import {storage} from "./Storage";
// import VKBot from "./VKBot";
// import {studyBotConfigs} from "./config/VKConfigs";
//
// /**
//  * Функция по поочередному запуску проекта
//  **/
// const appStart = async () => {
//     // await storage.connect() // Запускаем базу данных
//     await studyBot.updates.start() // Запускаем бота
//
//
//     const bot = new VKBot(studyBotConfigs)
//
//     import ('./scenes')
//     import ('./commands')
//     // import {timetable, updateStatus, news} from './services/cron'
//     //
//     // timetable.start()
//     // updateStatus.start()
//     // news.start()
// }
//
// appStart().then(() => console.info("Application running")).catch((error) => console.error({error}))
