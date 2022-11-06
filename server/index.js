const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.SERVER_PORT || 3500;

const indexRoute = require("./routes/index"); // Test routes
const orderRoute = require("./routes/order");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
app.use("/api/index", indexRoute); // Test Routes
app.use("/api/order", orderRoute);

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
