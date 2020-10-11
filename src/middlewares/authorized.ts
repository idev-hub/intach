import Peer from "../models/Peer";
import SubscribeNews from "../models/SubscribeNews";

// Проверка авторизации пользователя
export default async (context, next) => {
    const {peerId, session} = context
    if (!session.peer) {
        const peer = await Peer.findOne({where: {peerId: peerId}})
        if (peer) {
            let data = peer.toJSON()

            const subscribe = await SubscribeNews.findOne({where: {peerId: context.peerId}})
            if (subscribe) data["subscribe"] = subscribe.toJSON()

            session.peer = data

            return next()
        } else return context.scene.enter('start-scene')
    } else return next()
}
