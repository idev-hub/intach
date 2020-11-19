require('dotenv').config()

import database from "./services/database";
import app from "./classes/Application";

const force = process.env.DBFORCE === "true" || false;
const alter = process.env.DBALTER === "true" || false;

async function init() {
    try {
        await database.sync({force: force, alter: alter})
        console.info('Database initialized')

        await app.start()
    } catch (e) {
        return e
    }
}

init().catch(console.info).catch(console.error)
