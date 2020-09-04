import {Keyboard} from "vk-io";

export default Keyboard.builder()
    .textButton({
        label: "Обновить личные данные",
        payload: {
            command: "start"
        },
        color: Keyboard.PRIMARY_COLOR
    })
    .row()
    .textButton({
        label: "Написать",
        payload: {
            command: "support"
        },
        color: Keyboard.NEGATIVE_COLOR
    })
    .inline()
