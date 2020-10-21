import { Keyboard } from "vk-io";

// Проверка на спам сообщениями
export default async (context, next) => {
    const { session, createdAt, text, lang } = context
    const { pastMessage } = session
    const sec = 10

    if (session.pastMessage) {
        if (text === pastMessage.text) {
            if (((createdAt - pastMessage.createdAt) - sec) < 0) {
                return context.reply({
                    message: lang.template()["spam"],
                    keyboard: Keyboard.builder().textButton({
                        label: lang.template()["button"]["call_admins"],
                        color: Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "call_admins"
                        }
                    }).textButton({
                        label: lang.template()["button"]["start"],
                        color: Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "start"
                        }
                    }).inline()
                })
            } else {
                session.pastMessage = context
            }
        } else {
            session.pastMessage = context
        }
    } else {
        session.pastMessage = context
    }

    return next()
}
