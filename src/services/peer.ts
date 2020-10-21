import Peer from "../models/Peer";
import SubscribeNews from "../models/SubscribeNews";

export namespace peer {

    export const getUsers = async () => {
        return await Peer.findAll()
    }

    export const setUser = async (context, param: string) => {
        const user = await getUser(context)
        if (user) {
            await user.update({
                peerId: context.peerId,
                param: param
            })
        } else {
            await Peer.create({
                peerId: context.peerId,
                param: param
            })
        }
    }
    export const setSubscribe = async (context, param: boolean) => {
        const subscribe = await getSubscribe(context)
        if (subscribe) {
            await subscribe.update({ param: param })
        } else {
            await SubscribeNews.create({
                peerId: context.peerId,
                param: param
            })
        }
    }
    export const getUser = async (context) => {
        return await Peer.findOne({
            where: {
                peerId: context.peerId
            }
        })
    }
    export const getSubscribe = async (context) => {
        return await SubscribeNews.findOne({
            where: {
                peerId: context.peerId
            }
        })
    }
    export const getUserAndSubscribe = async (context) => {
        const user = await Peer.findOne({
            where: {
                peerId: context.peerId
            }
        })

        if (user) {
            const subscribe = await SubscribeNews.findOne({
                where: {
                    peerId: context.peerId
                }
            })

            return {
                peer: user.toJSON() || undefined,
                subscribe: subscribe.toJSON() || undefined
            }
        } else {
            return undefined
        }
    }
}
