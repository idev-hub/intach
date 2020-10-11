import {Sequelize} from "sequelize";

export class Database extends Sequelize {
    constructor(...params) {
        super(...params)
    }
}
