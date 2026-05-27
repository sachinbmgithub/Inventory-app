const mysql = require("mysql2");

const db = mysql.createPool({

    host: "localhost",
    user: "root",
    password: "root",
    database: "inventory_db"

}).promise();
console.log("MySQL Connected");

module.exports = db;