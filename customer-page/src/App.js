import './App.css';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const App = () =>{

  const name ='Pom and Honey Manager Tools';
  return (
    <div className="App">
      <h1> {name}</h1>
      {/* { name ? (
        <>
        test
        </>
      ):(
        <h1>test</h1>
      )
      } */}

      <h1>
      <Stack spacing={2} direction="row" justifyContent="center" >
        <Button variant="contained" size="large">Excess Report</Button>
        <Button variant="contained" size="large">Sales Report</Button>
        <Button variant="contained" size="large">Inventory</Button>
        <Button variant="contained" size="large">Menu Customization</Button> 
      </Stack>
      </h1>

      <footer class="backButtons">
      <Stack spacing={2} direction="row" justifyContent="center" >
        <Button variant="contained" size="large">Back to Cashier</Button>
        <Button variant="contained" size="large">Logout</Button>
        
        </Stack>
      </footer>


    </div>
  );
}

export default App;
