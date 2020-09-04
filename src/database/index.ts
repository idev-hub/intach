import {Sequelize} from 'sequelize';

let sequelize

if (process.env.NODE_ENV === "development") {
    sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASSWORD, {
        host: process.env.DBHOST,
        dialect: "mysql",
    });
} else if (process.env.NODE_ENV === "production") {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        ssl: true,
    });
}

export default sequelize;
