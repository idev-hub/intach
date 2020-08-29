import chgpgt from "./bot"
import {users} from './database'
import './scenes/scenes'
import './commands/commands'

users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.')
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e)
})

const http = require("http");

http.createServer(function (request, response) {
    response.end("InTach");
}).listen(process.env.YOUR_PORT || process.env.PORT || 80, () => {
    console.log("INFO: Server host")
    chgpgt.updates.startPolling().then(() => {
        console.log("INFO: BOT RUNNING")
    }).catch(console.error)
})
