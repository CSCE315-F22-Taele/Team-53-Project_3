const express = require("express");
const app = express.Router();
const db = require("../db");

/* Get orderid for a new order 
To call in frontend: http://localhost:3500/api/order/getOrderId
*/
app.get("/getOrderId", async (req, res) => {
    try {
        // Determine orderid based on current date
        var today = new Date();
        var tmp =
            today.getFullYear().toString() + (today.getMonth() + 1).toString();

        if (today.getDate() < 10) {
            tmp += "0";
        }
        tmp += today.getDate().toString();
        tmp = tmp.substring(2) + "000";

        var date_int = parseInt(tmp);

        const todo = await db.query(
            "SELECT orderid FROM ordering ORDER BY orderid DESC LIMIT 1"
        );

        // Convert QueryList<val> into integer
        var lastOrderId = JSON.stringify(todo.rows[0]);
        var lastOrderId_int = parseInt(
            lastOrderId.substring(11, lastOrderId.length - 1)
        );

        var currOrderId;
        if (lastOrderId_int >= date_int) {
            currOrderId = lastOrderId_int + 1;
        } else {
            currOrderId = date_int;
        }

        // console.log(currOrderId);
        res.json(currOrderId);
    } catch (err) {
        console.error(err.message);
    }
});

/* Get inventory table
To call in frontend: http://localhost:3500/api/order/getInventory
*/
app.get("/getInventory", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM inventory ORDER BY itemid");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/* Get menucost table
To call in frontend: http://localhost:3500/api/order/getMenu
*/
app.get("/getMenu", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM menucost ORDER BY id");

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/* Submit order to ordering table 
To call: http://localhost:3500/api/order/postOrder

Note: Make sure variables in req.body is the same as the ones passed in!
*/
app.post("/postOrder", async (req, res) => {
    try {
        const {
            orderid,
            current,
            totalCost,
            listOrdered,
            inventoryUsed,
            mobile_order,
        } = req.body;

        const todo = await db.query(
            "INSERT INTO ordering (orderid, timeoforder, amount, ordereditems, inventory, mobile_order) VALUES ($1, $2, $3, $4, $5, $6)",
            [
                orderid,
                current,
                totalCost,
                listOrdered,
                inventoryUsed,
                mobile_order,
            ]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/updateOrder", async (req, res) => {
    try {
        const { orderid, mobile_order } = req.body;

        const todo = await db.query(
            "UPDATE ordering SET mobile_order=$1 WHERE orderid=$2",
            [mobile_order, orderid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getOrderStatus", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT * FROM ordering WHERE mobile_order != 0 AND mobile_order != 3"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getNewOrders/:mobile_order", async (req, res) => {
    try {
        
        const mobile_order = req.params.mobile_order;
        console.log(req.params.mobile_order);
        console.log(mobile_order);
        const todo = await db.query(
            "SELECT * FROM ordering WHERE mobile_order = $1",
            [mobile_order]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/getCurrentOrderStatus/:orderid", async (req, res) => {
    try {
        const orderid = req.params.orderid;
        const todo = await db.query(
            "SELECT mobile_order FROM ordering WHERE orderid = $1",
            [orderid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
