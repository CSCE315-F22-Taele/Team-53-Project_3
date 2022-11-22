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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

function Menu(){

    const theme = createTheme({
        palette: {
            primary: {
                main: "#283593",
            },
            secondary: indigo,
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
    });

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    function getStyles(item, itemName, theme) {
        return {
          fontWeight:
            itemName.indexOf(item) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }

    function get_default_inventory(default_inventory){
        let inv = [];
        for(var key in inventory){
            if(default_inventory[key] === 1){
                inv.push(inventory[key]);
                console.log(inventory[key]);
                let iVals = item;
                iVals.push(inv);

                setItem(iVals);
            }
        }

        return{inv};
    }

    function refreshPage() {
        window.location.reload(false);
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
      };

    const [inventory, setInventory] = useState([]);

    const [menu, setMenu] = useState([]);
    const [activate_menu, set_activateMenu] = useState([]);
    const [deactivate_menu, set_deactivateMenu] = useState([]);

    const [select_item, set_selectItem] = useState([]);
    const [item, setItem] = useState([]);

    const [open_add, set_add] = useState(false);
    const [open_update, set_update] = useState(false);

    // ask name
    const [open_name_add, set_name_add] = useState(false);
    const [open_name_update, set_name_update] = useState(false);
    const [open_name_deactivate, set_name_deactivate] = useState(false);
    const [open_name_activate, set_name_activate] = useState(false);

    const [open_deactivate, set_deactivate] = useState(false);
    const [open_activate, set_activate] = useState(false);

    const [welcome_open, set_welcome] = useState(true);
    const [isSelling, set_is_selling] = useState(false);
    const [isCustomize, set_is_customize] = useState(false);

    const [name_display, set_nameDisplay] = useState('');
    const [cost_display, set_costDisplay] = useState('');
    const [id, setId] = useState('');

    const inputName = useRef('');

    const name_input = useRef('');
    const cost_input = useRef('');



    const handleClickOpen_add = () => {
        set_add(true);
    };
    const handleClickOpen_update = () => {
        set_update(true);
    };
    const handleClickOpen_name_add = () => {
        set_name_add(true);
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
    const handleClose_name_add = () => {
        set_name_add(false);
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

    const handleChange_selling = () => {
        set_is_selling(true);
    };

    const handleChange_customize = () => {
        set_is_customize(true);
    };

    const reset = () => {
        select_item([]);
        set_is_selling(false);
        set_is_customize(false);
    }

    const sendValue = () => {
        set_nameDisplay("");
        set_costDisplay("");
        setItem([]);
        setId("");
        for(let key in inventory){
            if(menu[key][0] === inputName.current.value){
                set_nameDisplay(menu[key][0]);
                set_costDisplay(menu[key][1]);
                setItem(get_default_inventory(menu[key][2]));
                set_is_selling(menu[key][3]);
                set_is_customize(menu[key][4]);
                setId(menu[key][5]);
                break;
            } 
        }

        
    }


    
    // This function will retrieve all of the inventory to reference w/ default_inventory used in menu.
    const getInventory = async () => {
        try {
            const response = await fetch(conn + "api/menu/getInventory");
            // FIXME: Need to split into array to display. Reference Order page. 'data' contains inventory itemnames and classification.
            const data = await response.json();
            for(var key in data){
                let inv = [];
                inv.push(data[key].itemname);
                let inventoryVals = inventory;
                inventoryVals.push(inv);

                setInventory(inventoryVals);
            }
        }
        catch (err) {
            console.error(err.message);
        }
    }

    const getMenu = async () => {
        try {
            const response = await fetch(conn + "api/menu/get");
            // FIXME: Need to split into array to display. Reference Order page. 'data' contains all attributes of menu table (menuitem, cost, id, is_selling, is_customize, default_inventory).
            const data = await response.json();

            for(var key in data){
                let m = [];
                let d = [];
                let a = [];

                if(data[key].is_selling){
                    a.push(data[key].menuitem);
                    a.push(data[key].cost);
                    a.push(data[key].default_inventory);
                    let a_Vals = activate_menu;
                    a_Vals.push(a);
    
                    set_activateMenu(a_Vals);
                } else {
                    d.push(data[key].menuitem);
                    d.push(data[key].cost);
                    d.push(data[key].default_inventory);
                    let d_Vals = deactivate_menu;
                    d_Vals.push(d);
    
                    set_deactivateMenu(d_Vals);
                }
                m.push(data[key].menuitem);
                m.push(data[key].cost);
                m.push(data[key].default_inventory);
                m.push(data[key].is_selling);
                m.push(data[key].is_customize);
                m.push(data[key].id);

                let m_Vals = menu;
                m_Vals.push(m);

                setMenu(m_Vals);
            }
        }
        catch (err) {
            console.error(err.message);
        }

    }

    // Will update current menu item.
    const updateMenu =(_menuitem, _cost, _is_selling, _is_customize, _default_inventory, _id) => {
        try {
            // FIXME: Need to update w/ input before updating.
            var menuitem = _menuitem;
            var cost = _cost;
            var is_selling = _is_selling;
            var is_customize = _is_customize;
            var default_inventory = _default_inventory;
            var id = _id;

            const body = {menuitem, cost, is_selling, is_customize, default_inventory, id};
            fetch (conn + "api/menu/update",
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
    
    // Will insert a new menu item into menu.
    const insertMenu = (_menuitem, _cost, _is_customize, _default_inventory) => {
        try {
            // FIXME: Need to update w/ input before inserting.
            var menuitem = _menuitem;
            var cost = _cost;
            var is_selling = true; // Do not change
            var is_customize = _is_customize;
            var default_inventory = _default_inventory;

            const body = {menuitem, cost, is_selling, is_customize, default_inventory};

            fetch (conn + "api/menu/insert",
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

    useEffect( () => {
        getInventory();
        getMenu();
    }, [])

    return(
        <div className="menu_page">
            <Dialog open={welcome_open} onClose={handleClose_welcome}>
                <DialogTitle>Welcome to Menu Page</DialogTitle>

                <DialogActions>
                    <Button>Back</Button>
                    <Button onClick={() => {
                        handleClose_welcome();
                    }}>Start</Button>
                </DialogActions>                                
            </Dialog>

            <div className="menu_receipt-section">


                <span className='menu_back-btn'>
                    <Button variant="contained" size="small"  className="menu_back-btn" >Back</Button>                  
                </span>

                <span className='menu_edit-btn' >
                <Stack 
                    direction="row"
                    spacing={5}
                >
                    <Button variant="contained" size="small"  className="menu_add-btn" onClick={handleClickOpen_add}>Add Item</Button>
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
                                    defaultValue={cost_display}
                                    helperText="Cost"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    inputRef={cost_input}
                                /> 
                                <FormGroup row="true" sx={{ ml: 10, width: 300 }}>

                                    <FormControlLabel control={<Checkbox  
                                    onClick={handleChange_selling}
                                    />} label="selling" />
                                    <FormControlLabel control={<Checkbox  
                                    onClick={handleChange_customize}
                                    />} label="customize" />

                                </FormGroup>                                
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-chip-label">Default Inventory</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {inventory.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                </DialogContent>
        
                                <DialogActions>
                                    {/* FIXME: ONCE BACKEND IS DONE */}
                                <Button onClick={handleClose_add}>Cancel</Button>
                                <Button onClick={() => {
                                    handleClose_add();
                                    insertMenu(name_input.current.value, cost_input.current.value, isCustomize, select_item, id);
                                    reset();
                                    refreshPage();
                                }}>Add</Button>
                                </DialogActions>
                        </Dialog>  
                    
                    <Button variant="contained" size="small" className="back1-btn" onClick={handleClickOpen_name_update}>Update</Button>
                        
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
                                            handleClickOpen_update();
                                            handleClose_name_update();
                                            sendValue();
                                    }}>Search</Button>
                                </DialogActions>                                
                            </Dialog>
                    {item.map((item_name, index) => (
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
                                defaultValue={item_name}
                                helperText="Current Default Inventory"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputRef={cost_input}
                            /> 

                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-chip-label">Update Inventory</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                    >
                                    {inventory.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                </DialogContent>
        
                                <DialogActions>
                                    {/* FIXME: ONCE BACKEND IS DONE */}
                                <Button onClick={handleClose_update}>Cancel</Button>
                                <Button onClick={() => {
                                    handleClose_update();
                                    updateMenu(name_input.current.value, cost_input.current.value, isSelling, isCustomize, select_item, 
                                        id);
                                    reset();
                                    refreshPage();
                                }}>Update</Button>
                                </DialogActions>
                        </Dialog>  
                    ))}

                    {/* Deactivate Btn */}
                    <ThemeProvider theme={deactivate_theme}>
                    <Button color="primary" variant="contained" size="small" className="back1-btn" onClick={handleClickOpen_name_deactivate} >Deactivate</Button>
                    </ThemeProvider>
                    <Dialog open={open_name_deactivate} onClose={handleClose_name_deactivate}>
                        <DialogTitle>What is the item's name?</DialogTitle>
                        <DialogContent>
                            <TextField
                                required
                                margin="dense"
                                id="outlined-required"
                                label="Item Name"
                                type="text"
                                fullWidth
                                variant="standard"
                            />              
                        </DialogContent>
    
                        <DialogActions>
                            <Button onClick={handleClose_name_deactivate}>Cancel</Button>
                            <Button onClick={() => {
                                    handleClickOpen_deactivate();
                                    handleClose_name_deactivate();
                            }}>Deactivate</Button>
                        </DialogActions>
                    </Dialog>

                    <Dialog open={open_deactivate} onClose={handleClose_deactivate}>
                        <DialogTitle>Do you want deactivate?</DialogTitle>
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
    
                        </DialogContent>
    
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
                            <Button onClick={handleClose_deactivate}>Cancel</Button>
                            <Button onClick={() => {
                                    handleClose_deactivate();
                                    updateMenu(name_display, cost_display, false, isCustomize, item, id);
                                    refreshPage();
                            }}>Deactivate</Button>
                            
                        </DialogActions>
                    </Dialog>

                    {/* Activate Btn */}
                    <Button variant="contained" size="small"  className="back1-btn" onClick={handleClickOpen_name_activate} >Activate</Button>
                    <Dialog open={open_name_activate} onClose={handleClose_name_activate}>
                                <DialogTitle>What is the item's name?</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        required
                                        margin="dense"
                                        id="outlined-required"
                                        label="Item Name"
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
           
                                </DialogContent>
            
                                <DialogActions>
                                    {/* FIXME: ONCE BACKEND IS DONE */}
                                    <Button onClick={handleClose_activate}>Cancel</Button>
                                    <Button onClick={() => {
                                            handleClose_name_activate();
                                            handleClose_activate();
                                            updateMenu(name_display, cost_display, true, isCustomize, item, id);
                                            refreshPage();
                                    }}>Activate</Button>
                                </DialogActions>
                    </Dialog>
                </Stack>
                </span>
            </div>


            <div className="menu_deactivate-section">
                <h1>Deactivate</h1>
                <ThemeProvider theme={theme}>

                { deactivate_menu.map((item) =>
                    
                    (                                               
                        <Button className="menu_item-btn" variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        >
                        {item[0]}</Button>
                        
                    )                                  
                    )
                }
                </ThemeProvider>

            </div>


            <div className="menu_activate-section">
                <h1>Activate</h1>

                <div className="menu-btn">
                <ThemeProvider theme={theme}>

                    { activate_menu.map((item) =>
                                
                                (                                               
                                    <Button className="menu_item-btn" variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                    >
                                    {item[0]}</Button>
                                    
                                )                                  
                            )
                    }
                </ThemeProvider>

                </div>

            </div>
        


        </div>
    );
}

export default Menu;
