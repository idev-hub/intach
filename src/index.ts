require('dotenv').config()

import {CallbackService, ICallbackServiceTwoFactorPayload, CallbackServiceRetry, API, VK} from "vk-io";
import {DirectAuthorization, officialAppCredentials} from "@vk-io/authorization";
import readline from "readline";
import database from "./services/database";
import Token from "./models/Token";
import app from "./classes/Application";

const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
const callbackService = new CallbackService()
callbackService.onTwoFactor((payload: ICallbackServiceTwoFactorPayload, retry: CallbackServiceRetry) => {
    readLine.question("Enter VK code:", answer => {
        retry(answer).then(console.log).catch(console.error)
    })
})

const _app = new DirectAuthorization({
    callbackService,
    ...officialAppCredentials.windows,
    scope: ["groups"],
    login: process.env.VK_LOGIN,
    password: process.env.VK_PASSWORD,
    apiVersion: "5.124"
})

const force = process.env.DBFORCE === "true" || false
const alter = process.env.DBALTER === "true" || false

_app.run().then((async ({token}) => {
    try {
        if (token) {
            await database.sync({force: force, alter: alter})
            console.info("Database initialized")

            const _token = await Token.findOne()
            if (!_token) {
                await Token.create({token: token})
            } else {
                await _token.update({token: token})
            }
            console.info("Token received successfully")

            await app.start()
            console.info("Bot launched")
        }
    } catch (e) {
        console.log(e)
    }
})).catch(console.error)
