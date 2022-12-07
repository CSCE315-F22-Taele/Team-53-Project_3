const express = require("express");
const app = express.Router();
const db = require("../db");

/**
 * This API call will get the menu table
 */
app.get("/getMenu", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM menucost ORDER BY id");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


/**
 * This API call will insert into the checkout table
 */
app.post("/postCheckout", async (req, res) => {
    try {
        const { paymentmethod, amount, cardnumber, orderid } = req.body;

        const todo = await db.query(
            "INSERT INTO checkout(paymentmethod, amount, cardnumber, orderid) VALUES ($1, $2, $3, $4)",
            [paymentmethod, amount, cardnumber, orderid]
        );

        console.log(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * This API call will get current amount of all inventory items to decrement
 */
app.get("/getInventory", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT amount FROM inventory ORDER BY itemid;"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * This API call will update the inventory item amounts based on order
 */
app.post("/postInventory", async (req, res) => {
    try {
        const { amount, itemid } = req.body;

        const todo = await db.query(
            "UPDATE inventory SET amount=$1 WHERE itemid = $2",
            [amount, itemid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
