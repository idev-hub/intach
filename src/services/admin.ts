import bot from "./bot";

export namespace admin {
    export const getAdmins = async () => {
        const admins = await bot.api.groups.getMembers({
            group_id: process.env.GROUP_ID,
            // @ts-ignore
            filter: "managers"
        })
        return admins.items
    }

    export const isAdmin = async (context) => {
        const admins = await getAdmins()
        return !!admins.find(f => f["id"] === context.peerId);
    }
}
