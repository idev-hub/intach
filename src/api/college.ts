import {Router} from "express"
import College from "../models/College";
import Peer from "../models/Peer";

const router = Router()

router.get("/:id", async (req, res) => {
    try {
        const college = await College.findByPk(req.params.id)
        return res.json(college)
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.get("/", async (req, res) => {
    try {
        const colleges = await College.findAll({
            where: req.query
        })
        return res.json(colleges)
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.post("/", async (req, res) => {
    try {
        if (req.body.name) {
            const college = await College.findOne({
                where: {
                    name: req.body.name
                }
            })
            if (college) {
                throw {message: "Данный колледж уже существует"}
            } else {
                const _college = await College.create({
                    name: req.body.name
                })
                return res.json({message: "Колледж создан", code: 200, data: _college})
            }
        } else {
            throw {message: "Не передан обязательный параметр name"}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.put("/:id", async (req, res) => {
    try {
        const college = await College.findByPk(req.params.id)
        if (college) {
            await College.update(req.body, {
                where: {
                    id: req.params.id
                }
            })
            return res.json({message: "Колледж обновлен", code: 200, data: await College.findByPk(req.body.id)})
        } else {
            throw {message: "Данный колледж не существует"}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})
router.delete("/:id", async (req, res) => {
    try {
        const college = await College.findByPk(req.params.id)
        if (college) {
            const users = await Peer.findAll({
                where: {
                    college: req.params.id
                }
            })

            if (users.length > 0) {
                for (let i = 0; i < users.length; i++) {
                    const user = users[i]
                    await user.update({
                        college: null
                    }, {
                        where: {
                            college: req.params.id
                        }
                    })
                }
            }
            await College.destroy({where: {id: req.params.id}})
            return res.json({message: "Колледж удален, а связанные с ним студенты отвязаны.", code: 201})
        } else {
            throw {message: "Данный колледж не существует"}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})

export default router
