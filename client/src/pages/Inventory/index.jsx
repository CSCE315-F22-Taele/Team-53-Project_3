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
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

function Inventory(){

    const theme = createTheme({
        palette: {
            primary: {
                main: "#283593",
            },
            secondary: indigo,
        },
    });

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


    const [inventory, setInventory] = useState([]); 

    const [name_display, set_nameDisplay] = useState('');
    const [amount_display, set_amountDisplay] = useState('');
    const [cost_display, set_costDisplay] = useState('');
    const [expirationdate_display, set_dateDisplay] = useState('');
    const [vendor_display, set_vendorDisplay] = useState('');
    const [id, setId] = useState('');
    const [classify_display, set_classifyDisplay] = useState('');


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
            // FIXME: Need to split into array to display. Reference Order page. 'data' contains all of inventory table.
            const data = await response.json();
            // setInventory0([]);
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
    
                        setInventory0(inventoryVals);  
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
    
                        setInventory1(inventoryVals);
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
    
                        setInventory2(inventoryVals);
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
    
                        setInventory3(inventoryVals);
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
    
                        setInventory4(inventoryVals);
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

                setInventory(inventoryVals);
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    // Will update current inventory item.
    const updateInventory =(_itemname, _amount, _cost, _expirationdate, _vendor,_classify, _id, _useChecking) => {
        try {
            // FIXME: Need to update w/ input before inserting.
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
            // FIXME: Need to update w/ input before inserting.
            var itemname = _itemname
            var amount = _amount;
            var cost = _cost;
            var expirationdate = _expirationdate
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
            
        } catch (err) {
            console.error(err.message);
        }
    }

    const sendValue = () => {
        set_nameDisplay("");
        set_amountDisplay("");
        set_costDisplay("");
        set_dateDisplay("");
        set_vendorDisplay("");
        set_classifyDisplay("");
        setId("");
        for(let key in inventory){
            if(inventory[key][0] === inputName.current.value){
                set_nameDisplay(inventory[key][0]);
                set_amountDisplay(inventory[key][1]);
                set_costDisplay(inventory[key][2]);
                set_dateDisplay(inventory[key][3]);
                set_vendorDisplay(inventory[key][4]);
                set_classifyDisplay(inventory[key][5]);
                setId(inventory[key][6]);
                break;
            } 
        }


        
    }

    const [welcome_open, set_welcome] = useState(true);
    const [open_add, set_add] = useState(false);
    const [open_update, set_update] = useState(false);
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

    const handleClose_add = () => {
        set_add(false);
    };
    const handleClose_update = () => {
        set_update(false);
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
    }

    const [classifications, setClass] = React.useState('');

    const handleChange_class = (event) => {
        set_classifyDisplay(event.target.value);
        setClass(event.target.value);
    };

    useEffect( () => {
        getInventory();
    }, [])

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        
        <div className="inventory_page">
                        <Dialog open={welcome_open} onClose={handleClose_welcome}>
                            <DialogTitle>Welcome to Inventory Page</DialogTitle>

                            <DialogActions>
                                <Button>Back</Button>
                                <Button onClick={() => {
                                    handleClose_welcome();
                                }}>Start</Button>
                            </DialogActions>                                
                        </Dialog>
            <div className='inventory_deactivate-section'>
                <h1> Deactivate</h1> 
                <ThemeProvider theme={theme}>
                    <div className="bass">
                        <h3>Base</h3>
                        
                        { deac_inventory0.map((item) =>
                               
                                (                                               
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                    
                                )                                  
                            )
                        }
                        
                    </div>

                    <div className="protein">
                        <h3>Protein</h3>
                        { deac_inventory1.map( (item) =>
                                (     
                                    <Button variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                )                                  
                            )
                        }
                    </div>

                    <div className="toppings">
                        <h3>Toppings</h3>
                        { deac_inventory2.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                ) 
                            )
                        }

                    </div>

                    <div className="dressing">
                        <h3>Dressing</h3>
                        { deac_inventory3.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                ) 
                            )
                        }

                    </div>

                    <div className="misc">
                        <h3>Miscellaneous</h3>
                        { deac_inventory4.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
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
                    <div className="bass">
                        <h3>Base</h3>
                        
                        { inventory0.map((item) =>
                               
                                (                                               
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                    
                                )                                  
                            )
                        }
                        
                    </div>

                    <div className="protein">
                        <h3>Protein</h3>
                        { inventory1.map( (item) =>
                                (     
                                    <Button variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                )                                  
                            )
                        }
                    </div>

                    <div className="toppings">
                        <h3>Toppings</h3>
                        { inventory2.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                ) 
                            )
                        }

                    </div>

                    <div className="dressing">
                        <h3>Dressing</h3>
                        { inventory3.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                ) 
                            )
                        }

                    </div>

                    <div className="misc">
                        <h3>Miscellaneous</h3>
                        { inventory4.map( (item) =>
                                (
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                                    {item[0]}</Button>
                                ) 
                            )
                        }
                    </div>
                    </ThemeProvider>


                </div>

            </div>

            <div className="inventory_receipt-section">
                <h1>Edit</h1>

                {/* Update, Deactivate, and Activate Btn */}
                <Stack 
                    direction="column"
                    spacing={5}
                    sx={{m:10}}
                >
                    {/* Update Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_update}>Update</Button>
                        <Dialog open={open_name_update} onClose={handleClose_name_update}>
                            <DialogTitle>Enter item name:</DialogTitle>
                            <DialogContent>
                                <TextField
                                    required
                                    margin="dense"
                                    id="outlined-required"
                                    label="Item name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    inputRef={inputName}
                                />              
                            </DialogContent>
        
                            <DialogActions>
                                {/* FIXME: ONCE BACKEND IS DONE */}
                                <Button onClick={handleClose_name_update}>Cancel</Button>
                                <Button onClick={() => {
                                    sendValue();
                                    handleClickOpen_update();
                                    handleClose_name_update();
                                }}>Search</Button>
                            </DialogActions>                                
                        </Dialog>
                        <Dialog open={open_update} onClose={handleClose_update}>
                        <DialogTitle>Update</DialogTitle>
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
                                helperText="Cost"
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
                                helperText="Expiration Date"
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
                            {/* FIXME: ONCE BACKEND IS DONE */}
                        <Button onClick={handleClose_update}>Cancel</Button>
                        <Button onClick={() => {
                            handleClose_update();
                            updateInventory(name_input.current.value, amount_input.current.value, 
                                cost_input.current.value, date_input.current.value, vendor_input.current.value, 
                                classify_input.current.value, id, true);
                                refreshPage();
                        }}>Update</Button>
                        </DialogActions>
                    </Dialog>  
                    {/* Deactivate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_deactivate} >Deactivate</Button>
                    <Dialog open={open_name_deactivate} onClose={handleClose_name_deactivate}>
                        <DialogTitle>Enter item name:</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                margin="dense"
                                id="outlined-required"
                                label="Item name"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputRef={inputName}
                            />              
                        </DialogContent>
            
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_name_deactivate}>Cancel</Button>
                            <Button onClick={() => {
                                sendValue();
                                handleClickOpen_deactivate();
                                handleClose_name_deactivate();
                            }}>Search</Button>
                        </DialogActions>
                    </Dialog>
 
                    <Dialog PaperProps={{       
                        style: {
                            backgroundColor: "#cf8f8f",
                        },}} 
                        open={open_deactivate}  onClose={handleClose_deactivate}>
                        <DialogTitle>Do you want to deactivate?</DialogTitle>
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
                            {/* FIXME */}
                            <Button onClick={handleClose_deactivate}>Cancel</Button>
                            <Button onClick={() => {
                                    updateInventory(name_display, amount_display, cost_display, expirationdate_display, vendor_display, 
                                        classify_display, id, false);
                                    handleClose_deactivate();
                                    refreshPage();
                            }}>Deactivate</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Activate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_activate} >Activate</Button>
                    <Dialog open={open_name_activate} onClose={handleClose_name_activate}>
                        <DialogTitle>Enter item name:</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                margin="dense"
                                id="outlined-required"
                                label="Item name"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputRef={inputName}
                            />              
                        </DialogContent>
    
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_name_activate}>Cancel</Button>
                            <Button onClick={() => {
                                    sendValue();
                                    handleClickOpen_activate();
                                    handleClose_name_activate();
                            }}>Search</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog
                    PaperProps={{       
                        style: {
                            backgroundColor: "#82cdad",
                        },}}  open={open_activate} onClose={handleClose_activate}>
                        <DialogTitle>Do you want to reactivate?</DialogTitle>
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
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_activate}>Cancel</Button>
                            <Button onClick={() => {
                                    updateInventory(name_display, amount_display, cost_display, expirationdate_display, vendor_display, 
                                        classify_display, id, true);
                                    handleClose_name_activate();
                                    handleClose_activate();
                                    refreshPage();
                            }}>Activate</Button>
                        </DialogActions>
                        
                    </Dialog>

                </Stack>
 
                <div className="inventory_footer">
                        <ThemeProvider theme={theme}>
                            <Stack
                                justifyContent= "space-around"
                                alignItems="center"
                                direction="row"
                                component="span"
                            >
                                <Button variant="contained" size="large" className="inventory_back-btn" >Back</Button>
                                <Button variant="contained" size="large" className="inventory_add-btn" 
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
                                        <DialogTitle>Add</DialogTitle>
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
                                                helperText="Cost"
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
                                                helperText="Expiration Date"
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
                                                {/* FIXME: ONCE BACKEND IS DONE */}
                                            <Button onClick={handleClose_add}>Cancel</Button>
                                            <Button onClick={() => {
                                                handleClose_add();
                            
                                                insertInventory(name_input.current.value, amount_input.current.value, 
                                                    cost_input.current.value, date_input.current.value, vendor_input.current.value, 
                                                    classify_input.current.value);
                                            }}>Add</Button>
                                            </DialogActions>
                                    </Dialog>                            
                            </Stack>
                        </ThemeProvider>
                    </div>               
            </div>

        </div>
    );
}

export default Inventory;