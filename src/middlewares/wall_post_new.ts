import SubscribeNews from "../models/SubscribeNews";
import { randomInt } from "../utils/random";
import { Keyboard } from "vk-io";

export default async (then, context, next) => {
    const subscribes = await SubscribeNews.findAll({ where: { param: true } })
    if (subscribes.length > 0) {
        const size = 100;
        const integration = [];
        const ids = subscribes.map(s => {
            if (s["peerId"] < 2000000000)
                return s["peerId"]
        })

        for (let i = 0; i < Math.ceil(ids.length / size); i++)
            integration[i] = ids.slice((i * size), (i * size) + size)

        for (let i = 0; i < integration.length; i++) {
            await then.api.messages.send({
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
}
