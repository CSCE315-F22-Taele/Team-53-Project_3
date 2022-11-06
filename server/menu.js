const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.SERVER_PORT || 5000;

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
app.get("/api/test", (req, res) => {
    res.json({
        message: "Hello from Test API route!",
    });
});

/*
id: classify enum in inventory table
    0 : bowl/gyro customizable items
    1 : protein
    2 : sauces
    3 : misc.
*/
app.get("/api/inventory/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM inventory WHERE classify = $1",
            [id]
        );
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
