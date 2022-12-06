import React, { useRef } from 'react'
import { useState, useEffect } from "react";
import "./index.css";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Hint } from 'react-autocomplete-hint';
import { format } from 'date-fns'
import { border, fontWeight, style } from '@mui/system';
import { Link } from 'react-router-dom';
 
const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";
 
function Inventory(){
 
   const theme = createTheme({
       palette: {
           primary: {
               main: "#283593",
           },
           deactive: {
               main:"#9d222e",
           },
           secondary: indigo,
       },
       typography: {
            fontSize: 16,
       },
   });
 
   const deactivate_theme = createTheme({
       palette: {
           primary: {
               main: "#9d222e",
           },
           secondary:{
               main:"#b94b56",
           },
       },
       typography: {
            fontSize: 16,
       },
   });
 
   const increaseSize = createTheme({
       typography: {
            fontSize: 16,
       },
   });
   const [invName, set_invName] = useState([]);
   const [inventory0, setInventory0] = useState([]);
   const [inventory1, setInventory1] = useState([]);
   const [inventory2, setInventory2] = useState([]);
   const [inventory3, setInventory3] = useState([]);
   const [inventory4, setInventory4] = useState([]);
 
   const [deac_inventory0, set_deac_Inventory0] = useState([]);
   const [deac_inventory1, set_deac_Inventory1] = useState([]);
   const [deac_inventory2, set_deac_Inventory2] = useState([]);
   const [deac_inventory3, set_deac_Inventory3] = useState([]);
   const [deac_inventory4, set_deac_Inventory4] = useState([]);
 
   const [restock, set_restock] = useState([]);
 
 
 
   const [inventory, setInventory] = useState([]);
 
   const [name_display, set_nameDisplay] = useState('');
   const [amount_display, set_amountDisplay] = useState('');
   const [cost_display, set_costDisplay] = useState('');
   const [expirationdate_display, set_dateDisplay] = useState('');
   const [vendor_display, set_vendorDisplay] = useState('');
   const [id, setId] = useState('');
   const [classify_display, set_classifyDisplay] = useState('');
   const [update_status, set_update_status] = useState(true);
 
   const inputName = useRef('');
 
   const name_input = useRef('');
   const amount_input = useRef('');
   const cost_input = useRef('');
   const date_input = useRef('');
   const vendor_input = useRef('');
   const classify_input = useRef('');
  
   // This will fetch entire inventory table. Need to parse through to determine specific information.
   const getInventory = async () => {
       try {
           const response = await fetch(conn + "api/inventory/get");
           const data = await response.json();
           for( var key in data) {
               let inventoryBase = [];
               let inventoryProteins = [];
               let inventoryToppings = [];
               let inventoryDressings = [];
               let inventoryMisc = [];
 
               let deac_inventoryBase = [];
               let deac_inventoryProteins = [];
               let deac_inventoryToppings = [];
               let deac_inventoryDressings = [];
               let deac_inventoryMisc = [];
               let inv = [];
               let list = invName;
 
               if(data[key].is_using){
                   if (data[key].classify === 0){
                       inventoryBase.push(data[key].itemname);
                       inventoryBase.push(data[key].amount);
                       inventoryBase.push(data[key].cost);
                       inventoryBase.push(data[key].expirationdate);
                       inventoryBase.push(data[key].vendor);
                       inventoryBase.push(data[key].classify);
                       inventoryBase.push(data[key].itemid);
                       inventoryBase.push(data[key].is_using);
 
                       let inventoryVals = inventory0;
                       inventoryVals.push(inventoryBase);
  
                       setInventory0(inventoryVals); 
                   }
                   else if(data[key].classify === 1){
                       inventoryProteins.push(data[key].itemname);
                       inventoryProteins.push(data[key].amount);
                       inventoryProteins.push(data[key].cost);
                       inventoryProteins.push(data[key].expirationdate);
                       inventoryProteins.push(data[key].vendor);
                       inventoryProteins.push(data[key].classify);
                       inventoryProteins.push(data[key].itemid);
                       inventoryProteins.push(data[key].is_using);
 
                       let inventoryVals = inventory1;
                       inventoryVals.push(inventoryProteins);
  
                       setInventory1(inventoryVals);
                   }
                   else if(data[key].classify === 2){
                       inventoryToppings.push(data[key].itemname);
                       inventoryToppings.push(data[key].amount);
                       inventoryToppings.push(data[key].cost);
                       inventoryToppings.push(data[key].expirationdate);
                       inventoryToppings.push(data[key].vendor);
                       inventoryToppings.push(data[key].classify);
                       inventoryToppings.push(data[key].itemid);
                       inventoryToppings.push(data[key].is_using);
 
 
 
                       let inventoryVals = inventory2;
                       inventoryVals.push(inventoryToppings);
  
                       setInventory2(inventoryVals);
                   }
                   else if(data[key].classify === 3){
                       inventoryDressings.push(data[key].itemname);
                       inventoryDressings.push(data[key].amount);
                       inventoryDressings.push(data[key].cost);
                       inventoryDressings.push(data[key].expirationdate);
                       inventoryDressings.push(data[key].vendor);
                       inventoryDressings.push(data[key].classify);
                       inventoryDressings.push(data[key].itemid);
                       inventoryDressings.push(data[key].is_using);
 
 
                       let inventoryVals = inventory3;
                       inventoryVals.push(inventoryDressings);
  
                       setInventory3(inventoryVals);
                   }
                   else if(data[key].classify === 4){
                       inventoryMisc.push(data[key].itemname);
                       inventoryMisc.push(data[key].amount);
                       inventoryMisc.push(data[key].cost);
                       inventoryMisc.push(data[key].expirationdate);
                       inventoryMisc.push(data[key].vendor);
                       inventoryMisc.push(data[key].classify);
                       inventoryMisc.push(data[key].itemid);
                       inventoryMisc.push(data[key].is_using);
 
 
                       let inventoryVals = inventory4;
                       inventoryVals.push(inventoryMisc);
  
                       setInventory4(inventoryVals);
                   }
               } else {
                   if (data[key].classify === 0){
                       deac_inventoryBase.push(data[key].itemname);
                       deac_inventoryBase.push(data[key].amount);
                       deac_inventoryBase.push(data[key].cost);
                       deac_inventoryBase.push(data[key].expirationdate);
                       deac_inventoryBase.push(data[key].vendor);
                       deac_inventoryBase.push(data[key].classify);
                       deac_inventoryBase.push(data[key].itemid);
                       deac_inventoryBase.push(data[key].is_using);
 
                       let inventoryVals = deac_inventory0;
                       inventoryVals.push(deac_inventoryBase);
  
                       set_deac_Inventory0(inventoryVals); 
                   }
                   else if(data[key].classify === 1){
                       deac_inventoryProteins.push(data[key].itemname);
                       deac_inventoryProteins.push(data[key].amount);
                       deac_inventoryProteins.push(data[key].cost);
                       deac_inventoryProteins.push(data[key].expirationdate);
                       deac_inventoryProteins.push(data[key].vendor);
                       deac_inventoryProteins.push(data[key].classify);
                       deac_inventoryProteins.push(data[key].itemid);
                       deac_inventoryProteins.push(data[key].is_using);
 
                       let inventoryVals = deac_inventory1;
                       inventoryVals.push(deac_inventoryProteins);
  
                       set_deac_Inventory1(inventoryVals);
                   }
                   else if(data[key].classify === 2){
                       deac_inventoryToppings.push(data[key].itemname);
                       deac_inventoryToppings.push(data[key].amount);
                       deac_inventoryToppings.push(data[key].cost);
                       deac_inventoryToppings.push(data[key].expirationdate);
                       deac_inventoryToppings.push(data[key].vendor);
                       deac_inventoryToppings.push(data[key].classify);
                       deac_inventoryToppings.push(data[key].itemid);
                       deac_inventoryToppings.push(data[key].is_using);
 
 
 
                       let inventoryVals = deac_inventory2;
                       inventoryVals.push(deac_inventoryToppings);
  
                       set_deac_Inventory2(inventoryVals);
                   }
                   else if(data[key].classify === 3){
                       deac_inventoryDressings.push(data[key].itemname);
                       deac_inventoryDressings.push(data[key].amount);
                       deac_inventoryDressings.push(data[key].cost);
                       deac_inventoryDressings.push(data[key].expirationdate);
                       deac_inventoryDressings.push(data[key].vendor);
                       deac_inventoryDressings.push(data[key].classify);
                       deac_inventoryDressings.push(data[key].itemid);
                       deac_inventoryDressings.push(data[key].is_using);
 
 
                       let inventoryVals = deac_inventory3;
                       inventoryVals.push(deac_inventoryDressings);
  
                       set_deac_Inventory3(inventoryVals);
                   }
                   else if(data[key].classify === 4){
                       deac_inventoryMisc.push(data[key].itemname);
                       deac_inventoryMisc.push(data[key].amount);
                       deac_inventoryMisc.push(data[key].cost);
                       deac_inventoryMisc.push(data[key].expirationdate);
                       deac_inventoryMisc.push(data[key].vendor);
                       deac_inventoryMisc.push(data[key].classify);
                       deac_inventoryMisc.push(data[key].itemid);
                       deac_inventoryMisc.push(data[key].is_using);
 
 
                       let inventoryVals = deac_inventory4;
                       inventoryVals.push(deac_inventoryMisc);
  
                       set_deac_Inventory4(inventoryVals);
                   }
               }
               inv.push(data[key].itemname);
               inv.push(data[key].amount);
               inv.push(data[key].cost);
               inv.push(data[key].expirationdate);
               inv.push(data[key].vendor);
               inv.push(data[key].classify);
               inv.push(data[key].itemid);
               inv.push(data[key].is_using);
               let inventoryVals = inventory;
               inventoryVals.push(inv);
               list.push(data[key].itemname);
 
               setInventory(inventoryVals);
               set_invName(list);
           }
 
       } catch (err) {
           console.error(err.message);
       }
   }
 
   // Will update current inventory item.
   const updateInventory =(_itemname, _amount, _cost, _expirationdate, _vendor,_classify, _id, _useChecking) => {
       try {
           // Need to update w/ input before inserting.
           var itemname = _itemname;
           var amount = _amount;
           var cost = _cost;
           var expirationdate = _expirationdate;
           var vendor = _vendor;
           var is_using = _useChecking;
           var classify = _classify;
           var itemid = _id;
 
           const body = {itemname,
               amount,
               cost,
               expirationdate,
               vendor,
               is_using,
               classify,
               itemid};
           fetch (conn + "api/inventory/update",
               {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(body)
               }
           )
       } catch (err) {
           console.error(err.message);
       }
   }
  
   // Will insert a new item into inventory.
   const insertInventory = (_itemname, _amount, _cost, _expirationdate, _vendor,_classify) => {
       try {
           // Need to update w/ input before inserting.
           var itemname = _itemname.toLowerCase();
           var amount = _amount;
           var cost = _cost;
           var expirationdate = _expirationdate;
           var vendor = _vendor;
           var is_using = true; // Do not change
           var classify = _classify;
           const body = {itemname,
               amount,
               cost,
               expirationdate,
               vendor,
               is_using,
               classify};
           fetch (conn + "api/inventory/insert",
               {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(body)
               }
           )
          
           var tmp_arr = [];
           console.log(menu[0][1]);
           for (let key in menu) {
 
               tmp_arr = menu[key][1];
               tmp_arr.push(0);
               console.log(tmp_arr);
               updateMenu(menu[key][0], tmp_arr);
           }
          
       } catch (err) {
           console.error(err.message);
       }
 
   }
 
   // Will get restock item names & amounts to be displayed
   const getRestock = async () => {
       try {
           const response = await fetch(conn + "api/inventory/getRestock");
           // Parse through the two attributes (itemname & amount).
           const data = await response.json();
           for(var key in data){
               let list = [];
               list.push(data[key].itemname);
               list.push(data[key].amount);
               let val = restock;
               val.push(list);
               set_restock(val);
           }
       }
       catch (err) {
           console.error(err.message);
       }
   }
 
   const [menu, set_menu] = useState([]);
 
   const getMenu = async () => {
       try {
           const response = await fetch(conn + "api/inventory/getMenu");
           const data = await response.json();
           for(var key in data) {
               let list = [];
               list.push(data[key].id);
               list.push(data[key].default_inventory);
               let val = menu;
               val.push(list);
               set_menu(val);
           }
           //console.log(menu);
       }
       catch (err) {
           console.error(err.message);
       }
   }
 
   const updateMenu = (_id, _default_inventory) => {
       try {
           var id = _id;
           var default_inventory = _default_inventory;
           const body = {default_inventory, id};
           fetch (conn + "api/inventory/updateMenu",
               {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(body)
               }
           )
          
       } catch (err) {
           console.error(err.message);
       }
   }
 
   const sendValue = (c) => {
       set_nameDisplay("");
       set_amountDisplay("");
       set_costDisplay("");
       set_dateDisplay("");
       set_vendorDisplay("");
       set_classifyDisplay("");
       setId("");
       var check = false;
       var n;
       if(c){
           n = inputName.current.value;
       } else {
           n = inputName.current;
       }

       
 
       n = n.toLowerCase();
       
       for(let key in inventory){
           let invName = inventory[key][0];
           invName = invName.toLowerCase();

           if((invName === n && !inventory[key][7] && open_name_activate ) ||
            (invName === n && inventory[key][7] && open_name_deactivate) ||
            (invName === n && open_name_update) || (invName === n && !c) ){
                
            set_nameDisplay(inventory[key][0]);
            set_amountDisplay(inventory[key][1]);
            set_costDisplay(inventory[key][2]);
            let dateArr = inventory[key][3].split('T');
            set_dateDisplay(dateArr[0]);           
            set_vendorDisplay(inventory[key][4]);
            set_classifyDisplay(inventory[key][5]);
            setId(inventory[key][6]);
            check = true;
            break;
           }
       } 
 
       if(check){
           if(open_name_update){
               handleClickOpen_update();
               handleClose_name_update();
           } else if(open_name_deactivate){
               handleClickOpen_deactivate();
               handleClose_name_deactivate();
           } else if(open_name_activate){
               handleClickOpen_activate();
               handleClose_name_activate();
           }           
       } else {
           if(open_name_update){
               handleClickOpen_name_update();
               alert("The item doesn't exist!");
           } else if(open_name_deactivate){
               handleClickOpen_name_deactivate();
               alert("The item doesn't exist or is currently deactivated!");
           } else if(open_name_activate){
               handleClickOpen_name_activate()
               alert("The item doesn't exist or is currently activated!");
           }
       }
 
 
 
      
   }
 
   const [welcome_open, set_welcome] = useState(true);
   const [open_add, set_add] = useState(false);
   const [open_update, set_update] = useState(false);
   const [open_restock, set_openRestock] = useState(false);
   // ask name
   const [open_name_update, set_name_update] = useState(false);
   const [open_name_deactivate, set_name_deactivate] = useState(false);
   const [open_name_activate, set_name_activate] = useState(false);
 
   const [open_deactivate, set_deactivate] = useState(false);
   const [open_activate, set_activate] = useState(false);
 
   const handleClickOpen_add = () => {
       set_add(true);
   };
   const handleClickOpen_update = () => {
       set_update(true);
   };
 
   const handleClickOpen_name_update = () => {
       set_name_update(true);
   };
   const handleClickOpen_name_deactivate = () => {
       set_name_deactivate(true);
   };
   const handleClickOpen_name_activate = () => {
       set_name_activate(true);
   };
   const handleClickOpen_deactivate = () => {
       set_deactivate(true);
   };
   const handleClickOpen_activate = () => {
       set_activate(true);
   };
 
   const handleClose_add_cancel = () => {
       name_input.current.value = '';
       amount_input.current.value = '';
       cost_input.current.value = '';
       date_input.current.value = '';
       vendor_input.current.value = '';
       classify_input.current.value = '';
       set_add(false);
   }
 
   const handleClose_add = () => {
       if (/^[A-Za-z\s]*$/.test(name_input.current.value)) {
           if (/^\d+$/.test(amount_input.current.value)) {
 
               const today_date = new Date();
               const input_date = new Date (date_input.current.value);
 
               if (/^\d+\.\d{0,2}$/.test(cost_input.current.value)) {
 
                   if (/^\d{4}-\d{2}-\d{2}$/.test(date_input.current.value) &&
                   today_date < input_date
                    ) {
                       if (vendor_input.current.value !== "") {
                           if (parseInt(classify_input.current.value) >= 0) {
                               set_add(false);
                               insertInventory(name_input.current.value.toLowerCase(), amount_input.current.value,
                                   cost_input.current.value, date_input.current.value, vendor_input.current.value,
                                   classify_input.current.value);
                               refreshPage();
                           }
                           else {
                               alert("Please select a classification.");
                           }
                       }
                       else {
                           alert("Invalid vendor. Please enter a vendor name.")
                       }
                   }
                   else {
                       alert("Invalid expiration date. Please enter in YYYY-MM-DD format.")
                   }
               }
               else {
                   alert ("Invalid cost. Please enter in X.XX format.");
               }
           }
           else {
               alert ("Invalid amount. Please enter a whole number quantity.");
           }
       }
       else {
           alert("Invalid inventory name. Please retry.");
       }
 
   };
 
   const handleClose_update_cancel = () => {
       set_update(false);
   }
   const handleClose_update = () => {
 
       if (/^[A-Za-z\s]*$/.test(name_input.current.value)) {
           if (/^\d+$/.test(amount_input.current.value)) {
 
               const today_date = new Date();
               const input_date = new Date (date_input.current.value);
 
               if (/^\d+\.\d{0,2}$/.test(cost_input.current.value)) {
 
                   if (/^\d{4}-\d{2}-\d{2}$/.test(date_input.current.value) &&
                   today_date < input_date
                    ) {
                       if (vendor_input.current.value !== "") {
                           set_update(false);
                            let check = true;
                            if(update_status === false){
                                check = false;
                            }
                           updateInventory(name_input.current.value.toLowerCase(), amount_input.current.value,
                                   cost_input.current.value, date_input.current.value, vendor_input.current.value,
                                   classify_input.current.value, id, check);
                           refreshPage();
                       }
                       else {
                           alert("Invalid vendor. Please enter a vendor name.")
                       }
                   }
                   else {
                       alert("Invalid expiration date. Please enter in YYYY-MM-DD format.")
                   }
               }
               else {
                   alert ("Invalid cost. Please enter in X.XX format.");
               }
           }
           else {
               alert ("Invalid amount. Please enter a whole number quantity.");
           }
       }
       else {
           alert("Invalid inventory name. Please retry.");
       }
   };
 
   const handleClose_name_update = () => {
       set_name_update(false);
   };
   const handleClose_name_deactivate = () => {
       set_name_deactivate(false);
   };
   const handleClose_name_activate = () => {
       set_name_activate(false);
   };
 
 
   const handleClose_deactivate = () => {
       set_deactivate(false);
   };
   const handleClose_activate = () => {
       set_activate(false);
   };
  
   const handleClose_welcome = () => {
       set_welcome(false);
   };
 
   const [classifications, setClass] = React.useState('');
 
   const handleChange_class = (event) => {
       set_classifyDisplay(event.target.value);
       setClass(event.target.value);
   };
 
   const handleClickOpen_restock = () => {
       set_openRestock(true);
   }
 
   const handleClose_restock = () => {
       set_openRestock(false);
   }
 
   useEffect( () => {
       getInventory();
       getRestock();
       getMenu();
       console.log(open_deac_base);
   }, [])
 
    function refreshPage() {
        window.location.reload(false);
    }
    const [open_base, set_base] = useState(true);
    const [open_pro, set_pro] = useState(true);
    const [open_top, set_top] = useState(true);
    const [open_dress, set_dress] = useState(true);
    const [open_misc, set_misc] = useState(true);

    const [open_deac_base, set_deac_base] = useState(true);
    const [open_deac_pro, set_deac_pro] = useState(true);
    const [open_deac_top, set_deac_top] = useState(true);
    const [open_deac_dress, set_deac_dress] = useState(true);
    const [open_deac_misc, set_deac_misc] = useState(true);
    const [active1, setActive1] = useState(true);
    const [active2, setActive2] = useState(true);
    const [active3, setActive3] = useState(true);
    const [active4, setActive4] = useState(true);
    const [active5, setActive5] = useState(true);
    const [active6, setActive6] = useState(true);
    const [active7, setActive7] = useState(true);
    const [active8, setActive8] = useState(true);
    const [active9, setActive9] = useState(true);
    const [active10, setActive10] = useState(true);

   return (
       <div className="inventory_page">
 
           <Dialog open={welcome_open} onClose={handleClose_welcome}>
               <DialogTitle>Welcome to the Inventory page.</DialogTitle>
 
               <DialogActions>
                   <Button
                   style={{fontSize: '20px'}}
                    onClick={() => {
                       handleClose_welcome();
                   }}>Start</Button>
               </DialogActions>                               
           </Dialog>
           <ThemeProvider theme={increaseSize}>
           <div className="inventory_receipt-section">
               <Link to="/login">
               <span className='back-btn'>
                    <Button type="submit" size="small" variant="contained" className="inventory_back-btn" >Back</Button>
               </span>
               </Link>
          
               <span className='edit-btn' >
                   
                   <Stack
                       direction="row"
                       spacing={5}
                   >
                  
                   <Button size="small" variant="contained"  className="inventory_add-btn"
                       onClick={() => {
                           handleClickOpen_add();
 
                           set_nameDisplay('');
                           set_amountDisplay('');
                           set_costDisplay('');
                           set_dateDisplay('');
                           set_vendorDisplay('');
                           set_classifyDisplay('');
                       }}>Add Item</Button>
 
                       <Dialog open={open_add} onClose={handleClose_add}>
                           <DialogTitle fontSize={25}>Add New Item</DialogTitle>
                           <DialogContent>
 
                               <TextField
                                   required
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={name_display}
                                   helperText="Item Name"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                                   inputRef={name_input}
                               />
                               <TextField
                                   required
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={amount_display}
                                   helperText="Quantity"
                                   type="text"
                                   fullWidth
                                   variant="standard"  
                                   inputRef={amount_input}                       
                               />
                               <TextField
                                   required
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={cost_display}
                                   helperText="Cost (X.XX)"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                                   inputRef={cost_input}
                               />
 
                               <TextField
                                   required
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={expirationdate_display}
                                   helperText="Expiration Date (YYYY-MM-DD)"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                                   inputRef={date_input}
                               />
 
                               <TextField
                                   required
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={vendor_display}
                                   helperText="Vendor"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                                   inputRef={vendor_input}
                               />
                               <FormControl fullWidth>
                                       <InputLabel name="demo-simple-select-label">Item Classification</InputLabel>
                                       <Select
                                       labelId="demo-simple-select-label"
                                       id="demo-simple-select"
                                       label="Classifications"
                                       onChange={handleChange_class}
                                       inputRef={classify_input}
                                       >
                                       <MenuItem value={0}>Base</MenuItem>
                                       <MenuItem value={1}>Protein</MenuItem>
                                       <MenuItem value={2}>Toppings</MenuItem>
                                       <MenuItem value={3}>Dressing</MenuItem>
                                       <MenuItem value={4}>Miscellaneous</MenuItem>
                                       </Select>
                               </FormControl>
 
                           </DialogContent>
      
                           <DialogActions>
                           <Button onClick={handleClose_add_cancel}>Cancel</Button>
                           <Button onClick={() => {
                               handleClose_add();
                           }}>Add</Button>
                           </DialogActions>
                       </Dialog>
 
                   <Button size="small" variant="contained" className="back1-btn" onClick={handleClickOpen_name_update}>Update</Button>
                      
                       <Dialog open={open_name_update} onClose={handleClose_name_update}>
                           <DialogTitle>Enter item name:</DialogTitle>
                           <DialogContent>
                               <Hint options={invName} allowTabFill>           
                              
                                   <input className='input'
                                       style={{ width: "500px" }}
                                       ref={inputName}
                                   />
                               </Hint>  
                           </DialogContent>
      
                           <DialogActions>
                               <Button onClick={handleClose_name_update}>Cancel</Button>
                               <Button onClick={() => {
                                   sendValue(true);
 
                               }}>Search</Button>
                           </DialogActions>                               
                       </Dialog>
                      
                       <Dialog open={open_update} onClose={handleClose_update}>
                       <DialogTitle fontSize={25}>Update Item</DialogTitle>
                       <DialogContent>
 
                           <TextField
                               required
                               margin="dense"
                               id="outlined-required"
                               defaultValue={name_display}
                               helperText="Item Name"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={name_input}
                           />
                           <TextField
                               required
                               margin="dense"
                               id="outlined-required"
                               defaultValue={amount_display}
                               helperText="Quantity"
                               type="text"
                               fullWidth
                               variant="standard"  
                               inputRef={amount_input}                       
                           />
                           <TextField
                               required
                               margin="dense"
                               id="outlined-required"
                               defaultValue={cost_display}
                               helperText="Cost (X.XX)"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={cost_input}
                           />
 
                           <TextField
                               required
                               margin="dense"
                               id="outlined-required"
                               defaultValue={expirationdate_display}
                               helperText="Expiration Date (YYYY-MM-DD)"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={date_input}
                           />
 
                           <TextField
                               required
                               margin="dense"
                               id="outlined-required"
                               defaultValue={vendor_display}
                               helperText="Vendor"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={vendor_input}
                           />
 
                           <FormControl fullWidth>
                               <Select
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   value={classify_display}
                                   onChange={handleChange_class}
                                   inputRef={classify_input}
                                   >
                                   <MenuItem value={0}>Base</MenuItem>
                                   <MenuItem value={1}>Protein</MenuItem>
                                   <MenuItem value={2}>Toppings</MenuItem>
                                   <MenuItem value={3}>Dressing</MenuItem>
                                   <MenuItem value={4}>Miscellaneous</MenuItem>
                               </Select>
                           </FormControl>
 
                       </DialogContent>
 
                       <DialogActions>
                       <Button onClick={handleClose_update_cancel}>Cancel</Button>
                       <Button onClick={() => {
                           handleClose_update();
                       }}>Update</Button>
                       </DialogActions>
                       </Dialog> 
 
                   <ThemeProvider theme={deactivate_theme}>                   
                   <Button color="primary" size="small" variant="contained" className="back1-btn" onClick={handleClickOpen_name_deactivate} >Deactivate</Button>
                   </ThemeProvider>
 
                       <Dialog open={open_name_deactivate} onClose={handleClose_name_deactivate}>
                           <DialogTitle fontSize={25}>Enter item name:</DialogTitle>
                           <DialogContent>
                               <Hint options={invName} allowTabFill>           
                              
                                   <input className='input'
                                       style={{ width: "500px" }}
                                       ref={inputName}
                                   />
                               </Hint>  
                           </DialogContent>
              
                           <DialogActions>
                               <Button onClick={handleClose_name_deactivate}>Cancel</Button>
                               <Button onClick={() => {
                                   sendValue(true);
                                   console.log(invName);
                               }}>Search</Button>
                           </DialogActions>
                       </Dialog>
  
                       <Dialog PaperProps={{      
                           style: {
                               backgroundColor: "#cf8f8f",
                           },}}
                           open={open_deactivate}  onClose={handleClose_deactivate}>
                           <DialogTitle fontSize={25}>Do you want to deactivate item?</DialogTitle>
                           <DialogContentText>This will remove an inventory item from current use.</DialogContentText>
                           <DialogContent>
                               <TextField
                                   inputProps={{ readOnly: true }}
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={name_display}
                                   helperText="Item name"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                               />
                               <TextField
                                   inputProps={{ readOnly: true }}
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={amount_display}
                                   helperText="Quantity"
                                   type="text"
                                   fullWidth
                                   variant="standard"                          
                               />
                               <TextField
                                   inputProps={{ readOnly: true }}
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={cost_display}
                                   helperText="Cost"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                               />
 
                               <TextField
                                   inputProps={{ readOnly: true }}
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={expirationdate_display}
                                   helperText="Expiration Date"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                               />
 
                               <TextField
                                   inputProps={{ readOnly: true }}
                                   margin="dense"
                                   id="outlined-required"
                                   defaultValue={vendor_display}
                                   helperText="Vendor"
                                   type="text"
                                   fullWidth
                                   variant="standard"
                               />   
                               <FormControl fullWidth>
                                   <Select
                                       inputProps={{ readOnly: true }}
                                       labelId="demo-simple-select-label"
                                       id="demo-simple-select"
                                       value={classify_display}
                                       onChange={handleChange_class}
                                       inputRef={classify_input}
                                       >
                                       <MenuItem value={0}>Base</MenuItem>
                                       <MenuItem value={1}>Protein</MenuItem>
                                       <MenuItem value={2}>Toppings</MenuItem>
                                       <MenuItem value={3}>Dressing</MenuItem>
                                       <MenuItem value={4}>Miscellaneous</MenuItem>
                                   </Select>
                               </FormControl>          
                           </DialogContent>
              
                           <DialogActions>
                               <Button onClick={handleClose_deactivate}>Cancel</Button>
                               <Button onClick={() => {

                                        updateInventory(name_display, amount_display, cost_display, expirationdate_display, vendor_display,
                                            classify_display, id, false);
                                       handleClose_deactivate();
                                       refreshPage();
                                       
                               }}>Deactivate</Button>
                           </DialogActions>
                       </Dialog>
 
                   <Button size="small" variant="contained" className="back1-btn" onClick={handleClickOpen_name_activate} >Activate</Button>
                       <Dialog open={open_name_activate} onClose={handleClose_name_activate}>
                           <DialogTitle fontSize={25}>Enter item name:</DialogTitle>
                           <DialogContent>
                               <Hint options={invName} allowTabFill>           
                              
                                   <input className='input'
                                       style={{ width: "500px" }}
                                       ref={inputName}
                                   />
                               </Hint>  
                           </DialogContent>
      
                           <DialogActions>
                               <Button onClick={handleClose_name_activate}>Cancel</Button>
                               <Button onClick={() => {
                                       sendValue(true);
 
                               }}>Search</Button>
                           </DialogActions>
                       </Dialog>
 
                   <Dialog
                       PaperProps={{      
                       style: {
                           backgroundColor: "#82cdad",
                       },}} 
                       open={open_activate}
                       onClose={handleClose_activate}>
                      
                       <DialogTitle fontSize={25}>Do you want to reactivate item?</DialogTitle>
                       <DialogContentText>This will activate an inventory item for current use.</DialogContentText>
 
                       <DialogContent>
                           <TextField
                               inputProps={{ readOnly: true }}
                               margin="dense"
                               id="outlined-required"
                               defaultValue={name_display}
                               helperText="Item name"
                               type="text"
                               fullWidth
                               variant="standard"
                           />
                           <TextField
                               inputProps={{ readOnly: true }}
                               margin="dense"
                               id="outlined-required"
                               defaultValue={amount_display}
                               helperText="Quantity"
                               type="text"
                               fullWidth
                               variant="standard"                          
                           />
                           <TextField
                               inputProps={{ readOnly: true }}
                               margin="dense"
                               id="outlined-required"
                               defaultValue={cost_display}
                               helperText="Cost"
                               type="text"
                               fullWidth
                               variant="standard"
                           />
 
                           <TextField
                               inputProps={{ readOnly: true }}
                               margin="dense"
                               id="outlined-required"
                               defaultValue={expirationdate_display}
                               helperText="Expiration Date"
                               type="text"
                               fullWidth
                               variant="standard"
                           />
 
                           <TextField
                               inputProps={{ readOnly: true }}
                               margin="dense"
                               id="outlined-required"
                               defaultValue={vendor_display}
                               helperText="Vendor"
                               type="text"
                               fullWidth
                               variant="standard"
                           />   
                           <FormControl fullWidth>
                               <Select
                                   inputProps={{ readOnly: true }}
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   value={classify_display}
                                   onChange={handleChange_class}
                                   inputRef={classify_input}
                                   >
                                   <MenuItem value={0}>Base</MenuItem>
                                   <MenuItem value={1}>Protein</MenuItem>
                                   <MenuItem value={2}>Toppings</MenuItem>
                                   <MenuItem value={3}>Dressing</MenuItem>
                                   <MenuItem value={4}>Miscellaneous</MenuItem>
                               </Select>
                           </FormControl>
                       </DialogContent>
          
                       <DialogActions>
                           <Button onClick={handleClose_activate}>Cancel</Button>
                           <Button onClick={() => {
                               updateInventory(name_display, amount_display, cost_display, expirationdate_display, vendor_display,
                                   classify_display, id, true);
                            console.log(expirationdate_display);
                               handleClose_name_activate();
                               handleClose_activate();
                               refreshPage();
                           }}>Activate</Button>
                       </DialogActions>
                      
                   </Dialog>
 
                   <Button size="small" variant="contained" className="back1-btn" onClick={handleClickOpen_restock} >Restock</Button>
                   <Dialog open={open_restock} onClose={handleClose_restock}>
                   <DialogContentText style={{color: 'red'}}>Please reorder items:</DialogContentText>
 
                       <TableContainer component={Paper}>
                       <Table sx={{ width: "max-content"}}  aria-label="simple table">
                           <TableHead>
                           <TableRow>
                               <TableCell>Item Name</TableCell>
                               <TableCell align="right">Amount</TableCell>
 
                           </TableRow>
                           </TableHead>
                           <TableBody>
                           {restock.map((item) => (
                               <TableRow
                               key={item[0]}
                               sx={{ '&:last-child td, &:last-child th': { border: 0, color: 'red' },
                           }}
                               >
                               <TableCell component="th" scope="row">
                                   {item[0]}
                               </TableCell>
                                   <TableCell align="right">{item[1]}</TableCell>
                               </TableRow>
                           ))}
                           </TableBody>
                       </Table>
                       </TableContainer>
                       <DialogActions>
                               <Button onClick={handleClose_restock}>Close</Button>
                       </DialogActions>
                   </Dialog>
                   </Stack>
               </span>
           </div>
 
           <div className='inventory_deactivate-section'>
               <h1>Deactivated Items</h1>

               <ThemeProvider theme={theme}>

               <h2 className='cat' onClick={()=>{
                set_deac_base(!open_deac_base)
                setActive6(!active6)}}
                style={{fontWeight: active6 ? 600 : 400}}
                >Base</h2>

                   <div className="base">
                       {deac_inventory0.map((item) =>
                             
                               (                                              
                                open_deac_base &&    <Button className='inventory_item-btn' 
                                   inventory_item-btn variant="contained" 
                                   sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                   onClick= { () => 
                                    {
                                        set_update_status(false);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();
                                        
                                    }}
                                    
                                    >
                                   {item[0]}</Button>
                                  
                               )                                 
                           )
                       }
                      
                   </div>

                    <h2 className='cat' onClick={()=>{
                        set_deac_pro(!set_deac_pro);
                        setActive7(!active7)}}
                        style={{fontWeight: active7 ? 600 : 400}}
                        >Protein</h2>
                    <div className="protein">
                       
                       {deac_inventory1.map( (item) =>
                               (    
                                open_deac_pro &&    <Button  
                                   onClick= { () => 
                                    {
                                        set_update_status(false);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}

                                   className='inventory_item-btn' variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                   {item[0]}</Button>
                               )                                 
                           )
                       }
                   </div>

                   <h2 className='cat' onClick={()=>{
                    set_deac_top(!open_deac_top);
                    setActive8(!active8)}}
                    style={{fontWeight: active8 ? 600 : 400}}
                    >Toppings</h2>

                   <div className="toppings">
                       {deac_inventory2.map( (item) =>
                               (
                                open_deac_top &&    <Button
                                   onClick= { () => 
                                    {
                                        set_update_status(false);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}

                                   className='inventory_item-btn' variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                   {item[0]}</Button>
                               )
                           )
                       }
 
                   </div>

                   <h2 className='cat' onClick={()=>{
                    set_deac_dress(!open_deac_dress);
                    setActive9(!active9)}}
                    style={{fontWeight: active9 ? 600 : 400}}
                    >Dressing</h2>
                   <div className="dressing">
                       {deac_inventory3.map( (item) =>
                               (
                                open_deac_dress &&    <Button 
                                   onClick= { () => 
                                    {
                                        set_update_status(false);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}

                                   className='inventory_item-btn' variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                   {item[0]}</Button>
                               )
                           )
                       }
 
                   </div>

                   <h2 className='cat' onClick={()=>{
                    set_deac_misc(!open_deac_misc)
                    setActive10(!active10)}}
                    style={{fontWeight: active10 ? 600 : 400}}
                    >Miscellaneous</h2>
                   <div className="misc">
                       {open_deac_misc && deac_inventory4.map( (item) =>
                               (
                                   <Button 
                                   onClick= { () => 
                                    {
                                        set_update_status(false);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}

                                   className='inventory_item-btn'  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                   {item[0]}</Button>
                               )
                           )
                       }
                   </div>
                   </ThemeProvider>
                                  
           </div>        
 
           <div className="inventory_activate-section">
               
                <h1>Inventory Items</h1>

                <div className="inventory-btn">
                   <ThemeProvider theme={theme}>
                   <h2 className='cat' onClick={()=>{
                    set_base(!open_base);
                    setActive1(!active1)}}
                    style={{fontWeight: active1 ? 600 : 400}}
                    >Base</h2>
                   <div  className="base" >
                      
                       {inventory0.map((item) =>
                             
                               (                                              
                                open_base &&  <Button
                                 onClick= { () => 
                                    {
                                        set_update_status(true);
                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}
                                 className="inventory_item-btn" 
                                 variant="contained"
                                  sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                  >
                                   {item[0]}</Button>
                                  
                               )                                 
                           )
                       }
                      
                   </div>
                <h2 className='cat' onClick={()=>{
                    set_pro(!open_pro)
                    setActive2(!active2)}}
                    style={{fontWeight: active2 ? 600 : 400}}
                    >Protein</h2>
                   <div className="protein">
                       
                       { inventory1.map( (item) =>
                               (    
                                open_pro &&  <Button 
                                onClick= { () => 
                                    {
                                        set_update_status(true);

                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}
                                className="inventory_item-btn" variant="contained" 
                                sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                >
                                   {item[0]}</Button>
                               )                                 
                           )
                       }
                   </div>

                    <h2 className='cat'  onClick={()=>{
                        set_top(!open_top);
                        setActive3(!active3)}}
                        style={{fontWeight: active3 ? 600 : 400}}
                        >Toppings</h2>

                   <div className="toppings">
                       { inventory2.map( (item) =>
                               (
                                open_top && <Button
                                onClick= { () => 
                                    {
                                        set_update_status(true);

                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}
                                className="inventory_item-btn"  
                                variant="contained"
                                 sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                 >
                                   {item[0]}</Button>
                               )
                           )
                       }
 
                   </div>

                   <h2 className='cat' onClick={()=>
                    {set_dress(!open_dress);
                    setActive4(!active4);
                    
                    }}
                    style={{fontWeight: active4 ? 600 : 400}}
                    >Dressing</h2>
                   <div className="dressing">
                       { inventory3.map( (item) =>
                               (
                                open_dress && <Button
                                onClick= { () => 
                                    {
                                        set_update_status(true);

                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}
                                className="inventory_item-btn" variant="contained" 
                                sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                
                                >
                                   {item[0]}</Button>
                               )
                           )
                       }
 
                   </div>

                   <h2 className='cat'onClick={()=>{
                    set_misc(!open_misc);    
                    setActive5(!active5);
                    }}
                    style={{fontWeight: active5 ? 600 : 400}}

                    >Miscellaneous</h2>
                   <div className="misc">
                       { inventory4.map( (item) =>
                               (
                                open_misc && <Button className="inventory_item-btn" 
                                variant="contained" 
                                sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                onClick= { () => 
                                    {
                                        set_update_status(true);

                                        inputName.current = item[0];
                                        sendValue(false); 
                                        handleClickOpen_update();

                                    }}>
                                   {item[0]}</Button>
                               )
                           )
                       }
                   </div>
                   </ThemeProvider>
 
               </div>
 
           </div>
       </ThemeProvider>
       </div>
     
   );
}
 
export default Inventory;

