import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, white } from "@mui/material/colors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


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

    const orderStatusGet = async () => {
        try {
            const response = await fetch(conn + "api/order/getOrderStatus");
            const jsonVals = await response.json();
            console.log(jsonVals);
        }
        catch (err) {
            console.error(err.message);
        }
    };

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
    })

    return (
        <div>
            <div id="google_translate_element"></div>
            <Stack direction="row" spacing={1}>
                <Chip label="Order Received" color="success" />
                <Chip label="Making Your Order" color="primary" />
                <Chip label="Order Completed" color="success" />
            </Stack>
        </div>
    );
};

