import {DataTypes} from "sequelize";
import database from "../services/database";

const Peer = database.define("peer", {
    peerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    param: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ru"
    }
})

export default Peer
