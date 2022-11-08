import './App.css';
import * as React from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import pomHoney from './pomAndHoney.png';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Navbar from "./Navbar"
import Order from "./pages/Order"
import Home from "./pages/Home"
// import { Switch } from '@mui/material';
// import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";




const App = () =>{


  return (
    <div className="App">
      <Navbar />
  


      
    
{/*       
      { <Stack spacing={5} direction="row" justifyContent="center" >
        <ThemeProvider theme={theme}>
         
          <Button variant="contained" color="primary" sx={{ width: 300, height:300, padding: 1, marginLeft: 2 }}
            >Order Now!</Button>
          
          <Button variant="contained" sx={{ width: 300, height:300, padding: 1, marginLeft: 2 }}
            >Sales Report</Button>
          <Button variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}
            >Inventory</Button>
          <Button variant="contained" sx={{ width: 300, height:300, padding: 1, marginLeft: 2 }}
            >Menu Customization</Button> 
        </ThemeProvider>
      </Stack> }


      </h1>

      <footer class="backButtons">
      <Stack spacing={2} direction="row" justifyContent="center" >
      <ThemeProvider theme={theme}>
        <Button variant="contained" size="large">Back to Cashier</Button>
        <Button variant="contained" size="large">Logout</Button>
      </ThemeProvider>
        </Stack>
      </footer> */}


    </div> 
  );
}

/* { name ? (
        <>
        test
        </>
      ):(
        <h1>test</h1>
      )
      } */
      
export default App;
