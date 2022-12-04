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

app.get("/isEmployeeGoogleOauth/:sub", async (req, res) => {
    try {
        const sub = req.params.sub;
        const todo = await db.query(
            "SELECT employeename FROM employee WHERE sub = $1",
            [sub]
        );
        
        var name = todo.rows[0];
        var isEmployee = false;
        if (todo.rowCount >= 1) {
            isEmployee = true;
            name = JSON.stringify(name).substring(
                17,
                JSON.stringify(name).length - 2
            );
        }

        let result = {
            isEmployee: isEmployee,
            employeename: name,
        };
        res.json(result);

        // console.log(todo);
        // var isEmployee = false;
        // if (todo.rowCount >= 1) {
        //     isEmployee = true;
        // }

        // res.json(isEmployee);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/isManagerGoogleOauth/:sub", async (req, res) => {
    try {
        const employeename = req.params.sub;
        const todo = await db.query(
            "SELECT * FROM employee WHERE sub = $1 AND ismanager = true",
            [sub]
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

app.post("/insertGoogleOauth", async (req, res) => {
    try {
        const { sub } = req.body;
        const salary = 10;
        const ismanager = false;

        const todo = await db.query(
            "UPDATE employee SET (sub) VALUES ($1)",
            [sub]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Insert a new employee.
*/
app.post("/insert", async (req, res) => {
    try {
        const { employeename, email, password } = req.body;
        const salary = 10;
        const ismanager = false;

        const todo = await db.query(
            "INSERT INTO employee(salary, employeename, ismanager, email, password) VALUES ($1, $2, $3, $4, $5)",
            [salary, employeename, ismanager, email, password]
        );

        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/updateBasedInsert", async (req, res) => {
    try {
        const { employeeid, email, password } = req.body;

        const todo = await db.query(
            "UPDATE employee SET email= $1, password=$2 WHERE employeeid= $3",
            [ email, password, employeeid]
        );



        res.json(todo.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.get("/getName/:employeeid", async (req, res) => {
    try {
        const employeeid = req.params.employeeid;
        const todo = await db.query(
            "SELECT employeename FROM employee WHERE employeeid=$1",
            [employeeid]
        );

        var name = todo.rows[0];
        var isEmployee = false;
        if (todo.rowCount >= 1) {
            isEmployee = true;
            name = JSON.stringify(name).substring(
                17,
                JSON.stringify(name).length - 2
            );
        }

        let result = {
            isEmployee: isEmployee,
            employeename: name,
        };
        
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
});

/*
Check if email & password is valid combo in employee table.
*/
app.get("/isValidEmployee/:email/:password", async (req, res) => {
    try {
        const email = req.params.email;
        const password = req.params.password;
        const todo = await db.query(
            "SELECT employeename FROM employee WHERE email=$1 AND password=$2",
            [email, password]
        );

        var name = todo.rows[0];
        var isEmployee = false;
        if (todo.rowCount >= 1) {
            isEmployee = true;
            name = JSON.stringify(name).substring(
                17,
                JSON.stringify(name).length - 2
            );
        }

        let result = {
            isEmployee: isEmployee,
            employeename: name,
        };
        res.json(result);
    } catch (err) {
        console.error(err.message);
    }
});
module.exports = app;
