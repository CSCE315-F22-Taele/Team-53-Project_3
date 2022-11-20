const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/isEmployee", async (req, res) => {
    try {
        const { employeename } = req.body;
        const todo = await db.query(
            "SELECT * FROM employee WHERE employeename = $1",
            [employeename]
        );

        var isEmployee = false;
        if (todo.rowCount >= 1) {
            isEmployee = true;
        }

        res.json(isEmployee);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
