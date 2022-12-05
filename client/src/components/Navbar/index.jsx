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
import { useState, useEffect } from "react";
// import Order from "../../pages/Order";
// import Home from "../../pages/Home";

export default function Navbar() {



const [nameExists, setNameExists] = useState(false);

useEffect( () => {  
    const name = localStorage.getItem("user");
    if( name !== "" && name !== null){
        setNameExists(true);
    }
})

const navigate  = useNavigate();

const logout =() => {
    localStorage.clear();
    setNameExists(false);
    window.location.reload()
    console.log(localStorage);
    navigate("/login");
}

    console.log(nameExists);
    console.log(localStorage.getItem("user"));
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

                { nameExists ? 
                <>
                <li>
                    <Link class="nav__link" onClick={logout} to="/login">
                        Logout
                    </Link>
                </li>
                <li>
                    <Link class="nav__link" to="/login">
                        Tools
                    </Link>
                </li>

                </>
                
                : 
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
