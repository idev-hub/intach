import { DataTypes } from "sequelize";
import database from "../services/database";

const College = database.define("college", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "token"
    }
})

export default College
