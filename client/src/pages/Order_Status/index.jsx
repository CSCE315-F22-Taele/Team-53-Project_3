import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, white } from "@mui/material/colors";
import {BrowserRouter as Router, Link, useLocation, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckoutPage from '../Checkout/index';
import DoneIcon from '@mui/icons-material/Done';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBox from '@mui/icons-material/CheckBox';

// For local testing: (comment out)
const conn = "http://localhost:3500/";
// For production:
// const conn = "https://pom-and-honey-bhf5.onrender.com/";
const theme = createTheme({
    palette: {
        primary: {
            main: '#283593',
        },
        secondary: indigo,
    },
});

/**
 * Function to display customer checkout page.
 * @param       {Props} props  Information passed from customer checkout page
 * @constructor
 */

export default function Order_Status(props){

    const [orderstatus, setStatus] = useState(null);
    const location = useLocation();

    /*
    *   gets an number of 1, 2, or 3 representing order status
    */
    const orderStatusGet = async () => {
        
        const id = location.state.orderIDStatus;
        console.log(id);

        try {
            const response = await fetch(conn + `api/order/getCurrentOrderStatus/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const jsonVals = await response.json();
            console.log("response: ", jsonVals);
            
            setStatus(jsonVals[0].mobile_order);
            
        }
        catch (err) {
            console.log("no api");
            console.error(err.message);
        }
    };

    /*
    *   Google translate api call
    */

    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
    };

    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);

 
    useEffect( () => {
        orderStatusGet();
    },[])

    return (
        <div>
            <div id="google_translate_element"></div>
            <br />
            <h1>Thank you for your order!</h1>
            <h3>Your order number is {location.state.orderIDStatus}</h3>
            <br />
            <br />

            <Stack direction="row" spacing={10} size="600px"  justifyContent="center">
                <h2>Order Received</h2>
                <h2>Order in Progress</h2>
                <h2>Order Complete</h2>
            </Stack>
            <br />

            {

                orderstatus === 3?

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                </Stack>

                :

                orderstatus === 2?

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                </Stack>

                :

                orderstatus === 1?

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBox fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                </Stack>

                :

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                </Stack>
                
            }
       </div>
    );
};

