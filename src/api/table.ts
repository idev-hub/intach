import {Router} from "express"
import {getTable} from "../classes/Timetable";
import Luxon from "../classes/Luxon";
import {DateTime} from "luxon"

const router = Router()

router.get("/:college", async (req, res) => {
    try {
        if (req.query.group) {
            if (req.query.date) {
                const table = await getTable(req.query.group, new Luxon("Asia/Yekaterinburg", DateTime.fromJSDate(new Date(req.query.date))))
                return res.json(table)
            } else {
                throw {message: "Не передан обязательный параметр date"}
            }
        } else {
            throw {message: "Не передан обязательный параметр group"}
        }
    } catch (e) {
        return res.status(403).json({error: e})
    }
})

export default router
