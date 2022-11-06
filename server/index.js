const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.SERVER_PORT || 5000;

const indexRoute = require("./routes/index"); // Test routes
const menuRoute = require("./routes/menu");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
app.use("/menu", menuRoute);
app.use("/api/index", indexRoute); // Test Routes

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
