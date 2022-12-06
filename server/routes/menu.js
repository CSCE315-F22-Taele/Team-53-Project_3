const express = require("express");
const app = express.Router();
const db = require("../db");

/**
 * This API call will get the entire menu table
 * @type {HTTP GET Request}
 */
app.get("/get", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM menucost ORDER BY id");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * This API call will update a menu item in menucost table
 * @type {HTTP POST Request}
 */
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

/**
 * This API call will insert a new menu item into menucost
 * @type {HTTP POST Request}
 */
app.post("/insert", async (req, res) => {
    try {
        const {
            menuitem,
            cost,
            is_selling,
            is_customize,
            default_inventory,
        } = req.body;

        const todo = await db.query(
            "INSERT INTO menucost(menuitem, cost, is_selling, is_customize, default_inventory) VALUES ($1, $2, $3, $4, $5);",
            [menuitem, cost, is_selling, is_customize, default_inventory]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * This API call will get the inventory name and classifcation from the inventory
 * @type {HTTP GET Request}
 */
app.get("/getInventory", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT itemname, classify FROM inventory ORDER BY itemid"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
