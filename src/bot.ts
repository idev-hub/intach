import {MessageContext, VK} from 'vk-io'
import {HearManager} from "@vk-io/hear";
import {SessionManager} from "@vk-io/session";
import {SceneManager} from "@vk-io/scenes";
import {users} from "./database";

export class Bot extends VK {
    readonly hearManager: HearManager<MessageContext> = new HearManager<MessageContext>()
    public readonly sessionManager: SessionManager<any> = new SessionManager<any>()
    public readonly sceneManager: SceneManager = new SceneManager()

    public readonly command: any = (name: string, conditions: Array<string | RegExp>, handle: any) => {

        if (typeof handle !== 'function') {
            handle = conditions
            conditions = [`/${name.toLowerCase()}`]
        }

        if (!Array.isArray(conditions)) {
            conditions = [conditions]
        }


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

    constructor(props) {
        super(props)

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


        // Проверка авторизации пользователя
        this.updates.on('message_new', async (context, next) => {
            const {peerId, session} = context
            if (!session.user) {
                const user = await users.asyncFindOne({_id: peerId})
                if (user) {
                    session.user = user
                    return next()
                } else return context.scene.enter('start-scene')
            } else return next()
        })

        this.updates.on('message_new', this.hearManager.middleware)
    }
}

export default new Bot({
    token: process.env.TOKEN
})
