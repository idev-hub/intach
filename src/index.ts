require('dotenv').config()

import app from "./core/Application";

async function init () {
    try {
        await app.start()
    } catch ( e ) {
        return e
    }
}

init().catch(console.info).catch(console.error)
