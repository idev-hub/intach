import {Keyboard} from "vk-io";

export default Keyboard.builder()
    .textButton({
        label: "Написать",
        payload: {
            command: "support"
        },
        color: Keyboard.NEGATIVE_COLOR
    })
    .inline()
