require('dotenv').config();

const {
    DB_USER = "postgres",
    DB_PASSWORD = "1234",
    DB_HOST = "127.0.0.1",
    DB_NAME = "db_jualsaya",
} = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        dialect: 'postgres',
        //for connect to heroku, uncomment code below
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
    },
    test: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        dialect: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
    },
    production: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: `${DB_NAME}`,
        host: DB_HOST,
        dialect: 'postgres',
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     },
        // },
    },

};