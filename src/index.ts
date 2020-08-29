require('dotenv').config()


import express = require("express")
import chgpgt from "./bot"
import {users} from './database'
import './scenes/scenes'
import './commands/commands'


users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.')
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e)
})


const app: express.Application = express()
const port: String | Number | undefined = process.env.PORT || 80

app.get("*", function (req, res) {
    res.send("<h1><a href='https://vk.com/in_teach'>InTach</a></h1>")
})

app.listen(port, function () {
    console.log(`INFO: App is listening on port ${port}!`)
    chgpgt.updates.startPolling().then(() => {
        console.log("INFO: BOT RUNNING")
    }).catch(console.error)
})
