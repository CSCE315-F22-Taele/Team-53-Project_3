const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.SERVER_PORT || 3500;

const indexRoute = require("./routes/index"); // Test routes
const orderRoute = require("./routes/order");
const checkoutRoute = require("./routes/checkout");

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
app.use("/api/index", indexRoute); // Test Routes
app.use("/api/order", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use(express.static(path.join(__dirname, "/../../client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    console.log(__dirname);
    // res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
