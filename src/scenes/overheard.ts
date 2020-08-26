import bot from "../bot";
import {StepScene} from "@vk-io/scenes";
import {Keyboard} from "vk-io";

bot.sceneManager.addScenes([

    /**
     * Сцена добавления новости в подслушано
     **/
    new StepScene('overheard-scene', [
        (context) => {
            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Предложите новость:',
                    keyboard: Keyboard.builder().textButton({
                        label: "Отмена",
                        payload: {
                            command: "cancel"
                        },
                        color: Keyboard.NEGATIVE_COLOR
                    }).inline()
                })
            }

            if(context.messagePayload && context.messagePayload.command === 'cancel'){
                return context.scene.leave()
            }

            context.scene.state.message = context
            return context.scene.step.next()
        },
        (context) => {
            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Опубликовать анонимно?',
                    keyboard: Keyboard.builder()
                        .textButton({
                            label: "Да",
                            payload: {
                                command: "yes"
                            },
                            color: Keyboard.POSITIVE_COLOR
                        }).textButton({
                            label: "Нет",
                            payload: {
                                command: "no"
                            },
                            color: Keyboard.NEGATIVE_COLOR
                        }).inline()
                })
            }

            if(context.messagePayload){
                if(context.messagePayload.command === 'cancel'){
                    return context.scene.leave()
                } else {
                    context.scene.state.anonymously = context.messagePayload.command
                }
            }

            return context.scene.step.next()
        },
        async (context) => {
            const { message, anonymously } = context.scene.state
            await context.send("Новость помещена в очередь проверки администрации.")
            return context.scene.step.next()
        }
    ])
])
