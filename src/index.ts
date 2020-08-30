require('dotenv').config()

import bot from "./services/bot"
import {users} from './database'
import './scenes/scenes'
import './commands/commands'


users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.')
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e)
})

const port = parseInt(process.env.PORT) || 80
bot.updates.startWebhook({port: port}).then(() => {
    console.log("INFO: BOT RUNNING. PORT: " + port)
}).catch(console.error)
