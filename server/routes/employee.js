const express = require("express");
const app = express.Router();
const db = require("../db");

/**
 * This API call will get the employee table
 */
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

/**
 * Add employee information.
 */
app.post("/add", async (req, res) => {
    try {
        const { salary, employeename, ismanager, email, password } = req.body;

        console.log(salary, employeename, ismanager);
        const todo = await db.query(
            "INSERT INTO employee(salary, employeename, ismanager, email, password, is_working) VALUES ($1, $2, $3, $3, $4, $5, true)"[
                (salary, employeename, ismanager, email, password)
            ]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Select employeeid given employee information.
 */
app.get("/getID", async (req, res) => {
    try {
        const todo = await db.query(
            "SELECT employeeid FROM employee WHERE employeename=($1), salary=($2), ismanager=($3)"
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Update employee working status.
 */
app.post("/update_working", async (req, res) => {
    try {
        const { is_working, employeeid } = req.body;

        const todo = await db.query(
            "UPDATE employee SET is_working=$1 WHERE employeeid=$2",
            [is_working, employeeid]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * id is the employee id
 */
app.get("/isValidEmployee/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await db.query(
            "SELECT * FROM employee WHERE employeeid = $1",
            [id]
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

/**
 * Get employee information.
 */
app.get("/getEmployee/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const todo = await db.query(
            "SELECT * FROM employee WHERE employeeid = $1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

/**
 * Update employee information.
 */
app.post("/update", async (req, res) => {
    try {
        const {
            salary,
            employeename,
            ismanager,
            email,
            password,
            is_working,
            id,
        } = req.body;

        const todo = await db.query(
            "UPDATE employee SET salary=$1, employeename=$2, ismanager=$3, email=$4, password=$5, is_working=$6 WHERE employeeid=$7",
            [salary, employeename, ismanager, email, password, is_working, id]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
