const express = require("express");
const app = express.Router();
const db = require("../db");

/* Get orderid for a new order 
To call in frontend: http://localhost:5000/api/order/getOrderId
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

        var currOrderId;
        if (todo.rows > date_int) {
            currOrderId = todo.rows + 1;
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
To call in frontend: http://localhost:5000/api/order/getInventory
*/
app.get("/getInventory", async (req, res) => {
    try {
        const todo = await db.query("SELECT * FROM inventory ORDER BY itemid");

        // console.log(todo.rows);
        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
