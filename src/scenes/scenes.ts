import bot from "../services/bot";
import {StepScene} from "@vk-io/scenes";
import typeUserKeyboard from "../keyboards/typeUserKeyboard";
import ifLoginKeyboard from "../keyboards/ifLoginKeyboard";
import User from "../database/models/Users";
import {unique} from "../utils/ArrayService";
import {GenerateKeyboards} from "../utils/GenerateKeyboards";
import {Keyboard} from "vk-io";
import {getTeachers} from "../utils/fetches";

bot.sceneManager.addScenes([

    /**
     * Сцена старта
     **/
    new StepScene('start-scene', [
        async (context) => {
            await context.setActivity()
            context.session.user = undefined

            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Привет. Нужно ответить на пару вопросов. И так.\nВы ученик? Или учитель.',
                    keyboard: typeUserKeyboard
                })
            }

            if (context.text === "ученик") {

                context.scene.state.type = 0
                return context.scene.step.next()

            } else if (context.text === "учитель") {

                context.scene.state.type = 1
                return context.scene.step.next()

            } else {
                return context.send({
                    message: 'Введите учитель или ученик. Или воспользуйтесь клавиатурой.',
                    keyboard: typeUserKeyboard
                })
            }
        },
        async (context) => {
            await context.setActivity()

            const {type} = context.scene.state
            if (context.scene.step.firstTime || !context.text) {
                if (type === 0) {

                    const users = await User.findAll({where: {type: 0}})
                    const groups = unique(users.map((user) => user["param"]))

                    return context.send({
                        message: '&#128221; Введите свою группу. Как указано на официальном сайте.\n\nКак правильно:\n&#10004; 107\n&#10004; 10\n&#10004; 201-3\n&#10004; 517з\n\nКак НЕ правильно:\n&#10060; "107"\n&#10060; группа 201-3',
                        keyboard: Keyboard.keyboard(GenerateKeyboards(groups.map((_group) => {
                            return {
                                command: _group,
                                text: _group
                            }
                        }), 10, 4, 2))
                    })

                } else if (type === 1) {
                    const teachers = await getTeachers()
                    const families = unique(teachers.response.map((teacher) => {
                        return teacher["FIO"].split(" ").map((n, pos) => {
                            if (pos === 0) return `${n} `
                            else return `${n[0]}.`
                        }).join("")
                    })).sort(() => Math.random() - 0.5);

                    return context.send({
                        message: '&#128221; Введите свою фамилию и инициалы.\n\nКак правильно:\n&#10004; Конобеев В.В.\n &#10004; Дятлова Л.И.\n &#10004; Еркибаева Л.Х.\n\nКак НЕ правильно:\n&#10060; Конобеев В.В \n&#10060; Дятлова Л И\n&#10060; Еркибаева',
                        keyboard: Keyboard.keyboard(GenerateKeyboards(families.map((_family) => {
                            return {
                                command: _family,
                                text: _family
                            }
                        }), 10, 3, 2))
                    })
                }
            }

            context.scene.state.param = context.text
            return context.scene.step.next()
        },
        async (context) => {
            await context.setActivity()

            const {type, param} = await context.scene.state

            const user = await User.findOne({where: {peerId: context.peerId}})
            if (user) {
                await user.update({type: type, param: param});
            } else {
                await User.create({peerId: context.peerId, type: type, param: param});
            }

            return context.scene.step.next()
        },
        async (context) => {
            await context.send({
                message: "Замечательно! Теперь вы можете получить своё расписание.",
                keyboard: ifLoginKeyboard
            })
            return context.scene.step.next()
        }
    ])
])
