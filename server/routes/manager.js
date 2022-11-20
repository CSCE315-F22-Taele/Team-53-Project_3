const express = require("express");
const app = express.Router();
const db = require("../db");

/*
Get sale report
    - Pass in two dates in orderid format
    - Return menu item name & total sold object in decreasing order.
*/
app.get("/getSaleReport", async (req, res) => {
    const { start, end } = req.body;
    try {
        // Initalize array of menu item size
        const menu = await db.query(
            "SELECT menuitem FROM menucost ORDER BY id"
        );
        const total = [];
        const menu_names = []; // Create array of menu items
        for (let i = 0; i < menu.rowCount; i++) {
            total.push(0);
            var tmp = JSON.stringify(menu.rows[i]);
            tmp = tmp.substring(13, tmp.length - 2);
            menu_names.push(tmp);
        }

        // Calculate total number of menu items sold
        const total_items = await db.query(
            "SELECT ordereditems FROM ordering WHERE orderid > $1 AND orderid < $2",
            [start, end]
        );

        for (var i in total_items.rows) {
            var tmp = JSON.stringify(total_items.rows[i]);
            tmp = tmp.substring(17, tmp.length - 2);

            var single_order = tmp.split(",");

            for (var item in single_order) {
                total[item] = total[item] + parseInt(single_order[item]);
            }
        }

        // Create object of menu items sold sorted from most to least
        let total_and_name_arr = [];
        for (var a in total) {
            let total_name = { name: menu_names[a], sold: total[a] };
            total_and_name_arr.push(total_name);
        }

        total_and_name_arr.sort(function(a, b) {
            return b.sold - a.sold;
        });
        res.json(total_and_name_arr);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Get excess report
    - Pass in two dates in orderid format & threshold percentage.
    - Return inventory item name & total inventory item used in decreasing order.
*/
app.get("/getExcessReport", async (req, res) => {
    const { start, end, threshold } = req.body;
    try {
        // Initalize array of inventory item size
        const inventory = await db.query(
            "SELECT itemname FROM inventory ORDER BY itemid"
        );
        const total = [];
        const inventory_names = []; // Create array of menu items
        for (let i = 0; i < inventory.rowCount; i++) {
            total.push(0);
            var tmp = JSON.stringify(inventory.rows[i]);
            tmp = tmp.substring(13, tmp.length - 2);
            inventory_names.push(tmp);
        }

        // Calculate total number of inventory items used
        const total_items = await db.query(
            "SELECT inventory FROM ordering WHERE orderid > $1 AND orderid < $2",
            [start, end]
        );

        for (var i in total_items.rows) {
            var tmp = JSON.stringify(total_items.rows[i]);
            tmp = tmp.substring(14, tmp.length - 2);

            var single_order = tmp.split(",");

            for (var item in single_order) {
                total[item] = total[item] + parseInt(single_order[item]);
            }
        }

        // Calculate inventory used less than given threshold
        const amount = await db.query(
            "SELECT amount FROM inventory ORDER BY itemid"
        );
        const inventory_amount = [];
        for (let i = 0; i < amount.rowCount; i++) {
            var tmp = JSON.stringify(amount.rows[i]);
            tmp = tmp.substring(10, tmp.length - 1);
            inventory_amount.push(tmp);
        }

        below_threshold = [];
        for (var a in inventory_amount) {
            var tmp = (total[a] / (inventory_amount[a] + total[a])) * 100;
            tmp = tmp * 100; // Why multiply 100 twice?
            if (tmp < parseFloat(threshold)) {
                let inventory_and_name = {
                    name: inventory_names[parseInt(a) - 1],
                    amount: total[a],
                };
                below_threshold.push(inventory_and_name);
            }
        }

        below_threshold.sort(function(a, b) {
            return b.amount - a.amount;
        });
        res.json(below_threshold);
    } catch (err) {
        console.err(err.message);
    }
});

module.exports = app;
