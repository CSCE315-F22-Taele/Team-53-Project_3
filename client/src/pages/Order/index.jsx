import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo, white } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import e from "cors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';
// import { json } from "express";

// For local testing: (comment out)
const conn = "http://localhost:3500/";
// For production:
// const conn = "https://pom-and-honey-bhf5.onrender.com/";
const theme = createTheme({
    palette: {
        primary: {
            main: '#283593',
        },
        secondary: indigo,
    },
});



function rounding(number, precision){
    var newnumber = new Number(number+'').toFixed(parseInt(precision));
    return parseFloat(newnumber); 
}

// const = () => {
function Order () {
    const [orderid, setOrderid] = useState(0);
    const [menuNamesCustom, setMenuNamesCustom] = useState([]);
    const [menuNames, setMenuNames] = useState([]);
    
    const [realInventory0, setInventory0] = useState([]);
    const [realInventory1, setInventory1] = useState([]);
    const [realInventory2, setInventory2] = useState([]);
    const [realInventory3, setInventory3] = useState([]);
    const [realInventory4, setInventory4] = useState([]);


    const [listOrdered, setListOrdered] = useState([]); //push to db
    const [listOrderedNames, setListOrderedNames] = useState([]);
    
    const [listOrderedInv, setlistOrderedInv] = useState([]);  
    const [inventoryUsed, setInventoryUsed]= useState([]); //global amount of inventory used (push to db)
    const [showCustom, setIsShown] = useState(false); 
    const [totalCost, setCost] = useState(0);
    const [count, setCount] = useState(0);

    const [ cat0click, setAllowClickCat0] = useState(true);
    const [ cat1click, setAllowClickCat1] = useState(true);
    const [ cat2click, setAllowClickCat2] = useState(true);
    const [ cat3click, setAllowClickCat3] = useState(true);
    const [countToppings, setCountToppings] = useState(0);
    

    const name = "Pom and Honey at Texas A&M MSC";
   

    const handleClick = () => {
        setIsShown((current) => !current);
    }; 

    const orderIdVal = async () => {
        
        try {
            const response = await fetch(conn + "api/order/getOrderid");
    
            const data = await response.json();
            setOrderid(data);
           
            
        } catch (err) {
    
            console.error(err.message);
        }

    };

    const menuGet = async () => {

        setMenuNames([]);
        setMenuNamesCustom([]);
        try {
    
            const response = await fetch(conn + "api/order/getMenu");
            const jsonVals = await response.json();
            
            for( var key in jsonVals) { 
                 
                if (jsonVals[key].is_selling == true){
                    if (jsonVals[key].is_customize == true){
                       var menuCustom = [];
                       menuCustom.push( jsonVals[key].menuitem);
                       menuCustom.push( jsonVals[key].cost);
                       menuCustom.push( jsonVals[key].id);
                       menuCustom.push( jsonVals[key].default_inventory);
                       var menuVals = menuNamesCustom;
                       menuVals.push(menuCustom);
                     
                       setMenuNamesCustom(menuVals);
                    
                    }

                    else{
                        var menu= [];
                         menu.push( jsonVals[key].menuitem);
                         menu.push( jsonVals[key].cost);
                         menu.push( jsonVals[key].id);
                         menu.push( jsonVals[key].default_inventory);
                        
                         var menuVals = menuNames;
                         menuVals.push(menu);
                        
             
                         
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
            console.error(err.message);
        }

      
       
        
    };
    
    const inventoryGet = async () => {
        
        
        try {
    
            const response = await fetch(conn + "api/order/getInventory");
            const jsonVals = await response.json();

            
            for( var key in jsonVals){
                
                let inventoryCat0 = [];
                let inventoryCat1 = [];
                let inventoryCat2 = [];
                let inventoryCat3 = [];
                let inventoryCat4 = [];

 

                // if (jsonVals[key] == true){
                if (jsonVals[key].classify === 0){
                    inventoryCat0.push(jsonVals[key].itemname);
                    inventoryCat0.push(jsonVals[key].itemid);
                    

                    let inventory0 = realInventory0;
                    inventory0.push(inventoryCat0);
                 
                    setInventory0(inventory0);
                }
                else if (jsonVals[key].classify === 1){
                    inventoryCat1.push(jsonVals[key].itemname);
                    inventoryCat1.push(jsonVals[key].itemid);

                    let inventory = realInventory1;
                    inventory.push(inventoryCat1);
                  
                    setInventory1(inventory);
                }
                else if (jsonVals[key].classify === 2){
                    inventoryCat2.push(jsonVals[key].itemname);
                    inventoryCat2.push(jsonVals[key].itemid);

                    let inventory = realInventory2;
                    inventory.push(inventoryCat2);
                  
                    setInventory2(inventory);
                }
                else if (jsonVals[key].classify === 3){
                    inventoryCat3.push(jsonVals[key].itemname);
                    inventoryCat3.push(jsonVals[key].itemid);

                    let inventory = realInventory3;
                    inventory.push(inventoryCat3);
                  
                    setInventory3(inventory);
                }
                else if (jsonVals[key].classify === 4){
                    inventoryCat4.push(jsonVals[key].itemname);
                    inventoryCat4.push(jsonVals[key].itemid);

                    let inventory = realInventory4;
                    inventory.push(inventoryCat4);
                  
                    setInventory4(inventory);
                }
                
               

            
            }
            var length = realInventory0.length + realInventory1.length +  realInventory2.length + realInventory3.length + realInventory4.length; 
            var value = [];
            
            for( let i =0; i< length; i++){
                value.push(0);
            }
            
            setInventoryUsed(value);
            
            
           
        } catch (err) {
            
            console.error(err.message);
        }
    };

    const sendtoDb = async () => {
        
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
            const response = fetch (conn + "api/order/postOrder", 
            {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );

            //CALL CHECKOUT CODE 
            

        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect( () => {
        orderIdVal();
        menuGet();
        inventoryGet();
    }, [])

    const pushItem = (index, val, cost, inventory_default, custom) => {
        
        setlistOrderedInv([]);

        let newCart = listOrdered;
        newCart[index-1] += 1;
        setListOrdered(newCart);
     

        if( custom === true){
            setIsShown(showCustom => true);
        }
        
        let inv = inventoryUsed;
        
        for( var i=0; i< inv.length; i++){
            inv[i] += inventory_default[i];
        }
        
        setInventoryUsed(inv);
        // console.log(inv);

        let namesCart = listOrderedNames;
        namesCart.push([val, cost, index, inventory_default, custom]);
        setListOrderedNames(namesCart);
        
        
        let costCurr = totalCost;
        costCurr = rounding(costCurr + parseFloat(cost), 2);
        setCost(costCurr);

        console.log(listOrdered);
        console.log(inventoryUsed);
       
    }

    const pushInv = (index, val, category) => {

        
        
        let namesCart = listOrderedInv;
        let x = false;
        
        let addition = [val, index, category];
        

        if ( namesCart.length === 0){
            x=false;
        }

        for (var i = 0; i < namesCart.length; ++i) {
           

            var localTrue = true;
            for (var j = 0; j < namesCart[i].length; ++j) {
                
                if( addition[j] !== namesCart[i][j]){
                    
                    localTrue = false;
                }

            }

            if (localTrue==true){
                x=true;
            }
        }
        

        
        if( x === false){
            namesCart.push([val, index, category]);
            setlistOrderedInv(namesCart);
        }
        else{
            namesCart.pop([val, index, category]);
            setlistOrderedInv(namesCart);
        }
        
       

        let inv = inventoryUsed;
        inv[index-1] += 1;
        setInventoryUsed(inv);

        

        let countVal = count;
        countVal  +=1;
        setCount(countVal);
        
        

        if (category === 0){
            setAllowClickCat0(false);
        }
        else if (category === 1){
            setAllowClickCat1(false);
        }
        else if (countToppings < 10){
            let countCurr = countToppings +1; 
            setCountToppings(countCurr);
        }
        else if( category === 2){
            setAllowClickCat2(false);
        }
        else if (category === 3){
            setAllowClickCat3(false);
        }

    }

    const clearOrder = () => {
        setOrderid(0);
    
        setListOrdered([]);
        setListOrderedNames([]);
        setlistOrderedInv([]);
        setInventoryUsed([]);
        setIsShown(false);
        setCost(0);
        setCount(0);
        setAllowClickCat0(true);
        setAllowClickCat1(true);
        setAllowClickCat2(true);
        setAllowClickCat3(true);
        setCountToppings(0);
    }
    
    const addItem = () => {
        setIsShown(showCustom => false);
        setAllowClickCat0(true);
        setAllowClickCat1(true);
        setAllowClickCat2(true);
        setAllowClickCat3(true);
        setCountToppings(0);
        setCountToppings([]);
        
    }

    const deleteItem = (item) => {
        
        let namesCart = listOrderedNames;
       
        namesCart.pop(item);
        setListOrderedNames(namesCart);
        
    
        let newCart = listOrdered;
       
        newCart[item[2]-1] -= 1;
        setListOrdered(newCart);

        let inv = inventoryUsed;
        let listItems = item[3]

        if( item[4] === true){
            setIsShown(false);
            setAllowClickCat0(true);
            setAllowClickCat1(true);
            setAllowClickCat2(true);
            setAllowClickCat3(true);

            
            let inv = inventoryUsed;

            for( var i=0; i< listOrderedInv.length; i++){
                inv[listOrderedInv[i][1] -1] -= 1;
            }
            
            setInventoryUsed(inv);

            setlistOrderedInv([]);
        }

        //FIX ME: ONLY REMOVING DEFAULT INVENTORY NOT CUSTOM. 
        for( var i=0; i< inv.length; i++){
            inv[i] -= listItems[i];
        }
        setInventoryUsed(inv);

        
        let newCost = rounding(totalCost - item[1], 2);
        newCost.toFixed(2);
        setCost(newCost);

        console.log(inventoryUsed);
        
    }

    const deleteCustom = (item) => {

        let currInv = listOrderedInv;
        currInv.pop(item);
        setlistOrderedInv(currInv);


        let inv = inventoryUsed;
        console.log(inv[item[1]-1], item[1]-1);
       
        inv[item[1]-1] -= 1;
        
        setInventoryUsed(inv);

        console.log(inventoryUsed);
        

        let category = item[2];

        if (category === 0){
            setAllowClickCat0(true);
        }
        else if (category === 1){
            setAllowClickCat1(true);
        }
        else if (countToppings <= 10){
            let countCurr = countToppings -1; 
            setCountToppings(countCurr);
        }
        else if( category === 2){
            setAllowClickCat2(true);
        }
        else if (category === 3){
            setAllowClickCat3(true);
        }

        let newCost = rounding(totalCost, 2);
        newCost.toFixed(2);
        setCost(newCost);

    }
    //const [data, setData] = useState ({
    //    totalCost: totalCost
    //});
    const Peoplestates = () => {
        const navigate = useNavigate();
        const openprofile = (totalCost) => {
            navigate ("/checkout", {
                state: {
                    totalCost: totalCost
                }
            });
        }
    }
    // console.log(orderid);

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
                onClick= { () => { pushItem(item[2], item[0], item[1],item[3], true)  }}>
                {item[0]}</Button>
            ) )}     
            { menuNames.map( (item) =>
            (
                <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { pushItem(item[2], item[0], item[1],item[3], false) }}>
                {item[0]}</Button>
            ) )}     
            

            
            

            </div>

            {showCustom && (
                <div>
                
                

                    {cat0click && (
                    <div class="buttons base">
                    <h2> Base</h2>
                    { realInventory0.map( (item) =>
                    (   
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0], 0)  }}>
                        {item[0]}</Button>
                    ) )}  
                    </div>   
                    )
                    }
                    { (!cat0click) &&
                        (
                        <div>
                        <h5>Added Items to Gyro/Bowl:</h5>
                        <table>
                        { listOrderedInv.map( (item) =>
                        <tr>
                            <td> {item[0]}</td>
                            <td> 
                                <Button  variant="contained" sx={{color:'red', backgroundColor:'white', mt: 3 , mb:2 }} onClick={() => {deleteCustom(item)} } > 
                                X
                                </Button> 
                            </td>
                        </tr>
                        )}   
                        </table>

                    <br></br>
                    <br></br>
                    <br></br>
                    </div>
                        )
                    }
                
                {cat1click && (
                 <div class="buttons protein">
                <h2> Protein</h2>

               
                    { realInventory1.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0], 1)  }}>
                        {item[0]}</Button>
                    ) )}                                  
                </div>
                )}

                {cat2click && (
                
                <div class="buttons toppings">
                <h2> Toppings</h2>
                    { realInventory2.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0], 2)  }}>
                        {item[0]}</Button>
                    ) )}                 
                </div>
                )}
                
                {cat3click && (
                
                <div class="buttons dressing">
                    <h2> Dressing</h2>
                    { realInventory3.map( (item) =>
                    (
                        <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                        onClick= { () => { pushInv(item[1], item[0], 3)  }}>
                        {item[0]}</Button>
                    )  )}
                </div>
                )}

                <div class="addItems">

                <br />
                <Button variant="contained" sx={{ backgroundColor:"black", width:150, height:50, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { addItem() } } >
                Finish Item Customization</Button> 

                        
           
                </div>

             </div>
            )}

            
            </ThemeProvider>
            

            
            </div>

           
            <div class="order__currentOrder">
                <br />
                <h1> Current Order</h1>
                
                <table>
                    <tr>
                    <th class="item">Item</th>
                    <th class="price">Price</th>
                    <th class="delete">Delete Item</th>
                    </tr>
                
                </table>
                <table> 

                { listOrderedNames.map( (item) =>
                    <tr> 
                        <td class="item">{item[0]} </td> 
                        <td class="price"> ${item[1]} </td>
                        <td class="delete">  
                            <Button  variant="contained" sx={{color:'red', backgroundColor:'white', mt: 3 , mb:2 }} onClick={() => {deleteItem(item)} } > 
                        X
                        </Button> 
                        </td> 
                     
                    </tr>
                    
                        

                    

                    
                )}   

                </table>

            <br></br>
            <br></br>
            <br></br>

             
            

                <h1> Cost: ${totalCost} </h1>
              
                <Stack spacing = {2}>
                    <Link to="/checkout" 
                    state= {{
                        orderid : orderid,
                        totalCost : totalCost,
                        listOrdered : listOrdered
                    }}
                    >

                    <Button variant="contained" size="large" sx={{mt: 3, backgroundColor:"#283593", color:"white" }} fullWidth={true} onClick= { (openprofile) => {sendtoDb()}}>Submit Order</Button>
                        
                    
                        </Link>
                        <Link>
                        <Button variant="contained" size="large" sx={{ mb:2, backgroundColor:"#283593", color:"white" }} fullWidth={true} onClick= { () => {clearOrder()}}>Clear Order</Button>
                        </Link>
                        
                        
                </Stack>


            </div>

        

        </div>
    );
};

export default Order;

