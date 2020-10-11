import bot from "../services/bot";
import {StepScene} from "@vk-io/scenes";
import {Keyboard} from "vk-io";
import {mainKeyboard} from "./keyboards";
import Peer from "../models/Peer";
import SubscribeNews from "../models/SubscribeNews";

bot.sceneManager.addScenes([
    new StepScene('start-scene', [
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                await context.setActivity()
                context.session.peer = undefined

                await context.send({
                    message: "Для нормальной работы бота Вам нужно ввести свою группу.\n",
                    keyboard: Keyboard.builder().oneTime()
                })
            }

            return context.scene.step.next()
        },
        async (context) => {
            if (context.scene.step.firstTime || !context.text) {
                await context.setActivity()

                return context.send({
                    message: "Введите Вашу группу.",
                    keyboard: Keyboard.builder().textButton({
                        label: "Подробнее",
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
                    message: "Необходимо ввести свою группу в точности как указано на сайте к примеру \"407\", \"102-тэоэ\".\n\n" +
                        "Если группа будет введена не верно, бот не сможет найти Ваше расписание, но вы можете запросто ввести свой данные заново - написав \"Начать\"\n\n" +
                        "Как правильно:\n" +
                        "✔ 107\n" +
                        "✔ 10\n" +
                        "✔ 201-3\n" +
                        "✔ 517з\n" +
                        "\n" +
                        "Как НЕ правильно:\n" +
                        "❌ \"107\"\n" +
                        "❌ группа 201-3"
                })
            }

            context.scene.state.param = context.text.toLowerCase().trim().replace(/\s/g, '')
            return context.scene.step.next()
        },
        async (context) => {
            await context.setActivity()

            const peer = await Peer.findOne({
                where: {
                    peerId: context.peerId
                }
            })

            if (peer) {
                await peer.update({
                    peerId: context.peerId,
                    param: context.scene.state.param
                })
            } else {
                await Peer.create({
                    peerId: context.peerId,
                    param: context.scene.state.param
                })
            }

            const subscribe = await SubscribeNews.findOne({
                where: {
                    peerId: context.peerId
                }
            })

            if (!subscribe) {
                await SubscribeNews.create({
                    peerId: context.peerId,
                    param: true
                })
            }

            await context.send({
                message: 'Поздравлем!\n' +
                    'Теперь Вы можете полноценно пользоваться ботом.',
                keyboard: mainKeyboard
            })

            await context.send({
                message: 'Напишите "Сегодня" или "Завтра", что бы узнать своё расписание.',
                keyboard: Keyboard.builder().textButton({
                    label: "Сегодня",
                    color: Keyboard.PRIMARY_COLOR
                }).textButton({
                    label: "Завтра",
                    color: Keyboard.POSITIVE_COLOR
                }).inline()
            })

            return context.scene.step.next()
        }
    ])
])
