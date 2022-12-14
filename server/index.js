const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");

const PORT = process.env.SERVER_PORT || 3500;

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes
const orderRoute = require("./routes/order");
const checkoutRoute = require("./routes/checkout");
const inventoryRoute = require("./routes/inventory");
const menuRoute = require("./routes/menu");
const managerRoute = require("./routes/manager");
const loginRoute = require("./routes/login");
const employeeRoute = require("./routes/employee");

app.use("/api/order", orderRoute);
app.use("/api/checkout", checkoutRoute);
app.use("/api/inventory", inventoryRoute);
app.use("/api/menu", menuRoute);
app.use("/api/manager", managerRoute);
app.use("/api/login", loginRoute);
app.use("/api/employee", employeeRoute);

app.use(
    cors({
        origin: ["http://localhost:3000/", "https://pomandhoney.onrender.com/"],
    })
);

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
