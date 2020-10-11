import {Sequelize} from "sequelize";

let database: Sequelize = new Sequelize({
    host: process.env.DBHOST,
    username: process.env.DBNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DBUSER,
    dialect: "mysql",
})

if (process.env.NODE_ENV !== "development") {
    database = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        },
        ssl: true,
    })
}

export default database
