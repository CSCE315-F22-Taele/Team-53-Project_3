import './main.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import pomHoney from './pomAndHoney.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: '#283593',
      },
      secondary: indigo,
    },
  });

function MainLayout({children}) {
    const name ='Pom and Honey Cashier Page';
    return (
      <div className="App">
        
        <div class="header"> 
          <div class="imgLogo">
            <img src={pomHoney}  class="pomHoneyLogo" alt="Pom and Honey Logo"/> 
          </div>
  
          <div class="title">
            {name}
          </div> 
        </div>

        <div>
            {children}
        </div>
        
        <footer class="backButtons">
        <Stack spacing={2} direction="row" justifyContent="center" >
        <ThemeProvider theme={theme}>
          <Button variant="contained" size="large">Logout</Button>
        </ThemeProvider>
          </Stack>
        </footer>
  
  
      </div>
    );
  }

export default MainLayout
