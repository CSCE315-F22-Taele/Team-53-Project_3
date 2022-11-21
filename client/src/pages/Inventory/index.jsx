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

// Deactivate is on line 790-795

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

                if(data[key].is_using === true){
                    if (data[key].classify === 0){
                        inventoryBase.push(data[key].itemname);
                        inventoryBase.push(data[key].amount);
                        inventoryBase.push(data[key].cost);
                        inventoryBase.push(data[key].expirationdate);
                        inventoryBase.push(data[key].vendor);
                        inventoryBase.push(data[key].classify);
                        inventoryBase.push(data[key].itemid);

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

                        let inventoryVals = inventory4;
                        inventoryVals.push(inventoryMisc);
    
                        setInventory4(inventoryVals);
                    }
                    
                  
                }
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    // Will update current inventory item.
    const updateInventory =(_itemname, _amount, _cost, _expirationdate, _vendor,_classify, _id, _useChecking) => {
        try {
            // FIXME: Need to update w/ input before inserting.
            var itemname = _itemname
            var amount = _amount;
            var cost = _cost;
            var expirationdate = _expirationdate
            var vendor = _vendor;
            var is_using = _useChecking;
            var classify = _classify;
            var itemid = _id;

            console.log(is_using);

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
        var check = false;
        for(let key in inventory0){
            if(inventory0[key][0] === inputName.current.value){
                set_nameDisplay(inventory0[key][0]);
                set_amountDisplay(inventory0[key][1]);
                set_costDisplay(inventory0[key][2]);
                set_dateDisplay(inventory0[key][3]);
                set_vendorDisplay(inventory0[key][4]);
                set_classifyDisplay(inventory0[key][5]);
                setId(inventory0[key][6]);
                check = true;
                break;
            } 
        }

        if(!check){
            for(let key in inventory1){
                if(inventory1[key][0] === inputName.current.value){
                    set_nameDisplay(inventory1[key][0]);
                    set_amountDisplay(inventory1[key][1]);
                    set_costDisplay(inventory1[key][2]);
                    set_dateDisplay(inventory1[key][3]);
                    set_vendorDisplay(inventory1[key][4]);
                    set_classifyDisplay(inventory1[key][5]);
                    setId(inventory1[key][6]);
                    check = true;
                    break;
                }   else {
                    console.log(inventory1[key][0]);
                }
            }
        }
        if(!check){
            for(let key in inventory2){
                if(inventory2[key][0] === inputName.current.value){
                    set_nameDisplay(inventory2[key][0]);
                    set_amountDisplay(inventory2[key][1]);
                    set_costDisplay(inventory2[key][2]);
                    set_dateDisplay(inventory2[key][3]);
                    set_vendorDisplay(inventory2[key][4]);
                    set_classifyDisplay(inventory2[key][5]);
                    setId(inventory2[key][6]);
                    check = true;
                    break;
                }
            }            
        }

        if(!check){
            for(let key in inventory3){
                if(inventory3[key][0] === inputName.current.value){
                    set_nameDisplay(inventory3[key][0]);
                    set_amountDisplay(inventory3[key][1]);
                    set_costDisplay(inventory3[key][2]);
                    set_dateDisplay(inventory3[key][3]);
                    set_vendorDisplay(inventory3[key][4]);
                    set_classifyDisplay(inventory3[key][5]);
                    setId(inventory3[key][6]);
                    check = true;
                    break;
                } 
            }            
        }

        if(!check){
            for(let key in inventory4){
                if(inventory4[key][0] === inputName.current.value){
                    set_nameDisplay(inventory4[key][0]);
                    set_amountDisplay(inventory4[key][1]);
                    set_costDisplay(inventory4[key][2]);
                    set_dateDisplay(inventory4[key][3]);
                    set_vendorDisplay(inventory4[key][4]);
                    set_classifyDisplay(inventory4[key][5]);
                    setId(inventory4[key][6]);
                    break;
                } 
            }            
        }

        
    }

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

    const [classifications, setClass] = React.useState('');

    const handleChange_class = (event) => {
      setClass(event.target.value);
    };

    useEffect( () => {
        getInventory();
    }, [])

    return(
        <div className="inventory_page=">
            <div className="inventory_item-section">
                <h1>Inventory Items</h1>

                {/* FIXME: HARDCODE */}
                <div className="inventory-btn">
                    <div className="bass">
                        <h3>Bass</h3>
                        { inventory0.map( (item) =>
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
                                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
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
                                                    <InputLabel name="demo-simple-select-label">Classifications</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    label="Classifications"
                                                    onChange={handleChange_class}
                                                    inputRef={classify_input}
                                                    >
                                                    <MenuItem value={0}>Bass</MenuItem>
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
        

            <div className="inventory_receipt-section">
                <h1>Edit</h1>
                {/* FIXME: HARDCODE */}
                <h2>item name</h2>

                {/* Update, Deactivate, and Activate Btn */}
                <Stack 
                    direction="column"
                    spacing={5}
                    sx={{m:10}}
                >
                    {/* Update Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_update}>Update</Button>
                        <Dialog open={open_name_update} onClose={handleClose_name_update}>
                            <DialogTitle>What is the item's name?</DialogTitle>
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
                                <InputLabel name="demo-simple-select-label">Classifications</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Classifications"
                                    onChange={handleChange_class}
                                    inputRef={classify_input}
                                    >
                                    <MenuItem value={0}>Bass</MenuItem>
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
                            console.log(id);
                            updateInventory(name_input.current.value, amount_input.current.value, 
                                cost_input.current.value, date_input.current.value, vendor_input.current.value, 
                                classify_input.current.value, id, true);
                        }}>Update</Button>
                        </DialogActions>
                    </Dialog>  
                    {/* Deactivate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_deactivate} >Deactivate</Button>
                    <Dialog open={open_name_deactivate} onClose={handleClose_name_deactivate}>
                        <DialogTitle>What is the item's name?</DialogTitle>
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
 
                    <Dialog open={open_deactivate} onClose={handleClose_deactivate}>
                        <DialogTitle>Do you want deactivate?</DialogTitle>
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
                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue={classify_display}
                                helperText="Classification"
                                type="text"
                                fullWidth
                                variant="standard"
                            />           
                        </DialogContent>
            
                        <DialogActions>
                            {/* FIXME */}
                            <Button onClick={handleClose_deactivate}>Cancel</Button>
                            <Button onClick={() => {
                                    var check = false; 

                                    updateInventory(name_display, amount_display, cost_display, vendor_display, 
                                        classify_display, id, check);
                                    handleClose_deactivate();
                            }}>Deactivate</Button>
                        </DialogActions>
                    </Dialog>

                    {/* Activate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_activate} >Activate</Button>
                    <Dialog open={open_name_activate} onClose={handleClose_name_activate}>
                        <DialogTitle>What is the item's name?</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                margin="dense"
                                id="outlined-required"
                                label="Item name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />              
                        </DialogContent>
    
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_name_activate}>Cancel</Button>
                            <Button onClick={() => {
                                    handleClickOpen_activate();
                                    handleClose_name_activate();
                            }}>Action</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={open_activate} onClose={handleClose_activate}>
                        <DialogTitle>Do you want activate?</DialogTitle>
                        <DialogContent>
                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Item name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Quantity"
                                type="text"
                                fullWidth
                                variant="standard"                           
                            />
                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Cost"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> 

                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Expiration Date"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Vendor"
                                type="text"
                                fullWidth
                                variant="standard"
                            />    
                            <TextField
                                inputProps={{ readOnly: true }}
                                margin="dense"
                                id="outlined-required"
                                defaultValue="Some Text"
                                helperText="Classification"
                                type="text"
                                fullWidth
                                variant="standard"
                            />          
                        </DialogContent>
            
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_activate}>Cancel</Button>
                            <Button onClick={() => {
                                    handleClose_name_activate();
                                    handleClose_activate();
                            }}>Activate</Button>
                        </DialogActions>
                        
                    </Dialog>
                </Stack>
            </div>
        </div>
    );
}

export default Inventory;