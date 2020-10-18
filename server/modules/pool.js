const pg = require('pg');

// Setup PG to connect to DB
const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app', // the name of database
    host: 'localhost',// where the database is located
    port: 5432,// the database port, 5432 is postgres default
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect - otherwise cancel
});

pool.on('connect', () => {
    console.log("Postgresql Connected");
} );

pool.on('error', (error) => {
    console.log("error with Postgresl pool", error);
});

module.exports = pool;