const express = require("express");
const app = express.Router();
const db = require("../db");

/**
 * This API call willl get the inventory table
 * @type {HTTP GET Request}
 */
app.get("/get", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM inventory ORDER BY itemid");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * This API call will update an inventory item
 * @type {HTTP POST Request}
 */
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

/**
 * This API call will insert a new item into the inventory table
 * @type {[type]}
 */
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

/**
 * This API call will get the item and amount of items below 100
 * @type {HTTP GET Request}
 */
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

/**
 * This API call will get the default inventory for each menu item
 * @type {HTTP GET Request}
 */
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

/**
 * This API call will resize the default array and insert into menu cost when a new inventory item is added
 * @type {HTTP POST Request}
 */
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
