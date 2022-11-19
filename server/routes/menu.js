const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/get", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM menucost ORDER BY id");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/update", async (req, res) => {
    try {
        const {
            menuitem,
            cost,
            is_selling,
            is_customize,
            default_inventory,
            id,
        } = req.body;

        const todo = await db.query(
            "UPDATE menucost SET menuitem=$1, cost=$2, is_selling=$3, is_customize=$4, default_inventory=$5 WHERE id=$6",
            [menuitem, cost, is_selling, is_customize, default_inventory, id]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;