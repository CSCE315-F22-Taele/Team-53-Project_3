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
import {BrowserRouter as Router, Link, useNavigate, useLocation} from 'react-router-dom';


import {useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { createBox } from "@mui/system";
  
// For local testing: (comment out)
const conn = "http://localhost:3500/";
// For production:
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

const theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: indigo,
    },
    
});

function Manager_Route(props) {
    const location = useLocation();

    const userName = location.state.userName;
    return (
        <div>
            <h2>Manager Tools</h2>

            <div class="header"> 
        
        
      </div>

  
      
      <Stack spacing={5} direction="row" justifyContent="center" >
      <div>
        <ThemeProvider theme={theme}>
            
            <Link to="/cashier" 
                    state= {{
                        userName: userName
            }}>     
          <Button variant="contained" color="primary" sx={{width:200, height:150, padding: 1, marginLeft: 2,mt:2,  mb:2}}
            >Excess Report</Button>
            </Link>
            
            <Link to="/manager" 
                    state= {{
                        userName: userName
            }}>    
        
          <Button variant="contained" sx={{width:200, height:150, padding: 1, marginLeft: 2,mt:2,   mb:2}}
            >Sales Report</Button>
            </Link>
            
            </ThemeProvider>
            </div>
        </Stack>

        <Stack spacing={5} direction="row" justifyContent="center" >
       
        <div>
        <ThemeProvider theme={theme}> 
        
            <Link to="/inventory" 
                    state= {{
                        userName: userName
            }}>    
          <Button variant="contained" sx={{ width:200, height:150,padding: 1, marginLeft: 2,mt:2,  mb:2 }}
            >Inventory</Button>
            </Link>
           
            <Link to="/menu" 
                    state= {{
                        userName: userName
            }}>    
          <Button variant="contained" sx={{ width:200, height:150, padding: 1, marginLeft: 2, mt:2,mb:2 }}
            >Menu Customization</Button> 
            </Link>

            <Link to="/cashier" 
                    state= {{
                        userName: userName
            }}>     
          <Button variant="contained" color="primary" sx={{width:200, height:150, padding: 1, marginLeft: 2,mt:2,  mb:2}}
            >Cashier</Button>
            </Link>
           
        </ThemeProvider>
        </div>

        </Stack>

   

      <footer class="backButtons">
      <Stack spacing={2} direction="row" justifyContent="center" >
      <ThemeProvider theme={theme}>
        <Button variant="contained" size="large">Back to Cashier</Button>
        <Button variant="contained" size="large">Logout</Button>
      </ThemeProvider>
        </Stack>
      </footer>



        </div>
    );
};

export default Manager_Route;