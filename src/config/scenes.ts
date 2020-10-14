import bot from "../services/bot";
import {StepScene} from "@vk-io/scenes";
import {Keyboard} from "vk-io";
import {keyboards} from "./keyboards";
import {peer} from "../services/peer";
import Language from "../classes/Language";

bot.sceneManager.addScenes([
    new StepScene('start-scene', [
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                await context.setActivity()

                context.scene.state.lang = new Language(context)

                await context.send({
                    message: context.scene.state.lang.template()["scene"]["data_update"]["start"],
                    keyboard: Keyboard.builder().oneTime()
                })
            }

            return context.scene.step.next()
        },
        async (context) => {
            const {lang} = context.scene.state

            if (context.scene.step.firstTime || !context.text) {
                await context.setActivity()

                return context.send({
                    message: lang.template()["scene"]["data_update"]["enter_group"],
                    keyboard: Keyboard.builder().textButton({
                        label: lang.template()["button"]["detail"],
                        color: Keyboard.PRIMARY_COLOR,
                        payload: {
                            command: "detail"
                        }
                    }).inline()
                })
            }

            if (context.messagePayload && context.messagePayload.command === "detail") {
                await context.setActivity()
                return context.reply({
                    message: lang.template()["scene"]["data_update"]["detail"]
                })
            }

            context.scene.state.param = context.text.toLowerCase().trim().replace(/\s/g, '')
            return context.scene.step.next()
        },
        async (context) => {
            const {lang, param} = context.scene.state

            await context.setActivity()

            await peer.setUser(context, param)
            await peer.setSubscribe(context, false)

            await context.send({
                message: lang.template()["scene"]["data_update"]["success"],
                keyboard: keyboards.mainKeyboard(context)
            })

            await context.send({
                message: lang.template()["scene"]["data_update"]["end"],
                keyboard: Keyboard.builder().textButton({
                    label: lang.template()["button"]["today"],
                    color: Keyboard.PRIMARY_COLOR,
                    payload: {
                        command: "today"
                    }
                }).textButton({
                    label: lang.template()["button"]["tomorrow"],
                    color: Keyboard.POSITIVE_COLOR,
                    payload: {
                        command: "tomorrow"
                    }
                }).inline()
            })

            return context.scene.step.next()
        }
    ])
])
