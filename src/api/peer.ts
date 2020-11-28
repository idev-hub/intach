import {Router} from "express"
import Peer from "../models/Peer";

const router = Router()

router.get("/:id", async (req, res) => {
    try {
        const user = await Peer.findByPk(req.params.id)
        return res.json(user)
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.get("/", async (req, res) => {
    try {
        const users = await Peer.findAll({ where: req.query })
        return res.json(users)
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.post("/", async (req, res) => {
    try {
        if (req.body.peerId) {
            const user = await Peer.findOne({
                where: {
                    peerId: req.body.peerId
                }
            })
            if (user) {
                throw {message: "Данный студент уже существует."}
            } else {
                const _user = await Peer.create(req.body)
                return res.json({message: "Студент создан", code: 200, data: _user})
            }
        } else {
            throw {message: "Не передан обязательный параметр peerId"}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.put("/:id", async (req, res) => {
    try {
        const user = await Peer.findByPk(req.params.id)
        if (user) {
            const _user = await Peer.update(req.body, {
                where: {
                    peerId: req.params.id
                }
            })

            return res.json({
                message: "Данные студента обновлены",
                code: 200,
                data: await Peer.findOne({where: {peerId: req.body.peerId}})
            })
        } else {
            throw {message: "Данного студента не существует."}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const user = await Peer.findByPk(req.params.id)
        if (user) {
            const _user = await Peer.destroy({
                where: {peerId: req.params.id}
            })
            return res.status(201).json({message: "Данные студента удалены", code: 201})
        } else {
            throw {message: "Данного студента не существует."}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})

export default router
