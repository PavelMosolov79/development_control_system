const Pool = require('pg').Pool
const pool = new Pool({
    user: "postgres",
    password: 'Fghcvb78303591',
    host: "localhost",
    port: 5432,
    database: "db_development"
})

module.exports = pool