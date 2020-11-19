import {Router} from "express"
import {peer} from "../services/peer";
const router = Router()

router.get("/", async (req, res) => {
    const users = await peer.getUsers()
    res.json(users)
})

export default router
