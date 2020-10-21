import {MessageContext, VK} from "vk-io";
import {HearManager} from "@vk-io/hear";
import {SessionManager} from "@vk-io/session";
import {SceneManager, StepScene} from "@vk-io/scenes";
import wall_post_new from "../middlewares/wall_post_new";
import Language from "./Language";
import chat from "../middlewares/chat";
import scenes from "../config/scenes";
import commands from "../config/commands";
import {compose} from "middleware-io";
import {Middleware} from "middleware-io/lib/types";

export class Bot extends VK {
    readonly hearManager: HearManager<MessageContext> = new HearManager<MessageContext>()
    public readonly sessionManager: SessionManager<any> = new SessionManager<any>()
    public readonly sceneManager: SceneManager = new SceneManager()
    public readonly langManager: Language = new Language("ru")

    public readonly hear = (name: string, conditions: Array<string | RegExp>, middlewares: Middleware<any>[]) => {
        this.hearManager.hear(
            [
                (text, {state}) => {
                    return state.command === name
                },
                ...conditions
            ],
            compose(middlewares)
        )
    }

    constructor(param) {
        super(param)
        this.updates.on('wall_post_new', async (context, next) => await wall_post_new(this, context, next))
        this.updates.on('message_new', (context, next) => {
            context.lang = this.langManager.template()
            return next()
        })
        this.updates.on('message_new', this.sessionManager.middleware)
        this.updates.on('message_new', this.sceneManager.middleware)
        this.updates.on('message_new', this.sceneManager.middlewareIntercept)
        this.updates.on('message_event', async (context, next) => {
            if (context.eventPayload && context.eventPayload.command) {
                const {command} = context.eventPayload
                if (command === "other") {
                    await this.api.messages.sendMessageEventAnswer({
                        event_id: context.eventId,
                        user_id: context.userId,
                        peer_id: context.peerId,
                        event_data: JSON.stringify({
                            type: "show_snackbar",
                            text: "Покажи исчезающее сообщение на экране"
                        })
                    })
                }
            }
        });
        this.updates.on('message_new', async (context, next) => {
            await chat(this, context, next)
        })
        this.updates.on('message', (context, next) => {
            const {messagePayload, senderType, state} = context

            if (senderType === "user") {

                // state.command = messagePayload && messagePayload.command
                //     ? messagePayload.command
                //     : null
                //
                // if (messagePayload.command && messagePayload.command === "not_supported_button") {
                //     console.log(messagePayload)
                //     messagePayload.command = JSON.parse(messagePayload.payload).command
                // }

                this.hearManager.middleware(context, next)
            }
        })

        scenes(this)
        commands(this)
    }
}
