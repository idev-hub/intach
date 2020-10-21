import { ContextDefaultState, MessageContext } from "vk-io";
import { peer } from "../../services/peer";
import Language from "../../classes/Language";

export default async (context: MessageContext<ContextDefaultState>, next) => {
    const user = await peer.getUserAndSubscribe(context)
    if (user) {
        context.user = user
        context.lang = new Language(user.peer["lang"]).template()
        return next()
    } else
        return context.scene.enter('start-scene')
}
