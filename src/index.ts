import chgpgt from "./bot"
import {users} from './database'
import './scenes/scenes'
import './commands/commands'

users.asyncLoadDatabase().then(() => {
    console.log('INFO: local database loaded successfully.')
}).catch((e) => {
    console.log('FATAL: local database could not be loaded. Caused by: ' + e)
})

chgpgt.updates.start().then(console.log).catch(console.error)
