import Luxon from "../classes/Luxon";
import {getTable} from "../classes/Timetable";

export namespace templates {
    export const adsTemplate = {
        zaochnik: "Срочная помощь студентам в написании работ.\n" +
            "\n" +
            "Процесс заказа работы Zaochnik. Довольно прост. После ваш личный помощник найдет подходящего эксперта,проконтролирует, чтобы задание было выполнено в срок и после оплаты передаст работу вам\n" +
            "\n" +
            "Вы сможете отслеживать процесс выполнения задания 24 часа в сутки. Корректировки в готовую работу вносятся бесплатно\n" +
            "\n" +
            "Преимущество сервиса - наличие официального договора между компанией и клиентом. Это гарантия серьёзного отношения к своим обязательствам, и ваш заказ будет выполнен качественно и в срок" +
            "\n\n Посмотреть цены -> https://vk.cc/aAOc4w"
    }

    export const newsletterTemplate = {
        subscribed: "Вы успешно подписались на новости бота.",
        unsubscribed: "Вы успешно отписались от новостей бота."
    }

    export const callAdminsTemplate = {
        caused: "Администрация спешит на помощь!\n" +
            "Пожалуйста ожидайте",
        error: "К сожалению произошла ошибка и сообщение не было доставлено.\n" +
            "Попробуйте повторить запрос немного позже"
    }

    export const otherTemplate = (context) => {
        let template = "Другие возможности:\n\n"

        template += "📌 Нужна справка по боту?\n" +
            "Нажмите \"Справка по боту\" и откроется статья с описанием бота, его команд и возможностей. В справке так же содержатся ответы на популярные вопросы.\n\n"

        template += "🆘 Возникли проблемы? Или Вы хотите предложить хорошую идею для бота? \n" +
            "Нажмите \"Вызвать администрацию\" и мы Вам ответим.\n\n"

        template += "⁉ Ошиблись при вводе данных? Хотите сменить группу\n" +
            "Нажмите \"Сбросить данные\".\n\n"

        if (context.user.subscribe.param) {
            template += "🚀 Больше не хотите быть вкурсе всех новостей бота?\n" +
                "Нажмите на кнопку \"Отписаться от новостей\"\n\n"
        } else {
            template += "🚀 Хотите быть вкурсе всех новостей бота?\n" +
                "Нажмите на кнопку \"Подписаться на новости\" и узнавайте первыми о новостях группы и обновлениях бота.\n\n"
        }
        return template
    }

    export const disciplineTemplate = (data) => {
        let template = ``

        for (let i = 0; i < data.count; i++) {
            const item = data.items[i]
            template += `- Пара: №${item.num}`
            if (item.cabinet) template += ` - ${item.cabinet} кб.`
            template += `\n- Дисциплина: ${item.discipline}\n- Преподователь: ${item.teacher}\n\n`
        }

        return template
    }

    export const tableTemplate = async (context, date: Luxon) => {
        const data = await getTable(context, date)
        if (data["count"] > 0) {
            let template = `📅 ${context.user.peer.param.toUpperCase()}, ${date.pin()}\n\n`
            template += disciplineTemplate(data)
            return template
        } else {
            let template = `📅 ${context.user.peer.param.toUpperCase()}, ${date.pin()}\n\n`
            template += "Раписание не найдено"
            return template
        }
    }
}


