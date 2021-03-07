import { MessageContext, VK } from "vk-io";
import { HearManager } from "@vk-io/hear";
import { SessionManager } from "@vk-io/session";
import { SceneManager } from "@vk-io/scenes";
import chat from "../middlewares/chat";
import scenes from "../config/scenes";
import commands from "../config/commands";
import { compose } from "middleware-io";
import { Middleware } from "middleware-io/lib/types";
import isLogin from "../middlewares/hearer/isLogin";

export class Bot extends VK {
    readonly hearManager: HearManager<MessageContext> = new HearManager<MessageContext>()
    public readonly sessionManager: SessionManager<any> = new SessionManager<any>()
    public readonly sceneManager: SceneManager = new SceneManager()

    public readonly hear = (name: string, conditions: Array<string | RegExp>, middlewares: Middleware<any>[]) => {
        this.hearManager.hear(
            [
                (text, { state }) => {
                    return state.command === name
                },
                ...conditions
            ],
            compose(middlewares)
        )
    }

    constructor (param) {
        super(param)
        this.updates.on('message_new', this.sessionManager.middleware)
        this.updates.on('message_new', this.sceneManager.middleware)
        this.updates.on('message_new', this.sceneManager.middlewareIntercept)
        this.updates.on('message_new', async (context, next) => {
            await chat(this, context, next)
        })
        this.updates.on('message_new', isLogin)
        this.updates.on('message', (context, next) => {
            const { messagePayload, senderType, state } = context

            if ( senderType === "user" ) {

                state.command = messagePayload && messagePayload.command
                    ? messagePayload.command
                    : null

                this.hearManager.middleware(context, next)
            }
        })

        scenes(this)
        commands(this)
    }
}
