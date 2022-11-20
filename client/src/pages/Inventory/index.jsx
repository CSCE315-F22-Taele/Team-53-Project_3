import * as React from "react";
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

    // This will fetch entire inventory table. Need to parse through to determine specific information.
    const getInventory = async () => {
        try {
            const response = await fetch(conn + "api/inventory/get");
            // FIXME: Need to split into array to display. Reference Order page. 'data' contains all of inventory table.
            const data = await response.json();

        } catch (err) {
            console.error(err.message);
        }
    }

    // Will update current inventory item.
    const updateInventory = async () => {
        try {
            // FIXME: Need to update w/ input before inserting.
            var itemname = "";
            var amount = 0;
            var cost = 0;
            var expirationdate = "";
            var vendor = "";
            var is_using = true;
            var classify = 0;
            var itemid = 0;

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
    const insertInventory = async () => {
        try {
            // FIXME: Need to update w/ input before inserting.
            var itemname = "";
            var amount = 0;
            var cost = 0;
            var expirationdate = "";
            var vendor = "";
            var is_using = true; // Do not change
            var classify = 0;
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

    const [open_edit, set_edit] = useState(false);

    // ask name 
    const [open_name_edit, set_name_edit] = useState(false);
    const [open_name_deactivate, set_name_deactivate] = useState(false);
    const [open_name_activate, set_name_activate] = useState(false);

    const [open_deactivate, set_deactivate] = useState(false);
    const [open_activate, set_activate] = useState(false);

    const handleClickOpen_edit = () => {
        set_edit(true);
    };
    const handleClickOpen_name_edit = () => {
        set_name_edit(true);
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

    const handleClose_edit = () => {
        set_edit(false);
    };
    const handleClose_name_edit = () => {
        set_name_edit(false);
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

    return(
        <div className="inventory_page=">
            <div className="inventory_item-section">
                <h1>Inventory Items</h1>

                {/* FIXME: HARDCODE */}
                <div className="inventory-btn">
                    <div className="bass">
                        <h3>Bass</h3>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item1
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item2
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item3
                        </Button>                
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item4
                        </Button>
                    </div>

                    <div className="protein">
                        <h3>Protein</h3>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item1
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item2
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item3
                        </Button>                
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item4
                        </Button>
                    </div>

                    <div className="toppings">
                        <h3>Toppings</h3>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item1
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item2
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item3
                        </Button>                
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item4
                        </Button>
                    </div>

                    <div className="dressing">
                        <h3>Dressing</h3>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item1
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item2
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item3
                        </Button>                
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item4
                        </Button>
                    </div>

                    <div className="misc">
                        <h3>Miscellaneous</h3>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item1
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item2
                        </Button>
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item3
                        </Button>                
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                            Item4
                        </Button>
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
                                <Button variant="contained" size="large" className="inventory_add-btn" onClick={handleClickOpen_edit}>Add Item</Button>
                                    <Dialog open={open_edit} onClose={handleClose_edit}>
                                        <DialogTitle>Edit</DialogTitle>
                                        <DialogContent>
                                            <TextField
                                                required
                                                margin="dense"
                                                id="outlined-required"
                                                defaultValue="Some Text"
                                                helperText="Item Name"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                            />
                                            <TextField
                                                required
                                                margin="dense"
                                                id="outlined-required"
                                                defaultValue="Some Text"
                                                helperText="Quantity"
                                                type="text"
                                                fullWidth
                                                variant="standard"                           
                                            />
                                            <TextField
                                                required
                                                margin="dense"
                                                id="outlined-required"
                                                defaultValue="Some Text"
                                                helperText="Cost"
                                                type="text"
                                                fullWidth
                                                variant="standard"
                                            /> 

                                            <TextField
                                                required
                                                margin="dense"
                                                id="outlined-required"
                                                defaultValue="Some Text"
                                                helperText="Expiration Date"
                                                type="text"
                                                fullWidth

                                                variant="standard"
                                            />

                                            <TextField
                                                required
                                                margin="dense"
                                                id="outlined-required"
                                                defaultValue="Some Text"
                                                helperText="Vendor"
                                                type="text"
                                                fullWidth

                                                variant="standard"
                                            />

                                            <FormControl fullWidth>
                                                    <InputLabel name="demo-simple-select-label">Classifications</InputLabel>
                                                    <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={classifications}
                                                    label="Classifications"
                                                    onChange={handleChange_class}
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
                                            <Button onClick={handleClose_edit}>Cancel</Button>
                                            <Button onClick={handleClose_edit}>Save</Button>
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
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_name_edit}>Update</Button>
                        <Dialog open={open_name_edit} onClose={handleClose_name_edit}>
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
                                <Button onClick={handleClose_name_edit}>Cancel</Button>
                                <Button onClick={() => {
                                    handleClickOpen_edit();
                                    handleClose_name_edit();
                                }}>Save</Button>
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
                            />              
                        </DialogContent>
            
                        <DialogActions>
                            {/* FIXME: ONCE BACKEND IS DONE */}
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
                            <Button onClick={handleClose_deactivate}>Cancel</Button>
                            <Button onClick={() => {
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