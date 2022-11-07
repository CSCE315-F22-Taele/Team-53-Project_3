import './Order.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import {useState} from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#283593',
    },
    secondary: indigo,
  },
});


const Order = () =>{  
    const [showCustom, setIsShown] = useState(false);
    const name ='Pom and Honey at Texas A&M MSC';

    const handleClick = event =>{
      setIsShown(current => !current);
      
    }

    return (
      <div class="pageOrder">

    <div class="orderingSection">
        <h1 class="orderingTitle"> Ordering from Pom and Honey at Texas A&M MSC</h1>

        <h2> Item</h2>
        <ThemeProvider theme={theme}>
        <div class="buttons">
        
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}
          onClick={handleClick}>
          Gyro</Button>

          <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Drink</Button>
        </div>

        {showCustom && (
        <div>
        <h2> Base</h2>
        <div class="buttons">
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Rice</Button>
        </div>
      

        <h2> Protein</h2>
        <div class="buttons">
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Chicken</Button>
        </div>


        <h2> Toppings</h2>
        <div class="buttons">
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Lettuce</Button>
        </div>

        <h2> Dressing</h2>
        <div class="buttons">
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Harissa</Button>
        </div>
        
      
        <h2> Extras</h2>
        <div class="buttons">
        <Button  variant="contained" sx={{ width:300, height:300, padding: 1, marginLeft: 2 }}>
          Drinks</Button>
        </div>
      

        </div>
        
        )}
      </ThemeProvider>
    </div> {/*   To divide the section */}
   

    <div class="currentOrder">
      <h1> Current Order</h1>
    </div>

      
    </div>
      

    );

  }

export default Order; 