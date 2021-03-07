import { ContextDefaultState, MessageContext } from "vk-io";

export default (context: MessageContext<ContextDefaultState>, next) => {
    console.log(!context.isOutbox)
    if (!context.isOutbox) return next()
}
