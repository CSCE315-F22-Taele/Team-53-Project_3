const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/isEmployee/:employeename", async (req, res) => {
    try {
        const employeename = req.params.employeename;
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

app.get("/isManager/:employeename", async (req, res) => {
    try {
        const employeename = req.params.employeename;
        const todo = await db.query(
            "SELECT * FROM employee WHERE employeename = $1 AND ismanager = true",
            [employeename]
        );

        var isManager = false;
        if (todo.rowCount >= 1) {
            isManager = true;
        }

        res.json(isManager);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
