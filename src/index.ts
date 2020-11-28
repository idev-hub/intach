require('dotenv').config()

import database from "./services/database";
import app from "./classes/Application";
import Peer from "./models/Peer";
import College from "./models/College";

const force = process.env.DBFORCE === "true" || false;
const alter = process.env.DBALTER === "true" || false;

College.hasOne(Peer, {
    foreignKey: { name: 'college' }
})

async function init() {
    try {
        await database.sync({force: force, alter: alter})
        if(force || alter){
            await College.create({
                name: 'Государственное бюджетное профессиональное образовательное учреждение «Челябинский государственный промышленно-гуманитарный техникум им.А.В.Яковлева»'
            })
        }
        console.info('Database initialized')

        await app.start()
    } catch (e) {
        return e
    }
}

init().catch(console.info).catch(console.error)
