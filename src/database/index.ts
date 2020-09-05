import {Sequelize} from 'sequelize';

let sequelize

sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: "mysql",
});

export default sequelize;
