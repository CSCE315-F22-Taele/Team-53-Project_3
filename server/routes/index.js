const express = require("express");
const app = express.Router();

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Test API route!",
    });
});

app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO teammembers (name) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM teammembers");
        res.json(allTodo.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "SELECT * FROM teammembers WHERE name = $1",
            [id]
        );
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { descrpition } = req.body;
        const todo = await pool.query(
            "UPDATE teammembers SET phonenumber = $1 WHERE name = $2",
            [descrpition, id]
        );
        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// delete
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query(
            "DELETE FROM teammembers WHERE name = $1",
            [id]
        );
        res.json("Todo was deleted!");
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = app;
