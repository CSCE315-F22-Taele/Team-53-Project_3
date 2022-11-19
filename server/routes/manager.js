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

module.exports = app;
