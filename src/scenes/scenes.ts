import bot from "../services/bot";
import {StepScene} from "@vk-io/scenes";
import {users} from "../database"
import typeUserKeyboard from "../keyboards/typeUserKeyboard";
import ifLoginKeyboard from "../keyboards/ifLoginKeyboard";

bot.sceneManager.addScenes([

    /**
     * Сцена старта
     **/
    new StepScene('start-scene', [
        (context) => {

            context.session.user = undefined

            if (context.scene.step.firstTime || !context.text) {
                return context.send({
                    message: 'Привет. Нужно ответить на пару вопросов. И так.\nВы ученик? Или учитель.',
                    keyboard: typeUserKeyboard
                })
            }

            if (context.messagePayload && (context.messagePayload.command === "pupil" || context.messagePayload.command === "teacher")) {
                context.scene.state.type = context.messagePayload.command
                return context.scene.step.next()
            } else {
                return context.send({
                    message: 'Нужно нажать на кнопку.',
                    keyboard: typeUserKeyboard
                })
            }
        },
        (context) => {
            const {type} = context.scene.state
            if (context.scene.step.firstTime || !context.text) {
                if (type === "pupil") {
                    return context.send({
                        message: 'Введите свою группу. Как указано на официальном сайте.\nПример: "107", "202", "10", "201-3", "517з"'
                    })
                } else if (type === "teacher") {
                    return context.send({
                        message: 'Введите свою фамилию и инициалы. Пример(Все знаки точки и пробелы учитываються, пишите в точности как в образце, только себя): \nКонобеев В.В.'
                    })
                }
            }

            context.scene.state.param = context.text
            return context.scene.step.next()
        },
        async (context) => {
            const {type, param} = await context.scene.state

            // Сохранение данных в БД
            const user = await users.asyncFindOne({_id: context.peerId})
            if (user) {
                await users.asyncUpdate({_id: context.peerId}, {
                    $set: {
                        type: type,
                        param: param
                    }
                }, {})
            } else {
                await users.asyncInsert({_id: context.peerId, type: type, param: param})
            }

            return context.scene.step.next()
        },
        async (context) => {
            console.log("BOT: ", `new user register from by id - ${context.peerId}: type - ${context.scene.state.type}: param - ${context.scene.state.param}`)
            await context.send({
                message: "Замечательно! Теперь вы можете получить своё расписание.",
                keyboard: ifLoginKeyboard
            })
            return context.scene.step.next()
        }
    ])
])
