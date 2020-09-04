import db from "../index";
import {DataTypes} from "sequelize";

const User = db.define("user", {
    peerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    param: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isBlock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    perpermission: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
})

export default User;
