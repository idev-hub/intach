import { DataTypes } from "sequelize";
import database from "../services/database";
import College from "./College";

const Peer = database.define("peer", {
    peerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    param: {
        type: DataTypes.STRING
    },
    lang: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ru"
    },
})

export default Peer
