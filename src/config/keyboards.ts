import {Keyboard, KeyboardBuilder} from "vk-io";
import Language from "../classes/Language";
import genKeyboard from "../utils/genKeyboard";

export namespace keyboards {
    export const languageKeyboard = (context) => {
        let lang = new Language()
        return genKeyboard(2, lang.languages.map(lang => {
            return Keyboard.textButton({
                label: lang["name"],
                payload: {
                    command: `lang${Object.keys(lang)[0]}`
                }
            })
        }), true).textButton({
            label: "Отмена",
            payload: {
                command: "main"
            },
            color: Keyboard.NEGATIVE_COLOR
        })
    }
    export const mainKeyboard = (context): KeyboardBuilder => {
        let {lang} = context

        const keyboards = [
            Keyboard.textButton({
                label: lang["button"]["after_tomorrow"],
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "after_tomorrow"
                }
            }),
            !context.isChat ? Keyboard.textButton({
                label: lang["button"]["today"],
                color: Keyboard.PRIMARY_COLOR,
                payload: {
                    command: "today"
                }
            }) : undefined,
            Keyboard.textButton({
                label: lang["button"]["tomorrow"],
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "tomorrow"
                }
            }),
            !context.isChat ? Keyboard.textButton({
                label: lang["button"]["week"],
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "week"
                }
            }) : undefined,
            Keyboard.textButton({   
                label: lang["button"]["other"],
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "other"
                }
            })
        ]

        return genKeyboard(3, keyboards)
    }
    export const otherKeyboard = (context): KeyboardBuilder => {
        let {lang} = context

        const keyboards = [
            !context.isChat ? Keyboard.textButton({
                label: lang["button"]["call_admins"],
                payload: {
                    command: "call_admins"
                }
            }) : undefined,
            Keyboard.urlButton({
                label: lang["button"]["reference"],
                url: "https://vk.com/@in_teach-spravka-po-botu"
            }),
            !context.isChat ? Keyboard.textButton({
                label: context.user.subscribe.param ? lang["button"]["unsubscribe"] : lang["button"]["subscribe"],
                color: context.user.subscribe.param ? Keyboard.NEGATIVE_COLOR : Keyboard.POSITIVE_COLOR,
                payload: {
                    command: context.user.subscribe.param ? "unsubscribe-news" : "subscribe-news"
                }
            }) : undefined,
            Keyboard.textButton({
                label: lang["button"]["reset_data"],
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "start"
                }
            }),
            Keyboard.textButton({
                label: lang["button"]["ads"],
                payload: {
                    command: "ads"
                }
            }),
            Keyboard.textButton({
                label: "Сменить язык",
                payload: {
                    command: "language_switch"
                }
            }),
            Keyboard.textButton({
                label: lang["button"]["game"],
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "game"
                }
            }),
            Keyboard.textButton({
                label: lang["button"]["prev"],
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "main"
                }
            }),
        ]

        return genKeyboard(2, keyboards, true)
    }
}
