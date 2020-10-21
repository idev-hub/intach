import {Bot} from "../classes/Bot";

export const getAdmins = async (app: Bot) => {
    const admins = await app.api.groups.getMembers({
        group_id: process.env.GROUP_ID,
        // @ts-ignore
        filter: "managers"
    })
    return admins.items
}

export const isAdmin = async (app, context) => {
    const admins = await getAdmins(app)
    return !!admins.find(f => f["id"] === context.peerId);
}
