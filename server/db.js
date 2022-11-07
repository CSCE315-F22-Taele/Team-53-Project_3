const Pool = require("pg").Pool;

// const conString = "postgres://csce331_904_preksha:enterMySQL@:csce-315-db.engr.tamu.edu:5432/csce331_904_53"

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
   
    // connectionString: process.env.DATABASE_CONNECTION,
    
    // connectionString: process.env.DATABASE_URL ||  'postgresql://csce331_904_preksha:enterMySQL@localhost:5432/csce331_904_53',
    // ssl: process.env.DATABASE_URL ? true : false
    ssl: { rejectUnauthorized: false },

   
});


console.log(process.env.DB_NAME);
module.exports = pool;
