import {Keyboard} from "vk-io";

export default Keyboard.builder().textButton({
    label: "Ученик",
    color: Keyboard.POSITIVE_COLOR
}).textButton({
    label: "Учитель",
    color: Keyboard.PRIMARY_COLOR
}).oneTime()
