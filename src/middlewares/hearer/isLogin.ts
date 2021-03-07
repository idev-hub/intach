import { ContextDefaultState, MessageContext } from "vk-io";
import { getClient } from "../../services/ClientService";

export default async (context: MessageContext<ContextDefaultState>, next) => {
    const client = await getClient(context.peerId)
    if ( client ) {
        context.client = client
        return next()
    }

    await context.send({
        message: 'Здравствуйте. Что бы получать расписание занятий, мне необходимо знать некоторую информацию.'
    })

    return context.scene.enter('start-scene')
}
