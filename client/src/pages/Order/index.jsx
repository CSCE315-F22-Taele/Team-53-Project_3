import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import e from "cors";
// import { json } from "express";



const theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: indigo,
    },
});





const Order = () => {
    const [orderid, setOrderid] = useState(0);
    const [menuNamesCustom, setMenuNamesCustom] = useState([]);
    // const [menuPriceCustom, setMenuPriceCustom] = useState([]);
    // const [menuIdCustom, setMenuIdCustom] = useState([]);
    
    const [menuNames, setMenuNames] = useState([]);
    // const [menuPrice, setMenuPrice] = useState([]);
    // const [menuId, setMenuId] = useState([]);

    const [listOrdered, setListOrdered] = useState([]);
    const [showCustom, setIsShown] = useState(false);
    const name = "Pom and Honey at Texas A&M MSC";
    // const orderId = 
    
    // console.log(orderid);

    const handleClick = () => {
        setIsShown((current) => !current);
    }; 

    const orderIdVal = async () => {
        //e.preventDefault(); //prevent refresh
        /* Reference to make API calls */
        try {
            
            const response = await fetch("http://localhost:3500/api/order/getOrderid");
    
            const data = await response.json();
            setOrderid(data);
           
            
        } catch (err) {
    
            console.error(err.message);
        }

    };

    const menuGet = async () => {
        //event.preventDefault();
        /* Reference to make API calls */
        setMenuNames([]);
        setMenuNamesCustom([]);
        try {
    
            const response = await fetch("http://localhost:3500/api/order/getMenu");
            const jsonVals = await response.json();
            

            for( var key in jsonVals){
               
               
                if (jsonVals[key].is_selling == true){
                    if (jsonVals[key].is_customize == true){
                       var menuCustom = [];
                       menuCustom.push( jsonVals[key].menuitem);
                       menuCustom.push( jsonVals[key].cost);
                       menuCustom.push( jsonVals[key].id);
                      
                       var menuVals = menuNamesCustom;
                       console.log("vals: " + menuVals);
                       menuVals.push(menuCustom);
                       // menuVals.push(menuId);
                       // menuVals.push(menuPrice);
           
                       
                       setMenuNamesCustom(menuVals);

                    }

                    else{
                        var menu= [];
                         menu.push( jsonVals[key].menuitem);
                         menu.push( jsonVals[key].cost);
                         menu.push( jsonVals[key].id);
                        
                         var menuVals = menuNames;
                         menuVals.push(menu);
                         // menuVals.push(menuId);
                         // menuVals.push(menuPrice);
             
                         
                         setMenuNames(menuVals);
                    }
                }
            }
            
           
            var length = menuNames.length + menuNamesCustom.length;
            var value = [];
            for( let i =0; i< length; i++){
                value.push(0);
            }
            
            setListOrdered(value);
            

        } catch (err) {
            console.log("error");
            console.error(err.message);
        }

      
       
        
    };
    
    const inventoryGet = async () => {
        //event.preventDefault();
        /* Reference to make API calls */
        try {
    
            const response = await fetch("http://localhost:3500/api/order/getInventory");
            const jsonVals = await response.json();
            

            var inventoryCat0name = [];
            var inventoryCat0id = [];
            var inventoryCat1= [];
            var inventoryCat2 = [];

            
            for( var key in jsonVals){
                //console.log("entered");
                //for (var key1 in jsonVals){
                console.log(jsonVals[key])
                // if (jsonVals[key] == true){
                //     if (jsonVals[key].category == true){
                //     //    menuCustom.push( jsonVals[key].itemName);
                //     //    menuPriceCustom.push( jsonVals[key].cost);
                //     //    menuIdCustom.push( jsonVals[key].id);

                //     }

                //     else{
                //         //  menu.push( jsonVals[key].menuitem);
                //         //  menuPrice.push( jsonVals[key].cost);
                //         //  menuId.push( jsonVals[key].id);

                //     }
                // }
            }
        
            //console.log(jsonData[0]);
            //setMenuCustom(jsonData);

        } catch (err) {
            console.log("error");
            console.error(err.message);
        }
    };

    useEffect( () => {
        orderIdVal();
        menuGet();
        inventoryGet();
    }, [])

    const pushItemCustom = (index) => {
        
        let newCart = listOrdered;
        newCart[index] += 1;
        //1 or 10
        setListOrdered(newCart);
        setIsShown(showCustom => true);
        
    }

    const pushItem = (index) => {
        let newCart = listOrdered;
        newCart[index] += 1;
        setListOrdered(newCart);
        setIsShown(showCustom => true);
    }
    
    console.log(menuNamesCustom);
    console.log(listOrdered);
    const state=false;
    return (
        <div class="order__pageOrder">
        <div class="order__orderingSection">
            <h1 class="order__orderingTitle">  Ordering from Pom and Honey at Texas A&M MSC </h1>

            <h2> Item</h2>
            <ThemeProvider theme={theme}>
            <div class="order__buttons">
            { menuNamesCustom.map( (item) =>
            (
                <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { pushItemCustom(item[2])  }}>
                {item[0]}</Button>
            ) )}     

            { menuNames.map( (item) =>
            (
                <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { pushItem(item[2]) }}>
                {item[0]}</Button>
            ) )}     


            </div>




                    {showCustom && (
                        <div>
                            <h2> Base</h2>
                            <div class="buttons">
                                <Button variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        padding: 1,
                                        marginLeft: 2,
                                    }}
                                >
                                    Rice
                                </Button>
                            </div>

                            <h2> Protein</h2>
                            <div class="buttons">
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        padding: 1,
                                        marginLeft: 2,
                                    }}
                                >
                                    Chicken
                                </Button>
                            </div>

                            <h2> Toppings</h2>
                            <div class="buttons">
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        padding: 1,
                                        marginLeft: 2,
                                    }}
                                >
                                    Lettuce
                                </Button>
                            </div>

                            <h2> Dressing</h2>
                            <div class="buttons">
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        padding: 1,
                                        marginLeft: 2,
                                    }}
                                >
                                    Harissa
                                </Button>
                            </div>

                            <h2> Extras</h2>
                            <div class="buttons">
                                <Button
                                    variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 300,
                                        padding: 1,
                                        marginLeft: 2,
                                    }}
                                >
                                    Drinks
                                </Button>
                            </div>
                        </div>
                    )}
                </ThemeProvider>
            </div>{" "}
            {/*   To divide the section */}
            <div class="order__currentOrder">
                <h1> Current Order</h1>
            </div>
        </div>
    );
};

export default Order;

// const express = require("express");
// const app = express();
// const cors = require("cors");
// const pool = require("./db");

// app.use(cors());
// app.use(express.json());
// app.post('/todos', async(req, res) => {

//     try{
//         console.log(req.body);

//     }catch(err){
//         console.error(err.message)
//     }
// })