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
    const [menuNames, setMenuNames] = useState([]);
    
    const [realInventory0, setInventory0] = useState([]);
    const [realInventory1, setInventory1] = useState([]);
    const [realInventory2, setInventory2] = useState([]);
    const [realInventory3, setInventory3] = useState([]);
    const [realInventory4, setInventory4] = useState([]);

    const [listOrdered, setListOrdered] = useState([]);
    const [listOrderedNames, setListOrderedNames] = useState([]);
    const [listOrderedInv, setlistOrderedInv] = useState([]);
    const [inventoryUsed, setInventoryUsed]= useState([]);
    const [showCustom, setIsShown] = useState(false);
    const [totalCost, setCost] = useState(0);
    const [count, setCount] = useState(0);
    const name = "Pom and Honey at Texas A&M MSC";
   

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
               
            
               // (jsonVals[key]);
                if (jsonVals[key].is_selling == true){
                    if (jsonVals[key].is_customize == true){
                       var menuCustom = [];
                       menuCustom.push( jsonVals[key].menuitem);
                       menuCustom.push( jsonVals[key].cost);
                       menuCustom.push( jsonVals[key].id);
                      
                       var menuVals = menuNamesCustom;
                       menuVals.push(menuCustom);
                     
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
            
           
            var length = menuNames.length + menuNamesCustom.length + 1;
            var value = [];
            for( let i =0; i< length; i++){
                value.push(0);
            }
            
            setListOrdered(value);
            
            
        } catch (err) {
            console.error(err.message);
        }

      
       
        
    };
    
    const inventoryGet = async () => {
        //event.preventDefault();
        /* Reference to make API calls */
        
        try {
    
            const response = await fetch("http://localhost:3500/api/order/getInventory");
            const jsonVals = await response.json();

            
            for( var key in jsonVals){
                
                var inventoryCat0 = [];
                var inventoryCat1 = [];
                var inventoryCat2 = [];
                var inventoryCat3 = [];
                var inventoryCat4 = [];

                

                // if (jsonVals[key] == true){
                if (jsonVals[key].classify == 0){
                    inventoryCat0.push(jsonVals[key].itemname);
                    inventoryCat0.push(jsonVals[key].itemid);
                    

                    var inventory0 = realInventory0;
                    inventory0.push(inventoryCat0);
                  
                    setInventory0(inventory0);
                }
                else if (jsonVals[key].classify == 1){
                    inventoryCat1.push(jsonVals[key].itemname);
                    inventoryCat1.push(jsonVals[key].itemid);

                    var inventory = realInventory1;
                    inventory.push(inventoryCat1);
                  
                    setInventory1(inventory);
                }
                else if (jsonVals[key].classify == 2){
                    inventoryCat2.push(jsonVals[key].itemname);
                    inventoryCat2.push(jsonVals[key].itemid);

                    var inventory = realInventory2;
                    inventory.push(inventoryCat2);
                  
                    setInventory2(inventory);
                }
                else if (jsonVals[key].classify == 3){
                    inventoryCat3.push(jsonVals[key].itemname);
                    inventoryCat3.push(jsonVals[key].itemid);

                    var inventory = realInventory3;
                    inventory.push(inventoryCat3);
                  
                    setInventory3(inventory);
                }
                else if (jsonVals[key].classify == 4){
                    inventoryCat4.push(jsonVals[key].itemname);
                    inventoryCat4.push(jsonVals[key].itemid);

                    var inventory = realInventory4;
                    inventory.push(inventoryCat4);
                  
                    setInventory4(inventory);
                }
                
               

            
            }
            var length = realInventory0.length + realInventory1.length +  realInventory2.length + realInventory3.length + realInventory4.length +2; 
            var value = [];
            
            for( let i =0; i< length; i++){
                value.push(0);
            }
            
            setInventoryUsed(value);
            
            //console.log(jsonData[0]);
            //setMenuCustom(jsonData);
            console.log("fetched inventory");
        } catch (err) {
            // console.log("error");
            console.error(err.message);
        }
    };

    const sendtoDb = async () => {
        console.log("FIX ME");
        try {
            var date=new Date();
            var current = date.getHours() + ':';

            if (date.getMinutes() < 10) {
                current += "0" + date.getMinutes();
            }
            else {
                current += date.getMinutes();
            }
            
            current += ':' + date.getSeconds() + "." + date.getMilliseconds();

            const body = {orderid, current, totalCost, listOrdered, inventoryUsed};
            const response = fetch ("http://localhost:3500/api/order/postOrder", 
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect( () => {
        orderIdVal();
        menuGet();
        inventoryGet();
    }, [])

    const pushItem = (index, val, cost, custom) => {
        
        setlistOrderedInv([]);

        let newCart = listOrdered;
        newCart[index] += 1;
        setListOrdered(newCart);
        // console.log(newCart);

        if( custom === true){
            setIsShown(showCustom => true);
        }
       
        let namesCart = listOrderedNames;
        namesCart.push([val, '$' + cost]);
        setListOrderedNames(namesCart);
        // console.log(listOrderedNames);

        
        let costCurr = totalCost;
        costCurr += parseFloat(cost);
        setCost(costCurr);


    }


    const pushInv = (index, val) => {
        let inv = inventoryUsed;
        
        inv[index] += 1;
        setInventoryUsed(inv);
        
        
        let namesCart = listOrderedInv;
        namesCart.push(val);
        setlistOrderedInv(namesCart);

        let countVal = count;
        countVal  +=1;
        setCount(countVal);
        
    }
    
    const addItem = () => {
        setIsShown(showCustom => false);

        // console.log(listOrderedNames);
    }


    return (
        <div class="order__pageOrder">
        <div class="order__orderingSection">
            <br></br>

            <h1 class="order__orderingTitle">  Ordering from Pom and Honey at Texas A&M MSC </h1>
            <br></br>
            <br></br>
            <br></br>
            <h2> Item</h2>
            <ThemeProvider theme={theme}>
            <div class="order__buttons">
            { menuNamesCustom.map( (item) =>
            (
                <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { pushItem(item[2], item[0], item[1], true)  }}>
                {item[0]}</Button>
            ) )}     
            { menuNames.map( (item) =>
            (
                <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { pushItem(item[2], item[0], item[1], false) }}>
                {item[0]}</Button>
            ) )}     
            

            
            

            </div>

            {showCustom && (
                <div>
                
                 <h2> Base</h2>
                <div class="buttons base">
                    { realInventory0.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0])  }}>
                        {item[0]}</Button>
                    ) )}     
                </div>

                <h2> Protein</h2>
                <div class="buttons protein">
                    { realInventory1.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0])  }}>
                        {item[0]}</Button>
                    ) )}                                  
                </div>

                <h2> Toppings</h2>
                <div class="buttons toppings">
                    { realInventory2.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0])  }}>
                        {item[0]}</Button>
                    ) )}                 
                </div>

                <h2> Dressing</h2>
                <div class="buttons">
                    { realInventory3.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0])  }}>
                        {item[0]}</Button>
                    )  )}
                </div>

                            
             </div>
            )}

            
            </ThemeProvider>
            <div class="addItems">


                <Button variant="contained" sx={{ width:150, height:50, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { addItem() } } >
                Add more items</Button> 

                        
           
            </div>

            
            </div>

           
            <div class="order__currentOrder">
                <h1> Current Order</h1>
                
                { listOrderedNames.map( (item) =>
                    <p> {item[0]} {item[1]}</p>
                )}   

            <br></br>
            <br></br>
            <br></br>
            <div>
                <h5>Added Items to Gyro/Bowl:</h5>
                { listOrderedInv.map( (item) =>
                    <p> {item}</p>
                )}   

            <br></br>
            <br></br>
            <br></br>
            </div>

                <h1> Cost: ${totalCost} </h1>

                <Button  variant="contained" size="large" onClick= { () => {sendtoDb()}}>Submit Order</Button>
            </div>

            {/* add a submit order button */}
            {/* add a ADD more items button */}
            {/* add a include this order*/}

        </div>
    );
};

export default Order;

