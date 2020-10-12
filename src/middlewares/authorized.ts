import {peer} from "../services/peer";

// Проверка авторизации пользователя
export default async (context, next) => {
    const user = await peer.getUserAndSubscribe(context)
    if (user) {
        context.user = user
        return next()
    } else
        return context.scene.enter('start-scene')
}
