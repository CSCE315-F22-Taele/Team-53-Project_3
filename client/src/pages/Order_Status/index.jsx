import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, white } from "@mui/material/colors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
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

export default function Order_Status(props){

    const [order, setOrder] = useState([]);
    const [orderID, setOrderID] = useState(0);

    const [received, setReceived] = useState(false);
    const [prepare, setPrepare] = useState(false);
    const [done, setDone] = useState(false);

    const orderStatusGet = async () => {
        
        // const id = CheckoutPage.orderIDStatus;
        const id = 221205000; // hardcoded to test
        try {
            const response = await fetch(conn + `api/order/getCurrentOrderStatus/${id}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const jsonVals = await response.json();
            console.log("response: ", jsonVals);

            setOrder(jsonVals);
            console.log("order: ", order);
        }
        catch (err) {
            console.log("no api");
            console.error(err.message);
        }
    };

    const receiveTrue = () => {
        if (order[0] == 1){
            setReceived(true);
        }
    }

    // const prepareTrue = () => {
    //     if (order[mobile_order] == 2){
    //         setPrepare(true);
    //     }
    // }


    // const doneTrue = () => {
    //     if (order[mobile_order] == 3){
    //         setDone(true);
    //     }
    // }


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
        receiveTrue();
        // prepareTrue();
        // doneTrue();
    },[])

    return (
        <div>
            <div id="google_translate_element"></div>
            <br />
            <h1>Thank you for your order!</h1>
            <br />
            <br />

            <Stack direction="row" spacing={10} size="600px"  justifyContent="center">
                <h2>Order Received</h2>
                <h2>Order in Progress</h2>
                <h2>Order Complete</h2>
            </Stack>
            <br />

            {

                done?

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                </Stack>

                :

                prepare?

                <Stack direction="row" spacing={35} size="600px"  justifyContent="center">
                    <CheckBox fontSize="large"/>
                    <CheckBox fontSize="large"/>
                    <CheckBoxOutlineBlankIcon fontSize="large"/>
                </Stack>

                :

                received?

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

