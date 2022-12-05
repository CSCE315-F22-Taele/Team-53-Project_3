import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Cashier_checkout from "./pages/Cashier_checkout";
// import pomHoney from "./pomAndHoney.png";
import Manager from "./pages/Manager";
import Inventory from "./pages/Inventory";
import Menu from "./pages/Menu";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Cashier from "./pages/Cashier";
// import Manager_Route from "./pages/Manager_Route";

const root = ReactDOM.createRoot(document.getElementById("root"));

const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

const getClientId = async () => {
    try {
        const response = await fetch(conn + "api/login/getGoogleClientKey");
        var jsonVals = await response.json();
        localStorage.setItem("id", jsonVals);
    } catch (err) {
        console.error(err.message);
    }
};

getClientId();

root.render(
    // <React.StrictMode>
    <GoogleOAuthProvider clientId={localStorage.getItem("id")}>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cashier" element={<Cashier />} />
                    <Route path="/manager" element={<Manager />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/menu" element={<Menu />} />
                    {/* <Route path="/manager_route" element={<Manager_Route />} /> */}
                    <Route
                        path="/cashier_checkout"
                        element={<Cashier_checkout />}
                    />
                </Route>
            </Routes>
        </HashRouter>
    </GoogleOAuthProvider>
    //{" "}
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
