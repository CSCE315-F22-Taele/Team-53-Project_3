import * as React from "react";
import "./index.css";
import pomHoney from "./pomAndHoney.png";
import {
    // BrowserRouter as Routes,
    // Switch,
    // Route,
    // Router,
    Link,
    useNavigate
} from "react-router-dom";
// import Order from "../../pages/Order";
// import Home from "../../pages/Home";

export default function Navbar() {

const auth = localStorage.getItem("userName");
const navigate  = useNavigate();
const logout =() => {
    localStorage.clear();
    navigate('/login');
}

    return (
        <nav className="navBar">
            <Link to="/" className="home">
                {" "}
                <img src={pomHoney} class="logoNav" alt="Pom and Honey Logo" />
            </Link>
            <ul className="nav__list" >
                <li>
                    <Link class="nav__link" to="/">
                        {" "}
                        Home
                    </Link>
                </li>
                <li>
                    <Link class="nav__link" to="/order">
                        {" "}
                        Order Now
                    </Link>
                </li>
                { auth ? 
                <li>
                    <Link class="nav__link" onClick={logout} to="/login">
                        {" "}
                        Logout
                    </Link>
                </li>: 
                <li>
                <Link class="nav__link" to="/login">
                    {" "}
                    Login
                </Link>
                </li>
                }
                

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
