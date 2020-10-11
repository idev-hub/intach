"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bot_1 = require("../classes/Bot");
exports.default = new Bot_1.Bot({
    token: process.env.TOKEN,
    webhookConfirmation: process.env.CONFIRM,
    webhookSecret: process.env.SECRET,
    group_id: process.env.GROUP_ID,
    pollingGroupId: process.env.GROUP_ID
});
