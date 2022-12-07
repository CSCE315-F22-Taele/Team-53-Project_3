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
import {BrowserRouter as  Routes,Link, useLocation} from 'react-router-dom';

// const conn = "http://localhost:3500/";
const conn = "https://pom-and-honey-bhf5.onrender.com/";

/**
 * Function to display customer checkout page.
 * @param       {Props} props  Information passed from customer ordering page.
 * @constructor
 */
export default function Cashier_CheckoutPage(props) {

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
    setCreditName("");
    setCreditCardNumber("");
    setCreditExpirationDate("");
    setCreditSecurityCode("");
  };

  /**
  * Error check credit card information input if click submit.
  */
  const handleClose_Card_Submitted = () => {
    if (1000000000000000 < parseInt(creditCardNumber) && 9999999999999999 >= parseInt(creditCardNumber) &&
        /^[A-Za-z\s]*$/.test(creditName) &&
        parseInt(creditExpirationDate.substring(0, 2)) > 0 &&
        parseInt(creditExpirationDate.substring(0, 2)) <= 12 &&
        creditExpirationDate.indexOf("/") > -1 &&
        parseInt(creditExpirationDate.substring(3, 5)) > 0 &&
        parseInt(creditExpirationDate.substring(3, 5)) <= 31 &&
        100 < parseInt(creditSecurityCode) &&
        999 >= parseInt(creditSecurityCode) ) {
      setCard(false);
    }
    else {
      alert("Invalid card information. Please retry.");
    }
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

  const handleClose_UIN_Submitted = () => {
    if (100000000 < parseInt(cardNumber) && 999999999 > parseInt(cardNumber)) {
      setUIN(false);
    }
    else {
      alert("Invalid UIN. Please retry.");
    }
  }

  /**
   * Result if customer selects a cash payment option.
   */
  const selectCash = async () => {
    setPaymentMethod(3);
    alert("Take cash with register.");
    setCreditCardNumber("");
    setCreditName("");
    setCreditExpirationDate("");
    setCreditSecurityCode("");
    setCardNumber("");
  }

  /**
   * Function that inserts checkout information into checkout table.
   */
  const postCheckout = async () => {
    try {
      // Determine type of card (UIN or credit/debit)
      var cardnumber_ = cardNumber;
      if (cardNumber === "") {
        cardnumber_ = creditCardNumber;
      }

      const cardnumber = cardnumber_;
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
      // alert("Please wait for your order to be called: " + orderid);
    } catch (err) {
      console.error(err.message);
    }
  }

  /**
   * Function that decrement inventory amounts used in order when checkout complete and update inventory table.
   */
  const postInventory = async () => {
    for (var i = 0; i < totalInventory.length; i++) {

      var tmp = JSON.stringify(totalInventory[i]);
      var tmp_int = parseInt(tmp.substring(10, tmp.length-1));
      var amount = tmp_int;

      if (parseInt(location.state.inventoryUsed[i]) > 0 && !isNaN(location.state.inventoryUsed[i])) {
        amount = tmp_int - parseInt(location.state.inventoryUsed[i]);
      }
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
  const [creditCardNumber, setCreditCardNumber] = useState("");

  // Used to error check credit card input
  const [creditExpirationDate, setCreditExpirationDate] = useState("");
  const [creditSecurityCode, setCreditSecurityCode] = useState("");
  const [creditName, setCreditName] = useState("");

  const handleCardNumber = async (e) => {
    setCardNumber(e.target.value);
    setCreditCardNumber("");
    setCreditName("");
    setCreditExpirationDate("");
    setCreditSecurityCode("");
  }

  const handleCreditCardNumber = async (e) => {
    setCreditCardNumber(e.target.value);
    setCardNumber("");
  }

  // Error check expiration and security code input for credit card
  const handleCreditExpirationDate = async (e) => {
    setCreditExpirationDate(e.target.value);
  }
  const handleCreditSecurityCode = async (e) => {
    setCreditSecurityCode(e.target.value);
  }
  const handleCreditName = async (e) => {
    setCreditName(e.target.value);
  }

  const getInventory = async () => {
    setInventory([]);
    try {
      const response = await fetch(conn + "api/checkout/getInventory");
      const data = await response.json();
      setInventory(data);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect( () => {
    getInventory();
}, [])

  return (
      <div class="checkout__pageCheckout">

        <div class='checkout__options'>
          <br></br>
          <h1>Checkout</h1>
          <h3> Please select a payment method: </h3>

          <ThemeProvider theme={theme}>
            <div class="checkout__buttons">
              <Button class="btn" variant='contained'
              onClick={selectCash} >Cash</Button>

              <Button class="btn" variant='contained' onClick={handleClickOpen_Card}>Credit/Debit</Button>

              <Button class="btn" variant='contained' onClick={handleClickOpen_UIN_Dining}>Dining Dollars</Button>

              <Button class="btn" variant='contained' onClick={handleClickOpen_UIN_MealSwipe}>Retail Swipe</Button>

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
                            label="Full Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            value = { creditName }
                            onChange = { handleCreditName }
                          />
                          <TextField
                            required
                            margin="dense"
                            id="outlined-required"
                            label="Card Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            value = { creditCardNumber }
                            onChange = { handleCreditCardNumber }
                          />
                          <TextField
                            required
                            margin="dense"
                            id="outlined-required"
                            label="Expiration Date"
                            type="text"
                            fullWidth
                            variant="standard"
                            value = { creditExpirationDate }
                            onChange = { handleCreditExpirationDate }
                          />
                          <TextField
                            required
                            margin="dense"
                            id="outlined-required"
                            label="Security Code"
                            type="text"
                            fullWidth
                            variant="standard"
                            value = { creditSecurityCode }
                            onChange = { handleCreditSecurityCode
                            }
                          />
                        </DialogContent>

                        <DialogActions>
                          <Button onClick={handleClose_Card}>Cancel</Button>
                          <Button onClick={handleClose_Card_Submitted}>Submit</Button>
                        </DialogActions>
                </Dialog>

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
                      <Button onClick={handleClose_UIN_Submitted}>Submit</Button>
                    </DialogActions>
                </Dialog>

            </div>
          </ThemeProvider>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>

        </div>

        <div class="checkout__receipt">
          <br></br>
          <h2> Receipt </h2>
          <br></br>
          <table>
            <tr>
              <th class="item">Item</th>
              <th class="price">Price</th>
            </tr>
          </table>
          <table>

                { location.state.listOrderedNames.map( (item) =>
                    <tr>
                        <td class="item">{item[0]} </td>
                        <td class="price"> ${item[1]} </td>
                    </tr>
                )}

            </table>
            <div>

            <br></br>
            <br></br>
            <br></br>
            </div>
            <h2> Cost: ${location.state.totalCost} </h2>
                <Stack spacing = {0}>
                    <br></br>
                    <Link to="/cashier"
                    state= {{
                      userName : location.state.userName
                    }}>
                      <Button  variant="contained" size="large" sx={{mt: 3, backgroundColor:"#283593", color:"white" }} fullWidth={true} onClick={() => submitCheckout()}>Check out</Button>
                    </Link>
                    <Link to="/cashier"
                    state= {{
                      userName : location.state.userName
                    }}>
                      <Button  variant="contained" size="large" sx={{mt: 3, backgroundColor:"#9d222e", color:"white" }} fullWidth={true}>Cancel Order</Button>
                    </Link>
                </Stack>
        </div>
      </div>
  );
}
