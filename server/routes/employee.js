const express = require("express");
const app = express.Router();
const db = require("../db");

app.get("/get", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT * FROM employee ORDER BY employeeid"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Update employee information.
*/
app.post("/update", async (req, res) => {
    try {
        const {
            salary,
            employeename,
            ismanager,
            email,
            password,
            employeeid,
        } = req.body;

        const todo = await db.query(
            "UPDATE employee SET salary=$1, employeename=$2, ismanager=$3, email=$4, password=$5 WHERE employeeid=$6",
            [salary, employeename, ismanager, email, password, employeeid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
