const express = require("express");
const app = express.Router();
const db = require("../db");

/**
 * This API call will get the employee table
 * @type {HTTP GET Request}
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

/*
Update employee information.
*/
app.post("/add", async (req, res) => {
    try {
        const {
            salary,
            employeename,
            ismanager,

        } = req.body;

        console.log(salary, employeename, ismanager);
        const todo = await db.query(
            "INSERT INTO employee(salary, employeename, ismanager, is_working) VALUES ($1, $2, $3, true)",
            [salary, employeename, ismanager]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

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


module.exports = app;
