import {StepScene} from "@vk-io/scenes";
import {Keyboard} from "vk-io";
import {peer} from "../services/peer";
import {keyboards} from "./keyboards";
import {randomInt} from "../utils/random";

export default (then) => {
    then.sceneManager.addScenes([
        new StepScene('start-scene', [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    await context.setActivity()

                    await context.send({
                        message: context.lang["scene"]["data_update"]["start"],
                        keyboard: Keyboard.builder().oneTime()
                    })
                }

                return context.scene.step.next()
            },
            async (context) => {
                const {lang} = context

                if (context.scene.step.firstTime || !context.text) {
                    await context.setActivity()

                    return context.send({
                        message: lang["scene"]["data_update"]["enter_group"],
                        keyboard: Keyboard.builder().urlButton({
                            label: lang["button"]["detail"],
                            url: "https://vk.com/@in_teach-prav"
                        }).inline()
                    })
                }

                context.scene.state.param = context.text.toLowerCase().trim().replace(/\s/g, '')
                return context.scene.step.next()
            },
            async (context) => {
                const {param} = context.scene.state
                const {lang} = context

                await context.setActivity()

                await peer.setUser(context, param)
                await peer.setSubscribe(context, false)

                await context.send({
                    message: lang["scene"]["data_update"]["success"],
                    keyboard: keyboards.mainKeyboard(context)
                })

                await context.send({
                    message: lang["scene"]["data_update"]["end"],
                    keyboard: Keyboard.builder().textButton({
                        label: lang["button"]["today"],
                        color: Keyboard.PRIMARY_COLOR,
                        payload: {
                            command: "today"
                        }
                    }).textButton({
                        label: lang["button"]["tomorrow"],
                        color: Keyboard.POSITIVE_COLOR,
                        payload: {
                            command: "tomorrow"
                        }
                    }).inline()
                })

                return context.scene.step.next()
            }
        ]),
        new StepScene("rock-paper-scissors", [
            async (context) => {
                if (context.scene.step.firstTime || !context.text) {
                    await context.setActivity()
                    await context.send("Играем в игру Камень, ножницы, бумага.\nДо одной победы")
                }
                return context.scene.step.next()
            },
            async (context) => {
                const asset = [
                    {
                        name: "🗿",
                        command: "rock",
                        color: Keyboard.PRIMARY_COLOR
                    },
                    {
                        name: "✂",
                        command: "scissors",
                        color: Keyboard.PRIMARY_COLOR
                    },
                    {
                        name: "📜",
                        command: "paper",
                        color: Keyboard.PRIMARY_COLOR
                    }
                ]

                if (context.scene.step.firstTime || !context.text) {
                    await context.setActivity()
                    await context.send({
                        message: "Выбирайте камень, ножницы или бумага\nЕсли проиграешь не забудь скинуть админу на дошик 🍜",
                        keyboard: Keyboard.keyboard([
                            asset.map(a => {
                                return Keyboard.textButton({
                                    label: a.name,
                                    color: a.color,
                                    payload: {
                                        command: a.command
                                    }
                                })
                            })
                        ]).inline()
                    })
                }

                if (context.messagePayload) {
                    const command = context.messagePayload.command
                    context.scene.state.firstChoice = command
                    const rand = randomInt(0, 3)

                    for (let i = 0; i < asset.length; i++) {
                        const player = asset[i]
                        if (player.command === command) {
                            const enemy = asset[rand]
                            let result = 0, text = ""

                            if (player.command === enemy.command) result = 0
                            else if ((player.command === "rock") && (enemy.command === "paper")) result = 1
                            else if ((player.command === "rock") && (enemy.command === "scissors")) result = 2
                            else if ((player.command === "paper") && (enemy.command === "rock")) result = 2
                            else if ((player.command === "paper") && (enemy.command === "scissors")) result = 1
                            else if ((player.command === "scissors") && (enemy.command === "rock")) result = 1
                            else if ((player.command === "scissors") && (enemy.command === "paper")) result = 2

                            if (result === 0) text = "Хах! Вам повезло, НИЧЬЯ"
                            else if (result === 1) text = "Где мой дошик? 🍜\nВы ПРОИГРАЛИ!"
                            else if (result === 2) text = "Эх, останусь сегодня без еды. Вы ПОБЕДИЛИ"

                            await context.send(`У вас ${player.name}, а у меня ${enemy.name}\n\n${text}`)
                            return context.scene.leave()
                        }
                    }
                }
            }
        ])
    ])
}
