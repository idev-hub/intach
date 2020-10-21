import { IKeyboardProxyButton, Keyboard, KeyboardBuilder } from "vk-io";

export default function (columns: number, keyboards: Array<IKeyboardProxyButton | undefined | null>, colors?: boolean): KeyboardBuilder {
    const array = []
    const keys = keyboards.filter((keyboard) => {
        if (keyboard !== null && keyboard !== undefined) return keyboard
    })

    for (let i = 0; i < Math.ceil(keys.length / columns); i++) {
        array[i] = keys.slice((i * columns), (i * columns) + columns)
    }

    if (colors === true) {
        for (let i = 0; i < array.length; i++) {
            const arr = array[i]
            for (let j = 0; j < arr.length; j++) {
                const button = arr[j]
                if (!button.options.color)
                    button.options.color = j % columns === 1 ? Keyboard.PRIMARY_COLOR : Keyboard.SECONDARY_COLOR
            }
        }
    }

    return Keyboard.keyboard(array)
}
