import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import {BrowserRouter as Router, Link, useNavigate, useLocation, json} from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// For local testing: (comment out)
const conn = "http://localhost:3500/";
// For production:
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

const theme = createTheme({
    palette: {
        primary: {
            main: "#283593",
        },
        secondary: indigo,
    },
});



function rounding(number, precision){
    var newnumber = new Number(number+'').toFixed(parseInt(precision));
    return parseFloat(newnumber); 
}

function Cashier (props) {
    const location = useLocation();
    const nameCashier = location.state.userName;

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
    // const [awaitPickup,setAwaitPickup]= useState(false);
    // const [awaitPickup2,setAwaitPickup2]= useState(false);
    // const [orderNew,setOrderNew]= useState(false);
    // const [newAwait, setNewAwait]= useState(false);
    const [clicked, setClickedInfo] = useState(false);
    // const name = "Pom and Honey at Texas A&M MSC";

    
    const [newOrders, setNewOrders] = useState([]);
    const [pickupOrder, setpickupOrders] = useState([]);

    

    // const handleClick = () => {
    //     setIsShown((current) => !current);
    // }; 

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
                 
                if (jsonVals[key].is_selling === true){
                    if (jsonVals[key].is_customize === true){
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
                        
                         var menuVals2 = menuNames;
                         menuVals2.push(menu);
                        
             
                         
                         setMenuNames(menuVals2);
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

            // If cashier, order is not online.
            var mobile_order = 0;
            const body = {orderid, current, totalCost, listOrdered, inventoryUsed, mobile_order};
            const response = fetch (conn + "api/order/postOrder", 
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
        getOrders();
    },[])

    

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

        let indexNames=-1;
        for (var i = 0; i < namesCart.length; ++i) {
           

            var localTrue = true;
            for (var j = 0; j < namesCart[i].length; ++j) {
                
                if( addition[j] !== namesCart[i][j]){
                    
                    localTrue = false;
                }

            }

            if (localTrue===true){
                x=true;
                indexNames=i;
            }
        }
        

        
        if( x === false){
            namesCart.push([val, index, category]);
            setlistOrderedInv(namesCart);

            let inv = inventoryUsed;
            inv[index-1] += 1;
            setInventoryUsed(inv);
    
            
    
            let countVal = count;
            countVal +=1;
            setCount(countVal);
            console.log("added",countVal);

            if (countToppings < 10 && category === 2){
                let countCurr = countToppings +1; 
                console.log("COUNT updated: ",countToppings);
                setCountToppings(countCurr);
            }

        }
        else{
            namesCart.splice(indexNames, 1);
            setlistOrderedInv(namesCart);

            
            let countCurr = countToppings -1; 
            setCountToppings(countCurr);
            

            let inv = inventoryUsed;
            inv[index-1] -= 1;
            setInventoryUsed(inv);

        }

        console.log("countToppings", countToppings);
        if (category === 0){
            setAllowClickCat0(false);
        }
        else if (category === 1){
            setAllowClickCat1(false);
        }
        else if( category === 2 && countToppings >= 10){
            setAllowClickCat2(false);
        }
        else if (category === 3){
            setAllowClickCat3(false);
        }

      
        console.log(inventoryUsed);

        

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
       
        let x= namesCart.indexOf(item);
        namesCart.splice(x, 1);

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
        let x= currInv.indexOf(item);
        currInv.splice(x, 1);

        setlistOrderedInv(currInv);
        console.log("deleted");

        let inv = inventoryUsed;
        inv[item[1]-1] -= 1;
        setInventoryUsed(inv);
        

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
            console.log("delete button: ",countCurr);
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
    
    const Peoplestates = () => {
        const navigate = useNavigate();
        const openprofile = (totalCost) => {
            navigate ("/cashier_checkout", {
                state: {
                    totalCost: totalCost
                    
                }
            });
        }
    }
    const getOrders = async () => {
       
        try {
            const newOrderId=1;
            const response = await fetch (conn + `api/order/getNewOrders/${newOrderId}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const jsonVals = await response.json();
            
            setNewOrders(jsonVals);

            const waitingOrder =2;
            const response2 = await fetch (conn + `api/order/getNewOrders/${waitingOrder}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const jsonVals2 = await response2.json();
            
            setpickupOrders(jsonVals2);
            
            // console.log(jsonVals);
            // console.log(jsonVals2);
            
        } catch (err) {
    
            console.error(err.message);
        }

    }
    const setNewOrder = (orderid, mobile_order, index) => {
        //post changes
        const body = {orderid, mobile_order};

        newOrders.splice(index, 1);

        setNewOrders(newOrders);

        fetch (conn + "api/order/updateOrder",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )
        
        getOrders();
        window.location.reload();
        


    }

    const setPickedup = (orderid, mobile_order, index) => {
        //post changes
        const body = {orderid, mobile_order};

        pickupOrder.splice(index, 1);

        fetch (conn + "api/order/updateOrder",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )

        getOrders();
        window.location.reload();
        
        
    }
    
    


    //FIX ME PREKSHA
    const getOrderInfo = (orderedList) => {
        // listNamesOrdered = 
        // menuNames.includes()
        // menuNamesCustom.includes()
        // for( var i=0; i< inv.length; i++){
             
        // }
        console.log(orderedList);
    }

    return (

        

        <div class="cashier__pageOrder">
            <h4> Cashier: {nameCashier} </h4>
        <div class="cashier__mobileorders">
            <br />
            <h1>Mobile Orders</h1>
            
            
            <br />
            <h3> New Orders</h3>
            <table>
             
                <div> 
                <tr> 
                    <th class="orderid"> Order Id</th>
                    <th class="costCol"> Cost </th>
                    <th class="buttonDone"> Done </th>
                </tr>

                { newOrders.map( (item, index) =>
                    (
                <tr>
                
                    <td class="orderid"> 
                        <Button onClick={() => setClickedInfo(true)}>{item.orderid} </Button>

                        <Dialog open={clicked} onClose={() => setClickedInfo(false)}>
                            <DialogTitle>Order {item.orderid} Information</DialogTitle>
                            <DialogContent>
                            { item.ordereditems.map( (val) =>
                            (
                            <DialogContentText>
                                {val}
                            </DialogContentText>
                            ))  }
                           </DialogContent>
                        </Dialog>
                        
                    </td>
                    <td class="costCol"> {item.amount}</td>
                    <td class="buttonDone">  
                        <Button  variant="contained" sx={{color:'green', backgroundColor:'white', mt: 3 , mb:2 }} onClick= {() => setNewOrder(item.orderid, 2, index)} > 
                            X
                        </Button> 
                    </td>
                </tr>
                ))} 

                <br />                                                                                
                </div>
                

            </table>
            <br />
            <h3> Awaiting Pickup</h3>
            
            <table>
                    
            <div>
                <tr> 
                    <th> Order Id</th>
                    <th class="costCol"> Cost </th>
                    <th class="buttonDone"> Done </th>
                </tr>

                
                { pickupOrder.map( (item, index) =>
                    (
                <tr>
                
                    <td class="orderid"> 
                     {item.orderid} </td>
                    <td class="costCol"> {item.amount}</td>
                    <td class="buttonDone">  
                        <Button  variant="contained" sx={{color:'green', backgroundColor:'white', mt: 3 , mb:2 }} onClick= {() => setPickedup(item.orderid, 3, index)} > 
                            X
                        </Button> 
                    </td>
                </tr>
                ))} 
            

            

                <br />
                </div>
            </table>

            

        </div>

        <div class="cashier__orderingSection">
            <br></br>

            <h1 class="order__orderingTitle"> Pom & Honey Menu </h1>
            <br></br>
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

                <br>
                </br>
                <Button variant="contained" sx={{ backgroundColor:"black", width:150, height:50, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}
                onClick= { () => { addItem() } } >
                Finish Item Customization</Button>   

             </div>
            )}

            
            </ThemeProvider>
            <div class="addItems">


                

                        
           
            </div>

            
        </div>

           
        <div class="cashier__currentOrder">
                <br />
                <h1> Current Order</h1>
                
                <br />
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
                    <Link to="/cashier_checkout" 
                    state= {{
                        orderid : orderid,
                        totalCost : totalCost,
                        inventoryUsed : inventoryUsed,
                        listOrderedNames : listOrderedNames,
                        userName: nameCashier
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

export default Cashier;

