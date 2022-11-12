import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import pomHoney from "./pomAndHoney.png";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
