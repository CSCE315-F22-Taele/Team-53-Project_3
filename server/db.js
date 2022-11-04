const Pool = require("pg").Pool;

const pool = new Pool({
    user: "csce331_904_victoria",
    password: "victoria",
    host: "csce-315-db.engr.tamu.edu",
    port: 5432,
    database: "csce331_904_53",
    ssl: { rejectUnauthorized: false },
});

module.exports = pool;
