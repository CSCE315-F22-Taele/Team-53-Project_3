import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, white } from "@mui/material/colors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


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
    return (
        <div>
            hi
        </div>
    );
};

