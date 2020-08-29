import {Keyboard} from "vk-io";

export default Keyboard.builder().textButton({
    label: "Ученик",
    payload: {
        command: "pupil"
    },
    color: Keyboard.POSITIVE_COLOR
}).textButton({
    label: "Учитель",
    payload: {
        command: "teacher"
    },
    color: Keyboard.PRIMARY_COLOR
}).oneTime()
