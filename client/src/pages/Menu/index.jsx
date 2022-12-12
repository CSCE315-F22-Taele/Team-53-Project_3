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
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { Hint } from 'react-autocomplete-hint';
import { Link } from 'react-router-dom';


// const conn = "http://localhost:3500/";
const conn = "https://pom-and-honey-bhf5.onrender.com/";

/**
 * This function will display the menu page.
 * @constructor
 */
function Menu() {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#283593",
            },
            secondary: indigo,
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

    /**
     * This function will alter the text when clicked on
     * @param  {string} item                   an item
     * @param  {Array<string>} itemName        inventory item list
     * @param  {createTheme} theme             theme (font/size)
     */
    function getStyles(item, itemName, theme) {
        return {
          fontWeight:
            itemName.indexOf(item) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
    }

    const [inventory, setInventory] = useState([]);
    const [inventory0, setInventory0] = useState([]);
    const [inventory1, setInventory1] = useState([]);
    const [inventory2, setInventory2] = useState([]);
    const [inventory3, setInventory3] = useState([]);
    const [inventory4, setInventory4] = useState([]);

    const [menu, setMenu] = useState([]);
    const [activate_menu, set_activateMenu] = useState([]);
    const [deactivate_menu, set_deactivateMenu] = useState([]);
    const [menuname, set_menuName] = useState([]);

    const [select_item, set_selectItem] = useState([]);
    const [select_item_base, set_selectItem_base] = useState([]);
    const [select_item_pro, set_selectItem_pro] = useState([]);
    const [select_item_top, set_selectItem_top] = useState([]);
    const [select_item_dress, set_selectItem_dress] = useState([]);
    const [select_item_misc, set_selectItem_misc] = useState([]);

    const [invItem, setItem] = useState([]);
    const [updateInv, set_updateInv] = useState([]);

    const [open_add, set_add] = useState(false);
    const [open_update, set_update] = useState(false);

    // ask name
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

    const [selling_status, set_selling_status] = useState('');
    const [customize_status, set_customize_status] = useState('');

    /**
     * This function will get the inventory entity used information for a menu item
     * @param  {Number} default_inventory               menu item id
     */
    const get_default_inventory = (default_inventory) => {
        let list = [];
        setItem([]);
        for(var key in inventory){
            if(default_inventory[key] === 1){
                invItem.push(inventory[key]);
            }
        }
        setItem(list);
    }

    function refreshPage() {
        window.location.reload(false);
    }

    /**
     * Find the indexes of the default inventory items
     * @param  {Array<string>} itemlist               inventory items array
     */
    function findIndex(itemlist){
        var list = updateInv;
        for(var key in inventory){
            var b = false;
            for(var i in itemlist){
                if(inventory[key] === itemlist[i]){
                    list.push(1);
                    b = true;
                    break;
                }
            }

            if(!b){
                list.push(0);
            }
        }
        return list;
    }

    /**
     * Update the default inventory used in menu item
     */
    const update_default_inventory = () => {

        var list  = [];
        if(select_item.length !== 0){
            list = findIndex(select_item);
        }

        set_updateInv(list);

    }

    /**
     * This function sets menu item to customizable
     * @param  {Number}  event               boolean value of is customizable
     * @return {Boolean}       set menu item to customizable
     */
    const handleChange_isCustomize = (event) => {
        if(event.target.value === 0){
            set_is_customize(true);
        } else {
            set_is_customize(false);
        }
        set_customize_status(event.target.value);
    };

    /**
     * This function sets menu item to deactivate or activate.
     * @param  {Number}  event               boolean value of is selling
     * @return {Boolean}       set whether menu item is being sold
     */
    const handleChange_isSelling = (event) => {
        if(event.target.value === 0){
            set_is_selling(true);
        } else {
            set_is_selling(false);
        }
        set_selling_status(event.target.value);
    };

    /**
     * This function alters the base inventory items of a menu item.
     * @param  {string} event               inventory item name
     */
    const handleChange_base = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem_base(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
    };

    /**
     * This function alters the protein inventory items of a menu item.
     * @param  {string} event               inventory item name
     */
    const handleChange_pro = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem_pro(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
    };

    /**
     * This function alters the topping inventory items of a menu item.
     * @param  {string} event               inventory item name
     */
    const handleChange_top = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem_top(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
    };

    /**
     * This function alters the dressing inventory items of a menu item.
     * @param  {string} event               inventory item name
     */
    const handleChange_dress = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem_dress(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
    };

    /**
     * This function alters the misc. inventory items of a menu item.
     * @param  {string} event               inventory item name
     */
    const handleChange_misc = (event) => {
        const {
          target: { value },
        } = event;
        set_selectItem_misc(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(', ') : value,
        );
    };

    /**
     * Get selected inventory items for default array
     */
    const getSelectItem = () => {
        let itemList = select_item;

            for(let key in select_item_base){
                itemList.push(select_item_base[key])
            }

            for(let key in select_item_pro){
                itemList.push(select_item_pro[key])
            }

            for(let key in select_item_top){
                itemList.push(select_item_top[key])
            }

            for(let key in select_item_dress){
                itemList.push(select_item_dress[key])
            }

            for(let key in select_item_misc){
                itemList.push(select_item_misc[key])
            }

            set_selectItem(itemList);
    }

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

    /**
     * Reset all values
     */
    const reset = () => {
        setItem([]);
        set_selectItem([]);
        set_selectItem_base([]);
        set_selectItem_pro([]);
        set_selectItem_top([]);
        set_selectItem_dress([]);
        set_selectItem_misc([]);
        set_updateInv([]);
        set_is_selling(false);
        set_is_customize(false);
    }

    /**
     * Check if menu item is to be displayed.
     * @param  {Boolean} c               check if valid menu item request
     */
    const sendValue = (c) => {
        set_nameDisplay("");
        set_costDisplay("");
        set_selectItem([]);
        set_is_selling(false);
        setId("");
        setItem([]);
        var check = false;

        if(c){
            if(inputName.current.value !== ""){
                let n = inputName.current.value;
                n = n.toLowerCase();

                for(let key in menu){
                    let menuName = menu[key][0];
                    menuName = menuName.toLowerCase();
                    if((menuName === n && !menu[key][3] && open_name_activate ) ||
                    (menuName === n && menu[key][3] && open_name_deactivate) || (menuName === n && open_name_update) ){

                        set_nameDisplay(menu[key][0]);
                        set_costDisplay(menu[key][1]);
                        get_default_inventory(menu[key][2]);
                        set_is_selling(menu[key][3]);
                        if(menu[key][3] === true){
                            set_selling_status(0);
                        } else {
                            set_selling_status(1);
                        }

                        set_is_customize(menu[key][4]);
                        if(menu[key][4] === true){
                            set_customize_status(0);
                        } else {
                            set_customize_status(1);
                        }
                        setId(menu[key][5]);
                        check = true;
                        break;
                    }
                }
            }
        } else {
            if(inputName.current !== ""){
                let n = inputName.current.toLowerCase();

                for(let key in menu){
                    let menuName = menu[key][0].toLowerCase();

                    if(menuName === n  ){
                        set_nameDisplay(menu[key][0]);
                        set_costDisplay(menu[key][1]);
                        get_default_inventory(menu[key][2]);
                        set_is_selling(menu[key][3]);
                        if(menu[key][3] === true){
                            set_selling_status(0);
                        } else {
                            set_selling_status(1);
                        }

                        set_is_customize(menu[key][4]);
                        if(menu[key][4] === true){
                            set_customize_status(0);
                        } else {
                            set_customize_status(1);
                        }
                        setId(menu[key][5]);
                        check = true;
                        break;
                    }
                }
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
            //alert("This item doesn't exist!");
            if(open_name_update){
                handleClickOpen_name_update();
                alert("This item doesn't exist!");
            } else if(open_name_deactivate){
                handleClickOpen_name_deactivate();
                alert("This item doesn't exist or is currently deactivated!");
            } else if(open_name_activate){
                handleClickOpen_name_activate()
                alert("This item doesn't exist or is currently activated!");
            }


        }

    }

    /**
     * Function to populate inventory separated by classification.
     */
    const getEachinv = async() => {
        let list_base = [];
        let list_pro = [];
        let list_top = [];
        let list_dress = [];
        let list_misc = [];
        for(var key in invItem){
            if((inventory0.indexOf(invItem[key]) !== -1)){
                list_base.push(invItem[key]);
            }
            if((inventory1.indexOf(invItem[key]) !== -1)){
                list_pro.push(invItem[key]);
            }
            if((inventory2.indexOf(invItem[key]) !== -1)){
                list_top.push(invItem[key]);
            }
            if((inventory3.indexOf(invItem[key]) !== -1)){
                list_dress.push(invItem[key]);
            }
            if((inventory4.indexOf(invItem[key]) !== -1)){
                list_misc.push(invItem[key]);
            }
        }
        set_selectItem_base(list_base);
        set_selectItem_pro(list_pro);
        set_selectItem_top(list_top);
        set_selectItem_dress(list_dress);
        set_selectItem_misc(list_misc);

    }

    /**
     * This function will retrieve all of the inventory to reference w/ default_inventory used in menu.
     * @return {Promise} All inventory table information
     */
    const getInventory = async ()  => {
        try {
            const response = await fetch(conn + "api/menu/getInventory");
            const data = await response.json();
            for(var key in data){
                let inv = inventory;
                let inventoryBase = inventory0;
                let inventoryProteins = inventory1;
                let inventoryToppings = inventory2;
                let inventoryDressings = inventory3;
                let inventoryMisc = inventory4;

                    if (data[key].classify === 0){
                        inventoryBase.push(data[key].itemname);

                        setInventory0(inventoryBase);
                    }
                    else if(data[key].classify === 1){
                        inventoryProteins.push(data[key].itemname);
                        setInventory1(inventoryProteins);
                    }
                    else if(data[key].classify === 2){
                        inventoryToppings.push(data[key].itemname);

                        setInventory2(inventoryToppings);
                    }
                    else if(data[key].classify === 3){
                        inventoryDressings.push(data[key].itemname);

                        setInventory3(inventoryDressings);
                    }
                    else if(data[key].classify === 4){
                        inventoryMisc.push(data[key].itemname);

                        setInventory4(inventoryMisc);
                    }

                inv.push(data[key].itemname) ;
                setInventory(inv);

            }
        }
        catch (err) {
            console.error(err.message);
        }
    }

    function find_di (menu, name) {
        var list = [];
        for(var key in menu){
            if(menu[key][0] === name){
                list = menu[key][2];
            }
        }
        return list;
    }

    /**
     * Function to get menu item information from menucost table.
     * @return {Promise} get menu item information.
     */
    const getMenu = async () => {
        try {
            const response = await fetch(conn + "api/menu/get");
            const data = await response.json();

            for(var key in data){
                let m = [];
                let d = [];
                let a = [];
                let n = menuname;

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
                n.push(data[key].menuitem);
                let m_Vals = menu;
                m_Vals.push(m);

                setMenu(m_Vals);
                set_menuName(n);
            }
        }
        catch (err) {
            console.error(err.message);
        }

    }

    /**
     * Function to update menu item in menucost table.
     * @param  {string}  _menuitem                        menu item name
     * @param  {Float}  _cost                             menu item cost
     * @param  {Boolean} _is_selling                      menu item deactivate/activated
     * @param  {Boolean} _is_customize                    menu item is customizable
     * @param  {Array}  _default_inventory                menu item array of used inventory
     * @param  {Number}  _id                              menu item pk
     */
    const updateMenu =(_menuitem, _cost, _is_selling, _is_customize, _default_inventory, _id) => {
        try {
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

    /**
     * Function will insert a new menu item into menu.
     * @param  {string}  _menuitem                       name of menu item
     * @param  {Float}  _cost                            cost of menu item
     * @param  {Boolean} _is_customize                   allow for customization
     * @param  {Array}  _default_inventory               inventory used for menu item
     */
    const insertMenu = (_menuitem, _cost, _is_customize, _default_inventory) => {
        try {
            var menuitem = _menuitem.toLowerCase();
            var cost = _cost;
            var is_selling = true; // Do not change
            var is_customize = _is_customize; // If no input, set to false
            var default_inventory = _default_inventory;

            if (String(menuitem.length) !== 0) {
                if (/^\d+\.\d{0,2}$/.test(cost)) {
                    if (default_inventory.length !== 0) {
                        handleClose_add();
                        const body = {menuitem, cost, is_selling, is_customize, default_inventory};
                        fetch (conn + "api/menu/insert",
                            {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify(body)
                            }
                        )
                        reset();
                        window.location.reload(false);
                    }
                    else {
                        alert("Invalid: Inventory cannot be empty. Please select inventory used for this menu item.");
                        getSelectItem();
                        update_default_inventory();
                    }
                }
                else {
                    alert ("Invalid cost. Please enter in X.XX format.");
                    getSelectItem();
                    update_default_inventory();
                }
            }
            else {
                alert("Invalid menu item name. Please retry.")
                getSelectItem();
                update_default_inventory();
            }

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect( () => {
        getInventory();
        getMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return(
        <div className="menu_page">

            <Dialog open={welcome_open} onClose={handleClose_welcome} >
                <DialogTitle fontSize={25}>Welcome to the Menu page.</DialogTitle>

                <DialogActions>
                    <Button style={{fontSize: '20px'}} onClick={() => {
                        handleClose_welcome();
                    }}>Start</Button>
                </DialogActions>
            </Dialog>
            <ThemeProvider theme={increaseSize}>
            <div className="menu_receipt-section">

                <Link to="/login">
                    <span className='menu_back-btn'>
                        <Button variant="contained" size="small"  className="menu_back-btn" >Back</Button>
                    </span>
                </Link>

                <span className='menu_edit-btn' >
                <Stack
                    direction="row"
                    spacing={5}
                >
                    <Button variant="contained" size="small"  className="menu_add-btn" onClick={handleClickOpen_add}>Add</Button>
                        <Dialog open={open_add} onClose={handleClose_add}>
                            <DialogTitle fontSize={25}>Add New Item</DialogTitle>
                            <DialogContent>
                            <TextField
                                    required
                                    margin="dense"
                                    id="outlined-required"

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

                                    helperText="Cost (eg. X.XX)"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    inputRef={cost_input}
                                />


                                <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Allow for customization?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange_isCustomize}
                                        >
                                        <MenuItem value={0}>Yes</MenuItem>
                                        <MenuItem value={1}>No</MenuItem>

                                    </Select>
                                </FormControl>

                                <br />
                                <br />
                                <InputLabel align="left">Default Inventory</InputLabel>

                                <FormControl sx={{ m: 1, width: 500 }}>
                                    <InputLabel id="demo-multiple-chip-label">Base</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item_base}
                                    onChange={handleChange_base}
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
                                    {inventory0.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item_base, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>


                                <FormControl sx={{ m: 1, width: 500 }}>
                                    <InputLabel id="demo-multiple-chip-label">Protein</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item_pro}
                                    onChange={handleChange_pro}
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
                                    {inventory1.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item_pro, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, width: 500 }}>
                                    <InputLabel id="demo-multiple-chip-label">Toppings</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item_top}
                                    onChange={handleChange_top}
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
                                    {inventory2.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item_top, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, width: 500 }}>
                                    <InputLabel id="demo-multiple-chip-label">Dressings</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item_dress}
                                    onChange={handleChange_dress}
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
                                    {inventory3.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item_dress, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                <FormControl sx={{ m: 1, width: 500 }}>
                                    <InputLabel id="demo-multiple-chip-label">Misc</InputLabel>
                                    <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={select_item_misc}
                                    onChange={handleChange_misc}
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
                                    {inventory4.map((item) => (
                                        <MenuItem
                                        key={item}
                                        value={item}
                                        style={getStyles(item, select_item_misc, theme)}
                                        >
                                        {item}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>

                                </DialogContent>

                                <DialogActions>

                                <Button style={{fontSize: '20px'}} onClick={() => {
                                    handleClose_add()
                                    reset();
                                    }}>Cancel</Button>
                                <Button style={{fontSize: '20px'}} onClick={() => {

                                    getSelectItem();
                                    update_default_inventory();
                                    insertMenu(name_input.current.value, cost_input.current.value, isCustomize, updateInv);

                                }}>Add</Button>
                                </DialogActions>
                        </Dialog>

                    <Button variant="contained" size="small" className="back1-btn" onClick={handleClickOpen_name_update}>Update</Button>

                            <Dialog open={open_name_update} onClose={handleClose_name_update}>
                            <DialogTitle fontSize={25}>What is the item's name?</DialogTitle>
                                <DialogContent>
                                <Hint options={menuname} allowTabFill>
                                    <input className='input'
                                        style={{ width: "500px" }}
                                        ref={inputName}
                                    />
                                </Hint>
                                </DialogContent>

                                <DialogActions>
                                    <Button style={{fontSize: '20px'}} onClick={handleClose_name_update}>Cancel</Button>
                                    <Button style={{fontSize: '20px'}} onClick={() => {
                                            handleClose_name_update();

                                            sendValue(true);
                                            getEachinv();

                                    }}>Search</Button>
                                </DialogActions>
                            </Dialog>


                        <Dialog open={open_update} onClose={handleClose_update}>
                            <DialogTitle fontSize={25}>Update</DialogTitle>

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

                           <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-chip-label">Is selling?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange_isSelling}
                                        value={selling_status}
                                        >
                                        <MenuItem value={0}>Yes</MenuItem>
                                        <MenuItem value={1}>No</MenuItem>

                                    </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 250 }}>
                                <InputLabel id="demo-multiple-chip-label">Allow for customization?</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        onChange={handleChange_isCustomize}
                                        value={customize_status}
                                        >
                                        <MenuItem value={0}>Yes</MenuItem>
                                        <MenuItem value={1}>No</MenuItem>

                                    </Select>
                                </FormControl>

                            <br />

                            <InputLabel align="left">Update Default Inventory</InputLabel>
                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Base</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={select_item_base}
                                onChange={handleChange_base}
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
                                {inventory0.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_base, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Protein</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={select_item_pro}
                                onChange={handleChange_pro}
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
                                {inventory1.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_pro, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Toppings</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={select_item_top}
                                onChange={handleChange_top}
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
                                {inventory2.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_top, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Dressings</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={select_item_dress}
                                onChange={handleChange_dress}
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
                                {inventory3.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_dress, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-multiple-chip-label">Misc</InputLabel>
                                <Select
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                multiple
                                value={select_item_misc}
                                onChange={handleChange_misc}
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
                                {inventory4.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_misc, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>



                                </DialogContent>

                                <DialogActions>
                                    <Button style={{fontSize: '20px'}} onClick={() => {
                                    handleClose_update()
                                    reset();

                                    }}>Cancel</Button>
                                <Button style={{fontSize: '20px'}} onClick={() => {
                                    handleClose_update();
                                    getSelectItem();
                                    update_default_inventory();
                                    updateMenu(name_input.current.value, cost_input.current.value, isSelling, isCustomize, updateInv,
                                        id);
                                    reset();
                                    window.location.reload(false);
                                }}>Update</Button>
                                </DialogActions>
                        </Dialog>

                    {/* Deactivate Btn */}
                    <ThemeProvider theme={deactivate_theme}>
                    <Button color="primary" variant="contained" size="small" className="back1-btn" onClick={handleClickOpen_name_deactivate} >Deactivate</Button>
                    </ThemeProvider>
                    <Dialog open={open_name_deactivate} onClose={handleClose_name_deactivate}>
                        <DialogTitle fontSize={25}>What is the item's name?</DialogTitle>
                        <DialogContent>
                            <Hint options={menuname} allowTabFill>

                            <input className='input'
                                style={{ width: "500px" }}
                                ref={inputName}
                            />
                            </Hint>
                        </DialogContent>

                        <DialogActions>
                            <Button style={{fontSize: '20px'}} onClick={handleClose_name_deactivate}>Cancel</Button>
                            <Button style={{fontSize: '20px'}} onClick={() => {
                                    sendValue(true);
                                    getEachinv();
                                    handleClose_update();

                            }}>Search</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                    PaperProps={{
                        style: {
                            backgroundColor: "#cf8f8f",
                        },}}  open={open_deactivate} onClose={handleClose_deactivate}>
                        <DialogTitle fontSize={25}>Do you want to deactivate?</DialogTitle>
                        <DialogContent>
                        <TextField
                                inputProps={{ readOnly: true }}
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
                                defaultValue={isCustomize}
                                helperText="is Customize?"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <FormControl sx={{ m: 1, width: 500 }}>
                            <InputLabel id="demo-simple-select-readonly-label">Base</InputLabel>

                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_base}
                                onChange={handleChange_base}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory0.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_base, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>

                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Protein</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_pro}
                                onChange={handleChange_pro}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory1.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_pro, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Toppings</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_top}
                                onChange={handleChange_top}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory2.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_top, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Dressings</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_dress}
                                onChange={handleChange_dress}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory3.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_dress, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Misc</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_misc}
                                onChange={handleChange_misc}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory4.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_misc, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>



                        </DialogContent>

                        <DialogActions>
                            <Button style={{fontSize: '20px'}} onClick={handleClose_deactivate}>Cancel</Button>
                            <Button style={{fontSize: '20px'}} onClick={() => {
                                    handleClose_deactivate();
                                    getSelectItem();
                                    update_default_inventory();
                                    var list = find_di(activate_menu, name_display);
                                    updateMenu(name_display, cost_display, false, isCustomize, list, id);
                                    window.location.reload(false);
                            }}>Deactivate</Button>

                        </DialogActions>
                    </Dialog>
                    {/* Activate Btn */}
                    <Button variant="contained" size="small"  className="back1-btn" onClick={handleClickOpen_name_activate} >Activate</Button>


                    <Dialog open={open_name_activate} onClose={handleClose_name_activate}>
                        <DialogTitle fontSize={25}>What is the item's name?</DialogTitle>
                        <DialogContent>
                            {/* <TextField
                                required
                                margin="dense"
                                id="outlined-required"
                                label="Item Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                inputRef={inputName}
                            />               */}
                            <Hint options={menuname} allowTabFill>

                            <input className='input'
                                style={{ width: "500px" }}
                                ref={inputName}
                            />
                            </Hint>
                        </DialogContent>

                        <DialogActions>
                            <Button style={{fontSize: '20px'}} onClick={handleClose_name_activate}>Cancel</Button>
                            <Button style={{fontSize: '20px'}} onClick={() => {
                                    sendValue(true);
                                    getEachinv();
                                    handleClose_update();
                            }}>Search</Button>
                        </DialogActions>
                    </Dialog>



                    <Dialog
                        fontSize={25}
                        PaperProps={{
                            style: {
                                backgroundColor: "#82cdad",
                            },}}  open={open_activate} onClose={handleClose_activate}>
                        <DialogTitle>Do you want to activate?</DialogTitle>
                        <DialogContent>
                        <TextField
                                inputProps={{ readOnly: true }}
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
                                defaultValue={isCustomize}
                                helperText="is Customize?"
                                type="text"
                                fullWidth
                                variant="standard"
                            />

                            <FormControl sx={{ m: 1, width: 500 }}>
                            <InputLabel id="demo-simple-select-readonly-label">Base</InputLabel>

                                <Select

                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_base}
                                onChange={handleChange_base}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory0.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_base, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>

                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Protein</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_pro}
                                onChange={handleChange_pro}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory1.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_pro, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Toppings</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_top}
                                onChange={handleChange_top}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory2.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_top, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Dressings</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_dress}
                                onChange={handleChange_dress}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory3.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_dress, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                            <FormControl sx={{ m: 1, width: 500 }}>
                                <InputLabel id="demo-simple-select-readonly-label">Misc</InputLabel>
                                <Select
                                labelId="demo-simple-select-readonly-label"
                                id="demo-simple-select-readonly"
                                value={select_item_misc}
                                onChange={handleChange_misc}
                                inputProps={{ readOnly: true }}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                                >
                                {inventory4.map((item) => (
                                    <MenuItem
                                    key={item}
                                    value={item}
                                    style={getStyles(item, select_item_misc, theme)}
                                    >
                                    {item}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>

                        </DialogContent>

                        <DialogActions>
                            <Button style={{fontSize: '20px'}} onClick={handleClose_activate}>Cancel</Button>
                            <Button style={{fontSize: '20px'}} onClick={() => {
                                    handleClose_activate();
                                    var list = find_di(deactivate_menu, name_display);
                                    updateMenu(name_display, cost_display, true, isCustomize, list, id);
                                    window.location.reload(false);
                            }}>Activate</Button>

                        </DialogActions>
                    </Dialog>
                </Stack>
                </span>
            </div>
            </ThemeProvider>

            <div className="menu_deactivate-section">
                <h1>Deactivated</h1>
                <p>These menu items are currently not selling.</p>
                <p></p>
                <ThemeProvider theme={theme}>

                { deactivate_menu.map((item) =>

                    (
                        <Button className="menu_item-btn" variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () =>
                            {
                                var check = false;
                                inputName.current = item[0];
                                sendValue(check);
                                getEachinv();
                                handleClickOpen_update();

                            }}>
                        {item[0]}</Button>

                    )
                    )
                }
                </ThemeProvider>

            </div>


            <div className="menu_activate-section">
                <h1>Activate</h1>
                <p>These menu items are currently being sold.</p>

                <div className="menu-btn">
                <ThemeProvider theme={theme}>

                    { activate_menu.map((item) =>

                                (
                                    <Button className="menu_item-btn" variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                                    onClick= { () =>
                                    {
                                        var check = false;
                                        inputName.current = item[0];
                                        sendValue(check);
                                        getEachinv();
                                        handleClickOpen_update();

                                    }}>
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
