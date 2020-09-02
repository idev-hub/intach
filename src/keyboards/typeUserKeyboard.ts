import {Keyboard} from "vk-io";

export default Keyboard.builder().textButton({
    label: "Ученик",
    payload: {
        command: 0
    },
    color: Keyboard.POSITIVE_COLOR
}).textButton({
    label: "Учитель",
    payload: {
        command: 1
    },
    color: Keyboard.PRIMARY_COLOR
}).oneTime()
