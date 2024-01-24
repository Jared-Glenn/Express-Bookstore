/** Database config for database. */

const { Client } = require("pg");

let DB_URI;

if (process.env.NODE_ENV === "test") {
    DB_URI = "books_test";
}
else {
    DB_URI = "books";
}

const DB_PASSWORD = process.env.DB_PASSWORD

let client = new Client({
    host: "/var/run/postgresql",
    database: DB_URI,
    password: DB_PASSWORD
});

client.connect();


module.exports = client;