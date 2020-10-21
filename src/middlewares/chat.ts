import { Keyboard } from "vk-io";

export default async (then, context, next) => {
    if (context.isChat) {
        try {
            context.conversations = await then.api.messages.getConversationMembers({ peer_id: context.peerId })
            const reg = new RegExp(/(?<appeal>(^\[.*]|@.*\w|^(бот)|^(bot)(\.|,|\s)?))(?<value>.*)/i)
            const text = context.text.match(reg)
            if (text) {
                if (text.groups["appeal"]) {
                    context.text = text.groups["value"]
                    return next()
                }
            }
        } catch (e) {
            console.error(e)
            return context.reply({
                message: "Что бы бот смог работать в беседе.\nДайте ему привилегии Администратора.",
                keyboard: Keyboard.builder().urlButton({
                    label: "Инструкция",
                    url: "https://vk.com/@in_teach-kak-dobavit-bota-v-besedu"
                }).inline()
            })
        }
    } else {
        await next()
    }
}
