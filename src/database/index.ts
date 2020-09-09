import {Sequelize} from 'sequelize';

let sequelize
if(process.env.NODE_ENV === "development"){
    sequelize = new Sequelize({
        host: process.env.DBHOST,
        username: process.env.DBNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBUSER,
        dialect: "mysql",
    } )
} else {
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
    })
}

export default sequelize

