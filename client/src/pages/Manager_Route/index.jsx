import * as React from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';

import {BrowserRouter as Router, Link, useNavigate, useLocation} from 'react-router-dom';


import {useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { createBox } from "@mui/system";
  
// const conn = "http://localhost:3500/";
const conn = "https://pom-and-honey-bhf5.onrender.com/";

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
            >Cashier</Button>
            </Link>
            
            <Link to="/manager" 
                    state= {{
                        userName: userName
            }}>    
        
          <Button variant="contained" sx={{width:200, height:150, padding: 1, marginLeft: 2,mt:2,   mb:2}}
            >Reports</Button>
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

            
           
        </ThemeProvider>
        </div>

        </Stack>

   

      <footer class="backButtons">
      <Stack spacing={2} direction="row" justifyContent="center" >
      <ThemeProvider theme={theme}>
      <Link to="/cashier" 
                    state= {{
                        userName: userName
        }}>     
        <Button variant="contained" size="large">Back to Cashier</Button>
        </Link>

        <Link to="/login" >     
        <Button variant="contained" size="large">Logout</Button>
        </Link>

      </ThemeProvider>
        </Stack>
      </footer>



        </div>
    );
};

export default Manager_Route;