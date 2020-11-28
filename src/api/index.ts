import {Router} from "express"
import peer from "./peer";
import college from "./college";
import table from "./table";
import LoadFile from "../utils/LoadFile";

const router = Router()

router.use("/peer", peer)
router.use("/college", college)
router.use("/table", table)

router.get("/", (req, res) => {
    // LoadFile("2.xlsx", "https://download.microsoft.com/download/1/4/E/14EDED28-6C58-4055-A65C-23B4DA81C4DE/Financial%20Sample.xlsx").then(_path => {
    //     console.log(_path)
    // })
})

export default router
