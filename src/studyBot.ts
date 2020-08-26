import VKBot from "./bot";
import {studyBotConfigs} from "./config/VKConfigs";

export const studyBot = new VKBot(studyBotConfigs)

import ('./scenes')
import ('./commands')
import {timetable, updateStatus, news} from './services/cron'

timetable.start()
updateStatus.start()
news.start()
