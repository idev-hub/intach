import SubscribeNews from "../models/SubscribeNews";
import {Keyboard, API, getRandomId} from "vk-io";

const api = new API({token: process.env.TOKEN, apiMode: 'parallel'})

export default async (context, next) => {
    try {
        const subscribes = await SubscribeNews.findAll({where: {param: true}})
        if (subscribes.length > 0) {
            const size = 100;
            const integration = [];
            const ids = subscribes.map(s => s["peerId"])

            for (let i = 0; i < Math.ceil(ids.length / size); i++)
                integration[i] = ids.slice((i * size), (i * size) + size)

            for (let i = 0; i < integration.length; i++) {
                api.call("messages.send", {
                    peer_ids: integration[i].toString(),
                    random_id: getRandomId(),
                    attachment: context.wall.toString(),
                    keyboard: Keyboard.builder().textButton({
                        label: "Отписаться от новостей",
                        color: Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "unsubscribe-news"
                        }
                    }).inline()
                }).then(() => {
                    console.info("Messages send", integration[i])
                }).catch(e => console.error(e))
            }
        }
    } catch (e) {
        console.error(e)
    }
    return next()
}
