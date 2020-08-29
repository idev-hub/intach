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
        label: "Инструкция по боту",
        payload: {
            command: "help"
        },
        color: Keyboard.SECONDARY_COLOR
    })
    .inline()
