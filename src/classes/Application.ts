import Token from "../models/Token";
import {Bot} from "./Bot";

class Application {
    public bot: Bot = new Bot({
        group_id: process.env.GROUP_ID,
        pollingGroupId: process.env.GROUP_ID,
    })
    public token: string

    private readonly create = async () => {
        const _token = await Token.findOne()
        this.token = _token.toJSON()["token"]
        this.bot = new Bot({token: this.token, pollingGroupId: parseInt(process.env.GROUP_ID)})
        return this.bot
    }

    readonly start = async () => {
        if (process.env.NODE_ENV === "development") {
            await (await this.create()).updates.startPolling()
            console.info("Bot has been successfully launched on longpole")
        } else {
            await (await this.create()).updates.startWebhook({port: parseInt(process.env.PORT) || 3000})
            console.info("The bot has been successfully launched on callback and listening on the port:", parseInt(process.env.PORT) || 3000)
        }
    }
}

export default new Application()

