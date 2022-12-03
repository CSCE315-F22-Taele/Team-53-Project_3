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

app.post("/insert", async (req, res) => {
    try {
        const {
            itemname,
            amount,
            cost,
            expirationdate,
            vendor,
            is_using,
            classify,
        } = req.body;

        const todo = await db.query(
            "INSERT INTO inventory(itemname, amount, cost, expirationdate, vendor, is_using, classify) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [itemname, amount, cost, expirationdate, vendor, is_using, classify]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getRestock", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT itemname, amount FROM inventory WHERE amount < 100 ORDER BY amount"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getMenu", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT default_inventory, id FROM menucost ORDER BY id"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/updateMenu", async (req, res) => {
    const { default_inventory, id } = req.body;
    try {
        const todo = await db.query(
            "UPDATE menucost SET default_inventory=$1 WHERE id=$2",
            [default_inventory, id]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
