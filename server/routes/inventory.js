const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/get", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM inventory ORDER BY itemid");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/update", async (req, res) => {
    try {
        const {
            itemname,
            amount,
            cost,
            expirationdate,
            vendor,
            is_using,
            classify,
            itemid,
        } = req.body;

        const todo = await db.query(
            "UPDATE inventory SET itemname=$1, amount=$2, cost=$3, expirationdate=$4, vendor=$5, is_using=$6, classify=$7 WHERE itemid=$8",
            [
                itemname,
                amount,
                cost,
                expirationdate,
                vendor,
                is_using,
                classify,
                itemid,
            ]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
