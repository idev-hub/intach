import {Keyboard} from "vk-io";

// Проверка на спам сообщениями
export default async (context, next) => {
    const {session, createdAt, text} = context
    const {pastMessage} = session
    const sec = 10

    if (session.pastMessage) {
        if (text === pastMessage.text) {
            if (((createdAt - pastMessage.createdAt) - sec) < 0) {
                return context.reply({
                    message: "⚠ Предупреждаем. ⚠ \n\n" +
                        "За спам могут выдать блокировку.\n" +
                        "Прежде чем повторять тот же запрос убедитесь, нужно ли Вам это, ведь ответ на тот же запрос не изменится\n\n" +
                        "Если бот не отправляет Вам расписание, проверьте корректность Ваших данных. Чтобы поменять данные - напишите \"Начать\".\n\n" +
                        "Если вы уверены, что всё верно и на сайте присутствует расписание на запрашиваемый день, напишите нашей администрации, мы постараемся Вам помочь",
                    keyboard: Keyboard.builder().textButton({
                        label: "Вызвать администрацию",
                        color: Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "call"
                        }
                    }).textButton({
                        label: "Начать",
                        color: Keyboard.NEGATIVE_COLOR,
                        payload: {
                            command: "start"
                        }
                    }).inline()
                })
            } else {
                session.pastMessage = context
            }
        } else {
            session.pastMessage = context
        }
    } else {
        session.pastMessage = context
    }

    return next()
}
