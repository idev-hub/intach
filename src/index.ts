import chgpgt from "./bot"
import {users} from './database'
import './scenes/scenes'
import './commands/commands'

users.loadDatabase(function (error) {
    if (error) {
        console.log('FATAL: local database could not be loaded. Caused by: ' + error)
        throw error
    }
    console.log('INFO: local database loaded successfully.')
})

chgpgt.updates.start().catch(console.error)
