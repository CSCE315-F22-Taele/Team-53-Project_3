// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./Navbar.css";
// import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Order from "./pages/Order";
import Home from "./pages/Home";
import { BrowserRouter as Link} from "react-router-dom";
import pomHoney from './pomAndHoney.png';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
        <BrowserRouter>
            
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="/order" element={<Order />} />
                </Route>
            </Routes> 
        </BrowserRouter>
//    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
