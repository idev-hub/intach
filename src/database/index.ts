import {Sequelize} from "sequelize";

const db = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql"
});

// const db = new Sequelize(process.env.POSTQRESS_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     dialectOptions: {
//         ssl: {
//             require: true,
//             rejectUnauthorized: false,
//         }
//     },
//     ssl: true
// });

export default db;
