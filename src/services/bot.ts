import {Bot} from "../classes/Bot";

export default new Bot({
    token: process.env.TOKEN,
    webhookConfirmation: process.env.CONFIRM,
    webhookSecret: process.env.SECRET,
    group_id: process.env.GROUP_ID,
    pollingGroupId: process.env.GROUP_ID
})
