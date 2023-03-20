const mysql = require('mysql2')
const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database:"farmeasy" 
})

module.exports = db; 