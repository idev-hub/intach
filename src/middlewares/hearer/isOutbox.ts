import { ContextDefaultState, MessageContext } from "vk-io";

export default (context: MessageContext<ContextDefaultState>, next) => {
    if (context.isOutbox) return next()
}
