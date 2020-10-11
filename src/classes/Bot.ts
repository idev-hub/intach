import {Keyboard, MessageContext, VK} from "vk-io";
import {HearManager} from "@vk-io/hear";
import {SessionManager} from "@vk-io/session";
import {SceneManager} from "@vk-io/scenes";
import antispam from "../middlewares/antispam";
import authorized from "../middlewares/authorized";
import {randomInt} from "../utils/random";
import SubscribeNews from "../models/SubscribeNews";

export class Bot extends VK {
    readonly hearManager: HearManager<MessageContext> = new HearManager<MessageContext>()
    public readonly sessionManager: SessionManager<any> = new SessionManager<any>()
    public readonly sceneManager: SceneManager = new SceneManager()

    constructor(param) {
        super(param)

        this.updates.on('wall_post_new', async (context, next) => {

            const subscribes = await SubscribeNews.findAll({where: {param: true}})
            if (subscribes.length > 0) {
                const size = 100;
                const integration = [];
                const ids = subscribes.map(s => s["peerId"])

                for (let i = 0; i < Math.ceil(ids.length / size); i++)
                    integration[i] = ids.slice((i * size), (i * size) + size)

                for (let i = 0; i < integration.length; i++) {
                    await this.api.messages.send({
                        user_ids: integration[i],
                        random_id: randomInt(0, 31),
                        attachment: context.wall.toString(),
                        keyboard: Keyboard.builder().textButton({
                            label: "Отписаться от новостей",
                            color: Keyboard.NEGATIVE_COLOR,
                            payload: {
                                command: "unsubscribe-news"
                            }
                        }).inline()
                    })
                }
            }
            return next()
        })

        this.updates.on('message', (ctx, next) => ctx.isOutbox ? undefined : next())
        this.updates.on('message_new', this.sessionManager.middleware)

        this.updates.on('message_new', this.sceneManager.middleware)
        this.updates.on('message_new', this.sceneManager.middlewareIntercept)

        this.updates.on('message_new', (context, next) => {
            const {messagePayload, text} = context
            context.text = text.toLowerCase()
            context.state.command = messagePayload && messagePayload.command
                ? messagePayload.command.toLowerCase()
                : null

            return next()
        })

        this.updates.on('message_new', antispam)
        this.updates.on('message_new', authorized)
        this.updates.on('message_new', this.hearManager.middleware)
    }

    public readonly command: any = (name: string, conditions: Array<string | RegExp>, handle: any, middlewares: Array<any>) => {
        this.hearManager.hear(
            [
                (text, {state}) => (
                    state.command === name.toLowerCase()
                ),
                ...conditions
            ],
            handle
        )
    }
}
