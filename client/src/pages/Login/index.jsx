import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import e from "cors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';


const theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: indigo,
    },
});


function Login () {

    const Peoplestates = () => {
        const navigate = useNavigate();
        const openprofile = () => {
            navigate ("/order", {
            state:{} 
        });
        }
    }

    const userLogin = () => {
        alert("Logged In")
    };

    return (
    <div>
        <br></br>
        <h1> Welcome to Pom and Honey's System</h1>
        <br></br>
        <br></br>
        <div class="borderArea">
            <ThemeProvider theme={theme}>
            <div class="newPerson">
                <h3> Create Account</h3>
                <br>
                </br>
                <TextField id="name" label="Name" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="email" label="Email" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="password" label="Password" variant="outlined" required fullWidth/>

                <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={userLogin}> Sign In</Button>
                

            </div>

            <div class="loginOld"> 
                <h3> Welcome. Please Login. </h3>

                <br />
                
                <TextField id="email" label="Email" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="password" label="Password" variant="outlined" required fullWidth/>
                <Stack>

                <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} onClick={userLogin}> Sign In</Button>
                {/* <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 2 }} onClick={userLogin}> Change Password</Button> */}
                </Stack>

            </div>

            </ThemeProvider>
        </div>

    </div>
    );
};

export default Login;
