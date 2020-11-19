import {Bot} from "./Bot";
import express, {Router} from "express"
import api from "../api";

class Application {
    public readonly express: express = express()
    public readonly router: Router = Router()
    public readonly port: number = parseInt(process.env.PORT) || 3000

    public bot: Bot = new Bot({
        group_id: process.env.GROUP_ID,
        pollingGroupId: process.env.GROUP_ID,
        token: process.env.TOKEN,
        webhookSecret: process.env.SECRET,
        webhookConfirmation: process.env.CONFIRM
    })

    private readonly startExpress = () => {
        this.express.use("/api", api)
    }

    readonly start = async () => {
        if (process.env.NODE_ENV === "development") {
            await this.bot.updates.startPolling()

            console.info("Bot has been successfully launched on longpole")
            this.startExpress()

            this.express.listen(this.port, () => {
                console.info("The server has started successfully and is listening on the port: ", this.port)
            })
        } else {

            this.router.get('/webhook', (req, res) => this.bot.updates.getWebhookCallback())
            console.info("The bot has been successfully launched on the reverse export and is listening on the url:", "/webhook")

            this.startExpress()

            this.express.listen(this.port, () => {
                console.info("The server has started successfully and is listening on the port:", this.port)
            })
        }
    }
}

export default new Application()

