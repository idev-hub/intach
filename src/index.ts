require('dotenv').config()

import sequelize from "./database";
import bot from "./services/bot"
import './scenes/scenes'
import './commands/commands'

const port = parseInt(process.env.PORT) || 3000;

(async () => {
    try {
        await sequelize.sync({force: false})

        console.log("Database connected successfully.")

        await bot.updates.startWebhook({port: port})

        console.log("The bot has been successfully launched on the port:", port)

        console.log(process.env.NODE_ENV)
    } catch (e) {
        console.error(e)
    }
})();
