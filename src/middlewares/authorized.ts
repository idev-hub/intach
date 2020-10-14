import {peer} from "../services/peer";
import Language from "../classes/Language";

// Проверка авторизации пользователя
export default async (context, next) => {
    const user = await peer.getUserAndSubscribe(context)
    if (user) {
        context.user = user
        context.session.lang = user.peer["lang"]
        context.lang = new Language(context)

        return next()
    } else
        return context.scene.enter('start-scene')
}
