require('dotenv').config()

import database from "./services/database";
import bot from "./services/bot";
import "./config/scenes"
import "./config/commands"


const port = parseInt(process.env.PORT) || 3000
const force = true

database.sync({force: force}).then(async () => {
    console.info("Database sync")
    if (process.env.NODE_ENV === "development") {
        await bot.updates.startPolling()
        console.info("Bot has been successfully launched on longpole")
    } else {
        await bot.updates.startWebhook({port: port})
        console.info("The bot has been successfully launched on callback and listening on the port:", port)
    }
})
