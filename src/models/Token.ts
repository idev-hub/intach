import { DataTypes } from "sequelize";
import database from "../services/database";

const Token = database.define("token", {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    }
})

export default Token
