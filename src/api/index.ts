import express, {Router} from "express"
import peer from "./peer";

const router = Router()

router.use("/peer", peer)

router.get("/", (req, res) => {
    res.json({test: "test"})
})

export default router
