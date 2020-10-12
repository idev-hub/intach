import {Keyboard} from "vk-io";

export namespace keyboards {
    export const mainKeyboard = Keyboard.keyboard([
        [
            Keyboard.textButton({
                label: "Послезавтра",
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "after-tomorrow"
                }
            }),
            Keyboard.textButton({
                label: "Сегодня",
                color: Keyboard.PRIMARY_COLOR,
                payload: {
                    command: "today"
                }
            }),
            Keyboard.textButton({
                label: "Завтра",
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "tomorrow"
                }
            })
        ],
        [
            Keyboard.textButton({
                label: "На неделю",
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "week"
                }
            }),
            Keyboard.textButton({
                label: "Другое",
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "other"
                }
            })
        ]
    ])
    export const otherKeyboard = (context) => {
        const keyboard = []

        keyboard.push([
            Keyboard.textButton({
                label: "Вызвать администрацию",
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "call"
                }
            }),
            Keyboard.urlButton({
                label: "Справка по боту",
                url: "https://vk.com/@in_teach-spravka-po-botu"
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: context.user.subscribe.param ? "Отписаться от новостей" : "Подписаться на новости",
                color: context.user.subscribe.param ? Keyboard.NEGATIVE_COLOR : Keyboard.POSITIVE_COLOR,
                payload: {
                    command: context.user.subscribe.param ? "unsubscribe-news" : "subscribe-news"
                }
            }),
            Keyboard.textButton({
                label: "Сбросить данные",
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "start"
                }
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: "Помощь в написании работ",
                color: Keyboard.SECONDARY_COLOR,
                payload: {
                    command: "ads"
                }
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: "Вернутся к расписанию",
                color: Keyboard.PRIMARY_COLOR,
                payload: {
                    command: "main"
                }
            })
        ])

        return Keyboard.keyboard(keyboard)
    }
}
