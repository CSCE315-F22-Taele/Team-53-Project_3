import * as React from 'react';
import './Navbar.css';
import pomHoney from './pomAndHoney.png';
import { BrowserRouter as Routes,Switch, Route, Router, Link} from "react-router-dom";
import Order from "./pages/Order"
import Home from "./pages/Home"

export default function Navbar() {
    return (
        <nav className="navBar">
    
            <Link to="/" className="home"> <img src={pomHoney} class="logoNav"/></Link>
            <ul>
                <li> 
                <Link to="/Order"> Order Now</Link>
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
    )
}