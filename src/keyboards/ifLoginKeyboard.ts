import {Keyboard} from "vk-io";

export default Keyboard.builder()
    .textButton({
        label: "Завтра",
        payload: {
            command: "tomorrow"
        },
        color: Keyboard.POSITIVE_COLOR
    })
    .textButton({
        label: "Сегодня",
        payload: {
            command: "today"
        },
        color: Keyboard.PRIMARY_COLOR
    })
    .textButton({
        label: "Вчера",
        payload: {
            command: "yesterday"
        },
        color: Keyboard.NEGATIVE_COLOR
    })
    .row()
    .textButton({
        label: "Послезавтра",
        payload: {
            command: "after-tomorrow"
        },
        color: Keyboard.POSITIVE_COLOR
    })
    .textButton({
        label: "Прочее",
        payload: {
            command: "other"
        },
        color: Keyboard.NEGATIVE_COLOR
    })
