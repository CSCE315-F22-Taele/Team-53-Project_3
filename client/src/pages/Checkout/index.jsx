import React, { useState, useEffect } from 'react';
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
import Stack from '@mui/material/Stack';
import Hidden from '@mui/material/Hidden';
import {BrowserRouter as Routes, Link, useLocation} from 'react-router-dom';
 
// For local testing:
//const conn = "http://localhost:3500/";
// For production:
 const conn = "https://pom-and-honey-bhf5.onrender.com/";
 
/* FIXME:
  - Make page responsive to screen size
*/

export default function CheckoutPage(props) {
 
  const theme = createTheme({
    palette: {
      primary: {
        main: '#283593',
      },
      secondary: indigo,
    },
  });
 
  const [open_card, setCard] = useState(false);
  const [open_uin, setUIN] = useState(false);
 
  const handleClickOpen_Card = () => {
    setCard(true);
    setPaymentMethod(2);
  };
 
  const handleClose_Card = () => {
    setCard(false);
  };

  const handleClose_Card_Submitted = () => {
    setCard(false);
    // alert("Please click checkout to submit your order.")
  }

  const handleClickOpen_UIN_Dining = () => {
    setUIN(true);
    setPaymentMethod(0);
  };

  const handleClickOpen_UIN_MealSwipe = () => {
    setUIN(true);
    setPaymentMethod(1);

  };
 
  const handleClose_UIN = () => {
    setUIN(false);
  };
 
  const selectCash = async () => {
    setPaymentMethod(3);
    alert("Please submit order and head to the cashier to make payment.");
  }

  const postCheckout = async () => {
    try {
      const cardnumber = cardNumber;
      const paymentmethod = paymentMethod;
      const amount = location.state.totalCost;
      const orderid = location.state.orderid;

      const body = {paymentmethod, amount, cardnumber, orderid};
            fetch (conn + "api/checkout/postCheckout",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
      alert("Please wait for your order to be called: " + orderid);
    } catch (err) {
      console.error(err.message);
    }
  }

  const postInventory = async () => {    
    for (var i = 0; i < totalInventory.length; i++) {
      var tmp = JSON.stringify(totalInventory[i]);
      var tmp_int = parseInt(tmp.substring(10, tmp.length-1));
      var amount = tmp_int - parseInt(location.state.inventoryUsed[i]);
      var itemid = i + 1;
      
      try {
        const body = {amount, itemid};
        fetch (conn + "api/checkout/postInventory",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }
      )} catch (err) {
        console.error(err.message);
      }
    }
  }

  const submitCheckout = async () => {
    postCheckout();
    postInventory();
  }

  // Used to receive data from order page
  const location = useLocation();

  // Used to store value of customer input
  const [paymentMethod, setPaymentMethod] = useState(3);
  const [cardNumber, setCardNumber] = useState("");
  const [totalInventory, setInventory] = useState([]);

  const handleCardNumber = async (e) => {
    setCardNumber(e.target.value);
  }

  const getInventory = async () => {
    setInventory([]);
    try {
      const response = await fetch(conn + "api/checkout/getInventory");
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect( () => {
    getInventory();
}, [])


  return (
      <div className="App">
          <div className='container'>
            <div className='pay-method'>
              <ThemeProvider theme={theme}>
                  <Button className='btn' sx={{m: 2, color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={selectCash} >Cash</Button>
                  <Button className='btn'  variant='contained' sx={{m: 2, color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_Card}>Credit/Debit</Button>
                 
                <Dialog open={open_card} onClose={handleClose_Card}>
                    <DialogTitle>Card Information</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Please fill in your card information:
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
                            value = { cardNumber } 
                            onChange = { handleCardNumber }
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
                          <Button onClick={handleClose_Card_Submitted}>Save</Button>
                        </DialogActions>
                </Dialog>
 
                <Button className='btn'  variant='contained' sx={{color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_UIN_Dining}>Dining Dollars</Button>
               
                <Dialog open={open_uin} onClose={handleClose_UIN}>
                    <DialogTitle>Student Information</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Please fill in your UIN:
                      </DialogContentText>
                      <TextField
                        required
                        margin="dense"
                        id="outlined-required"
                        label="UIN"
                        type="text"
                        fullWidth
                        variant="standard"
                        value = { cardNumber }
                        onChange = { handleCardNumber }
                      />
                    </DialogContent>
 
                    <DialogActions>
                      <Button onClick={handleClose_UIN}>Cancel</Button>
                      <Button onClick={handleClose_Card_Submitted}>Save</Button>
                    </DialogActions>
                </Dialog>
                <Button className='btn' variant='contained'  sx={{color: 'white'}} style={{backgroundColor: "#52588b", color:"white"}} onClick={handleClickOpen_UIN_MealSwipe}>Meal Swipe</Button>
              </ThemeProvider>
          </div>
          <div className='receipt'>
                <h2> Receipt </h2>

            <br></br>
            <br></br>
            <br></br>
            <div>
 
            <br></br>
            <br></br>
            <br></br>
            </div>

                <h2> Cost: ${location.state.totalCost} </h2>
                <Stack spacing = {2}>
                    <br></br>
                    <Link to="/">
                      <Button  variant="contained" size="large" onClick={() => submitCheckout()}>Check out</Button>
                    </Link>
                </Stack>
 
            </div>
          </div>
       
        <footer class="backButtons">
          <Stack spacing={2} direction="row" justifyContent="center" >
          <ThemeProvider theme={theme}>
            <Hidden>
            {/* <Button variant="contained" size="large" >Logout</Button>
            <Button variant="contained" size="large" >Edit Order</Button> */}
            </Hidden>
            <Link to="/">
              <Button variant="contained" size="large" >Cancel Order</Button>
            </Link>
          </ThemeProvider>
          </Stack>
        </footer>
 
      </div>
 
  );
}
