import * as React from "react";
import "./index.css";
import pomHoney from "./pomAndHoney.png";
import {
    // BrowserRouter as Routes,
    // Switch,
    // Route,
    // Router,
    Link,
} from "react-router-dom";
// import Order from "../../pages/Order";
// import Home from "../../pages/Home";

export default function Navbar() {
    return (
        <nav className="navBar">
            <Link to="/" className="home">
                {" "}
                <img src={pomHoney} class="logoNav" alt="Pom and Honey Logo" />
            </Link>
            <ul className="nav__list" >
                <li>
                    <Link className="nav__link" to="/">
                        {" "}
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="nav__link" to="/order">
                        {" "}
                        Order Now
                    </Link>
                </li>
            </ul>

            {/* <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/Order">
                    <Order />
                </Route>
            </Switch> */}
        </nav>
    );
}
