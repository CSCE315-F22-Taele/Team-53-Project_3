const express = require("express");
const app = express.Router();
const db = require("../db");

/*
For checkout page:
    Inital loading page:
        - Need orderid passed in
        - Pass back ordering entity 

    Submit button:
        - TODO: Insert into checkout        
        - TODO: Update amount in inventory table 
*/

/* Get menucost table
To call in frontend: http://localhost:3500/api/checkout/getMenu
*/
app.get("/getMenu", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM menucost ORDER BY id");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Insert checkout information for specific order 
To call: http://localhost:3500/api/checkout/postCheckout
*/
app.post("/postCheckout", async (req, res) => {
    try {
        const { paymentmethod, amount, cardnumber, orderid } = req.body;

        const todo = await db.query(
            "INSERT INTO public.checkout(paymentmethod, amount, cardnumber, orderid) VALUES ($1, $2, $3, $4)",
            [paymentmethod, amount, cardnumber, orderid]
        );

        console.log(todo.rows);
        // res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Get current invetory amount to decrement
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

/*
Update inventory amount accordingly
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
