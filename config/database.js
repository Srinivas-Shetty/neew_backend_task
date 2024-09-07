require('dotenv').config();

const { Pool, Client } = require("pg");


const client = new Client({
    user: process.env.DB_USER,
    host:process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,  
    ssl: {
        rejectUnauthorized: false
    },       
    connectionLimit: 1000
})

client.connect(function (err) {
    if (err) {
        console.log(err, "err")
        throw err
    };
    console.log("Hurray! DataBase Connected Successfully!");
});

module.exports.pool = client;







