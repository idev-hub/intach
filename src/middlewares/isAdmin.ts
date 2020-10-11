import bot from "../services/bot";

export default async (context) => {
    const admins = await bot.api.groups.getMembers({
        group_id: process.env.GROUP_ID,
        // @ts-ignore
        filter: "managers"
    })

    return !!admins.items.find(f => f["id"] === context.peerId);
}
