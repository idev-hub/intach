import {DataTypes} from "sequelize";
import database from "../services/database";

const SubscribeNews = database.define("subscribe_news", {
    peerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    param: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
})

export default SubscribeNews
