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

/***
NOT TESTED: Need to update employee table in db.
***/

/*
Insert a new employee.
*/
app.post("/insert", async (req, res) => {
    try {
        const { employeename, email, password } = req.body;

        const hoursworked = 0;
        const salary = 12;
        const ismanager = false;

        const todo = await db.query(
            "INSERT INTO employee (hoursworked, salary, employeename, ismanager, email, password) VALUES ($1, $2, $3, $4, $5, $6)",
            [hoursworked, salary, employeename, ismanager, email, password]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Check if email & password is valid combo in employee table.
*/
app.get("/isEmployee/:email/:password", async (req, res) => {
    try {
        const email = req.params.email;
        const password = req.params.password;

        const todo = await db.query(
            "SELECT * FROM employee WHERE email=$1 AND password=$2",
            [email, password]
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
