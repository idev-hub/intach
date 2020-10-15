import {Keyboard} from "vk-io";
import Language from "../classes/Language";

export namespace keyboards {
    export const mainKeyboard = (context) => {
        let {lang} = context
        if (!lang) lang = new Language(context, "ru")

        return Keyboard.keyboard([
            [
                Keyboard.textButton({
                    label: lang.template()["button"]["after_tomorrow"],
                    color: Keyboard.NEGATIVE_COLOR,
                    payload: {
                        command: "after_tomorrow"
                    }
                }),
                Keyboard.textButton({
                    label: lang.template()["button"]["today"],
                    color: Keyboard.PRIMARY_COLOR,
                    payload: {
                        command: "today"
                    }
                }),
                Keyboard.textButton({
                    label: lang.template()["button"]["tomorrow"],
                    color: Keyboard.POSITIVE_COLOR,
                    payload: {
                        command: "tomorrow"
                    }
                })
            ],
            [
                Keyboard.textButton({
                    label: lang.template()["button"]["week"],
                    color: Keyboard.NEGATIVE_COLOR,
                    payload: {
                        command: "week"
                    }
                }),
                Keyboard.textButton({
                    label: lang.template()["button"]["other"],
                    color: Keyboard.POSITIVE_COLOR,
                    payload: {
                        command: "other"
                    }
                })
            ]
        ])
    }
    export const otherKeyboard = (context) => {
        let {lang} = context
        if (!lang) lang = new Language(context, "ru")

        const keyboard = []

        keyboard.push([
            Keyboard.textButton({
                label: lang.template()["button"]["call_admins"],
                color: Keyboard.POSITIVE_COLOR,
                payload: {
                    command: "call_admins"
                }
            }),
            Keyboard.urlButton({
                label: lang.template()["button"]["reference"],
                url: "https://vk.com/@in_teach-spravka-po-botu"
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: context.user.subscribe.param ? lang.template()["button"]["unsubscribe"] : lang.template()["button"]["subscribe"],
                color: context.user.subscribe.param ? Keyboard.NEGATIVE_COLOR : Keyboard.POSITIVE_COLOR,
                payload: {
                    command: context.user.subscribe.param ? "unsubscribe-news" : "subscribe-news"
                }
            }),
            Keyboard.textButton({
                label: lang.template()["button"]["reset_data"],
                color: Keyboard.NEGATIVE_COLOR,
                payload: {
                    command: "start"
                }
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: lang.template()["button"]["ads"],
                color: Keyboard.SECONDARY_COLOR,
                payload: {
                    command: "ads"
                }
            })
        ])
        keyboard.push([
            Keyboard.textButton({
                label: lang.template()["button"]["prev"],
                color: Keyboard.PRIMARY_COLOR,
                payload: {
                    command: "main"
                }
            })
        ])

        return Keyboard.keyboard(keyboard)
    }
}
