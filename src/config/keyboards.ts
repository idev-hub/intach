import {Keyboard} from "vk-io";

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
