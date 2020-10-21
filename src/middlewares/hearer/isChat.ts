import { ContextDefaultState, MessageContext } from "vk-io";

export default (context: MessageContext<ContextDefaultState>, next) => {
    if (context.isChat) return next()
}
