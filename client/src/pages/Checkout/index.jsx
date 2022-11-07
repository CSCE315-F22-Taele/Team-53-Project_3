import React from 'react';
import Button from '@mui/material/Button';
import "./index.css"
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
// import './main.css';
import Stack from '@mui/material/Stack';
// import pomHoney from './pomAndHoney.png';
import Hidden from '@mui/material/Hidden';
// import Box from '@mui/material/Box';

export default function CheckoutPage() {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#283593',
      },
      secondary: indigo,
    },
  });

  const [open_card, setCard] = React.useState(false);
  const [open_uin, setUIN] = React.useState(false);

  const handleClickOpen_Card = () => {
    setCard(true);
  };

  const handleClose_Card = () => {
    setCard(false);
  };

  const handleClickOpen_UIN = () => {
    setUIN(true);
  };

  const handleClose_UIN = () => {
    setUIN(false);
  };

  return (
      <div className="App">
        
        <div class="header"> 
          <div class="imgLogo">
            {/* <img src={pomHoney}  class="pomHoneyLogo" alt="Pom and Honey Logo"/>  */}
          </div>
  
          <div class="title">
            <h3>Pom and Honey Checkout Page</h3>
          </div> 
        </div>

        <div>
        <div>
      <div className='container'>
        <div className='pay-method'>
            <ThemeProvider theme={theme}>
            <Button className='btn' sx={{m: 2, color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} >Cash</Button>
            <Button className='btn'  variant='contained' sx={{m: 2, color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_Card}>Credit/Debit</Button>
            <Dialog open={open_card} onClose={handleClose_Card}>
                <DialogTitle>Card Information</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please fill the information of your card
                  </DialogContentText>
                  <TextField
                    required
                    margin="dense"
                    id="outlined-required"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                   <TextField
                    required
                    margin="dense"
                    id="outlined-required"
                    label="Card Number"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                   <TextField
                    required
                    margin="dense"
                    id="outlined-required"
                    label="Expiration Date"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                   <TextField
                    required
                    margin="dense"
                    id="outlined-required"
                    label="Security Code"
                    type="text"
                    fullWidth
                    variant="standard"
                  />                 
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose_Card}>Cancel</Button>
                  <Button onClick={handleClose_Card}>Save</Button>
                </DialogActions>
            </Dialog>

            <Button className='btn'  variant='contained' sx={{color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_UIN}>Dining Dollars</Button>
            <Dialog open={open_uin} onClose={handleClose_UIN}>
                <DialogTitle>Student Information</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please fill your UIN
                  </DialogContentText>
                  <TextField
                    required
                    margin="dense"
                    id="outlined-required"
                    label="UIN"
                    type="text"
                    fullWidth
                    variant="standard"
                  />
                  </DialogContent>
                  <DialogActions>
                  <Button onClick={handleClose_UIN}>Cancel</Button>
                  <Button onClick={handleClose_UIN}>Save</Button>
                </DialogActions>
            </Dialog>
            <Button className='btn' variant='contained'  sx={{color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_UIN}>Meal Swipe</Button>
            </ThemeProvider>
        </div>
        <div className='receipt'>
            <h2>Receipt</h2>
          {/* <ThemeProvider theme={theme}>
            <Button variant="contained" size="large" className='checkoutBtn'>Check Out</Button>
          </ThemeProvider> */}
           
            {/* <Box 
            justifyContent="flex-end"
            alignContent="flex-end"
            >
              <Button
                id="new-sumbit"
                type="submit"
                color="primary"
                variant="contained"
                autoFocus>
                Check Out
              </Button>
            </Box> */}
          <button className='checkoutBtn'>Checkout</button>
        </div>


      </div>

    </div>
        </div>
        
        <footer class="backButtons">
          <Stack spacing={2} direction="row" justifyContent="center" >
          <ThemeProvider theme={theme}>
            <Hidden>
            {/* <Button variant="contained" size="large" >Logout</Button>
            <Button variant="contained" size="large" >Edit Order</Button> */}
            </Hidden>
            <Button variant="contained" size="large" >Cancel Order</Button>
            
          </ThemeProvider>
          </Stack>
        </footer>
  
      </div>

  );
}
