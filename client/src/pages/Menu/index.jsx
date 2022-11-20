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




function Menu(){

    const theme = createTheme({
        palette: {
            primary: {
                main: "#283593",
            },
            secondary: indigo,
        },
    });

    const [open_edit, set_edit] = React.useState(false);

    // ask name
    const [open_name_edit, set_name_edit] = React.useState(false);
    const [open_name_deactivate, set_name_deactivate] = React.useState(false);
    const [open_name_activate, set_name_activate] = React.useState(false);

    const [open_deactivate, set_deactivate] = React.useState(false);
    const [open_activate, set_activate] = React.useState(false);

    const handleClickOpen_edit = () => {
        set_edit(true);
    };
    const handleClickOpen_id_edit = () => {
        set_name_edit(true);
    };
    const handleClickOpen_id_deactivate = () => {
        set_name_deactivate(true);
    };
    const handleClickOpen_id_activate = () => {
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
    const handleClose_id_edit = () => {
        set_name_edit(false);
    };
    const handleClose_id_deactivate = () => {
        set_name_deactivate(false);
    };
    const handleClose_id_activate = () => {
        set_name_activate(false);
    };

    const handleClose_deactivate = () => {
        set_deactivate(false);
    };
    const handleClose_activate = () => {
        set_activate(false);
    };


    return(
        <div className="menu_page">
            <div className="menu_item-section">
                <h1>Menu Items</h1>

                {/* FIXME: HARDCODE */}
                <div className="menu-btn">
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

                {/* Back and Add btn */}
                <div className="menu_footer">
                        <ThemeProvider theme={theme}>
                            <Stack
                                justifyContent= "space-around"
                                alignItems="center"
                                direction="row"
                                component="span"
                            >
                                <Button variant="contained" size="large" className="menu_back-btn" >Back</Button>
                                <Button variant="contained" size="large" className="menu_add-btn" onClick={handleClickOpen_edit}>Add Item</Button>
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
        

            <div className="menu_receipt-section">
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
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_id_edit}>Update</Button>
                            <Dialog open={open_name_edit} onClose={handleClose_id_edit}>
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
                                    <Button onClick={handleClose_id_edit}>Cancel</Button>
                                    <Button onClick={() => {
                                            handleClickOpen_edit();
                                            handleClose_id_edit();
                                    }}>Save</Button>
                                </DialogActions>                                
                            </Dialog>
                    
                    {/* Deactivate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_id_deactivate} >Deactivate</Button>
                    <Dialog open={open_name_deactivate} onClose={handleClose_id_deactivate}>
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
                                    <Button onClick={handleClose_id_deactivate}>Cancel</Button>
                                    <Button onClick={() => {
                                            handleClickOpen_deactivate();
                                            handleClose_id_deactivate();
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
                                    }}>Deactivate</Button>
                                </DialogActions>
                    </Dialog>

                    {/* Activate Btn */}
                    <Button variant="contained" size="large" className="back1-btn" onClick={handleClickOpen_id_activate} >Activate</Button>
                    <Dialog open={open_name_activate} onClose={handleClose_id_activate}>
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
                                    <Button onClick={handleClose_id_activate}>Cancel</Button>
                                    <Button onClick={() => {
                                            handleClickOpen_activate();
                                            handleClose_id_activate();
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
                                            handleClose_id_activate();
                                            handleClose_activate();
                                    }}>Activate</Button>
                                </DialogActions>
                    </Dialog>
                </Stack>
            </div>
        </div>
    );
}

export default Menu;