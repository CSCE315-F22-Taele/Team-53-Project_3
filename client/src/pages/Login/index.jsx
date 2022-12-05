import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';

import TextField from '@mui/material/TextField';
import e from "cors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';

import {useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

  
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

function Login () {
    const [userName, setUserName] = useState(window.localStorage.getItem('user'));
    const [isEmployee,setIsEmployee ] = useState(false);
    const [isManager,setIsManager ] = useState( window.localStorage.getItem('manager') );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData') )
        : null
    );

    const [newEmail, setNewEmail] = useState("");
    const [newName, setNewName] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [newEmployeeId, setNewEmployeeid] = useState("");

    const [count, setCount] = useState(0);

    const isEmployeeGoogleOauth= async (sub) => {
        try {

            
            // const employeename = userName;
            // console.log(employeename);
            const response = await fetch (conn + `api/login/isEmployeeGoogleOauth/${sub}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
        
            console.log(sub);
            const jsonVals = await response.json();
            
            if( jsonVals.isEmployee == true){
                window.localStorage.setItem('user', jsonVals.employeename);
                
                setIsEmployee(jsonVals.isEmployee);
                //fix me: 
                console.log("DOne");
                const response2 = await fetch (conn + `api/login/isManagerGoogleOauth/${sub}`, 
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                console.log("DOne");
                const jsonVals2 = await response2.json();
                
                console.log(jsonVals2);
                
                setIsManager(jsonVals2);
                window.localStorage.setItem('manager', jsonVals);
            
                setUserName(jsonVals.employeename);
                
                
            }
            else{
                alert("Invalid email. Account with this email does not exist. Try another email or create an account.");
            }
            
        } catch (err) {
            
            console.error(err.message);
        }
        //console.log(sub)
        
    }
    
    const employeeLogin= async (email, password) => {
        try {

            
            // const employeename = userName;
            
            const response = await fetch (conn + `api/login/isValidEmployee/${email}/${password}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
        
    
            const jsonVals = await response.json();
            console.log(jsonVals);
            
            
            if( jsonVals.isEmployee == true){
                window.localStorage.setItem('user', jsonVals.employeename);
                
                setIsEmployee(jsonVals.isEmployee);
                setUserName(jsonVals.employeename);
                managerCheck(jsonVals.employeename);
                //const isManger =
                // console.log(isManager);
                window.localStorage.setItem('manager', isManager);
 
                
            }
            else{
                alert("Invalid email or password. Try again or sign in with Google. ");
            }
            //window.location.reload()

        } catch (err) {
            
            console.error(err.message);
        }
        
    }
    
    const managerCheck = async (employeename) => {
        // console.log(jsonVals.employeename);
        const response2 = await fetch (conn + `api/login/isManager/${employeename}`, 
        {   
                method: "GET",
                headers: { "Content-Type": "application/json" },
            }
        );
        
        const jsonVals2 = await response2.json();
        
        console.log(jsonVals2);
        setIsManager(jsonVals2);
        // return jsonVals2;
    }

    const addEmployeeGoogleOauth = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                //console.log(res.data);
                
            const employeename = res.data.name; 
            const sub = res.data.sub;
            const body = {employeename, sub};
           
            fetch (conn + `api/login/insertGoogleOauth/${sub}/${employeename}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            )
            

            const response = await fetch (conn + `api/login/isEmployee/${employeename}`, 
                {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                );
            
        
            const jsonVals = await response.json();
            console.log(jsonVals);
            
            if( jsonVals.isEmployee === true && jsonVals.is_working === true){
                    window.localStorage.setItem('user', employeename);
                    
                    setIsEmployee(jsonVals.isEmployee);
                    setUserName(jsonVals.employeename);
                    managerCheck(jsonVals.employeename);
            }
            else if(jsonVals.isEmployee === true){
                alert("You are an employee. Please contact your manager to allow for access with this Google email.");
                window.location.reload()
            }
            else{
                alert("You are not an employee. Make sure your name matches.")
            }
            window.location.reload();
        } catch (err) {
            console.log(err)

        }
        

        }

    });

  
    const createAccount = async () => {
        
       try{
        const employeeid= newEmployeeId;
        const email = newEmail;
        const password = newPassword;
        console.log(email);
        
        if( password !== "" && employeeid !== "" && email !== ""){
        
        const body = {employeeid, email, password};
        console.log(employeeid, email, password);
        console.log(newEmployeeId);
        fetch (conn + "api/login/updateBasedInsert",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
        )

        const response = await fetch (conn + `api/login/getInfo/${employeeid}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
        
    
        const jsonVals = await response.json();
        console.log(jsonVals);
        
        if( jsonVals.isEmployee === true && jsonVals.is_working === true){
                window.localStorage.setItem('user', jsonVals.employeename);
                
                setIsEmployee(jsonVals.isEmployee);
                setUserName(jsonVals.employeename);
                managerCheck(jsonVals.employeename);
        }
        else if(jsonVals.isEmployee === true){
            alert("You are an employee. Please contact your manager to allow for access with this password and email");
            window.location.reload()
        }
        else{
            alert("You are not an employee or you have supplied the wrong id. ");
        }
        
        }
        else{
            alert("Invalid entry. Make sure you have a valid email and id.")
        }
        window.location.reload();

        } catch (err) {
        console.error(err.message);
        }
    }

    const handleEmail = async (e) => {
        
        setEmail(e.target.value);
        
      }
    
    const handlePassword = async (e) => {
        setPassword(e.target.value);
    }

    const handleNewName = async (e) => {
        setNewName(e.target.value);
    }

    const handleNewEmployeeId = async (e) => {
        setNewEmployeeid(e.target.value);
        
    }

    const handleNewEmail = async (e) => {
        if( e.target.value.includes("@") ){
            setNewEmail(e.target.value);
        }
       
    }

    const handleNewPassword = async (e) => {
        setnewPassword(e.target.value);
    }


    const clearLogin = async (e) => {
        window.localStorage.setItem('user', "");
        window.localStorage.setItem('manager', false);
        setIsEmployee(false);
        setIsManager(false);
        setPassword("");
        setEmail("");
        setUserName("");
        setLoginData(null);
        window.location.reload()

    }
    
    const Peoplestates = () => {
        const navigate = useNavigate();
        const openprofile = (userName) => {
            navigate ("/cashier", {
                state: {
                    userName: userName
                }
            });
        }

        const openmanager = (userName) => {
            navigate ("/manager_route", {
                state: {
                    userName: userName
                }
            });
        }
    }

    const userLogin = () => {

    };

    useEffect( () => {  
        console.log("user", window.localStorage.getItem('user') );
        const auth = window.localStorage.getItem('user');
        if (auth) {
            setUserName(window.localStorage.getItem('user'));
            setIsManager(window.localStorage.getItem('manager'));
            setIsEmployee(true);
            
        }

        // const managerOrnot = window.localStorage.getItem('manager');
        // if(managerOrnot){
        //     setIsManager(window.localStorage.getItem('manager'));
        // }
        console.log("manager", window.localStorage.getItem('manager') );
        

    }, [userName,isManager])

    console.log(window.localStorage.getItem('manager'));
    
    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                //console.log(res.data);
                
                
                setUserName(res.data.name);

                let countNew= count;
                setCount(countNew + 1);

                setLoginData(res);
                isEmployeeGoogleOauth(res.data.sub);
            } catch (err) {
                console.log(err)

            }

        }

    });

    //console.log("USER",localStorage.getItem('user'));

    return (
    <div>
        {!isEmployee && (<br></br>)}
        
        <h1> Welcome to Pom and Honey's System</h1>
        <br></br>
        <br></br>
        { !isEmployee  && (
        <div class="borderArea">
            <ThemeProvider theme={theme}>
            { !isEmployee  && (
                <div>
            <div class="newPerson">
                
                <h3> Create Account</h3>
                <br></br>
                
                
                <TextField id="employee id" label="Employee Id" variant="outlined" required fullWidth onChange={handleNewEmployeeId}/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="email" label="Email" variant="outlined" required fullWidth onChange={handleNewEmail}/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="password" label="Password" variant="outlined" required fullWidth onChange={handleNewPassword}/>
                <br class="spacing"/>
                <Stack> 
                <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 3 }} onClick={() => createAccount() }> Create Account</Button>
                </Stack>
                
                <br /> 
                <h4>Or</h4>

                <Stack> 
                
                {/* Or actually when we make an account, have it insert into the employee table, but set is_working to false. Then leave an alert saying "double check w/ manager for access" */}
                <Button type="googleLogin"  variant="contained" sx={{color:'black', backgroundColor:'white', mt: 3, mb: 2 }} onClick={() => addEmployeeGoogleOauth()}> 
                <img width="20px" class="googleImg" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />     Sign Up with Google
                </Button> 
                </Stack>
                
                
                <br />
            </div>
            </div>
            )}

            <div class="loginOld">

             { !isEmployee  && (
                <div>
                <br /> 
                <br />
                <br />
               
                <h3> Welcome. Please Login. </h3>

                <br />
                <form >
                <TextField id="outlined-basic" label="Email" fullWidth="true" variant="outlined" onChange={handleEmail} />
                {/* <input type="text" value={email} onChange={handleEmail} /> */}
                {/* <TextField id="email" label="Email" variant="outlined" required fullWidth value = { email } onChange = { handleEmail }/> */}
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="outlined-basic" label="Pasword" fullWidth="true" type="password"variant="outlined" onChange={handlePassword} />
                {/* <TextField id="password" label="Password" variant="outlined" required fullWidth value = { password } onChange = { handlePassword }/> */}
                <Stack>


                <Button type="submit"  size="large" variant="contained" sx={{ mt: 3, mb: 2 }} onClick={() => employeeLogin(email, password)}> Sign In</Button>
                </Stack>
                </form>

                
                <Stack>
                <Button type="googleLogin"  variant="contained" sx={{color:'black', backgroundColor:'white', mt: 3 , mb:2 }}  onClick={login} > 
                <img width="20px" class="googleImg" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />     Sign In with Google
                </Button> 
                </Stack>
                <br /> 
                <br />
                <br />
                <br />
          
          
                </div>
            ) }

        </div>
                
            </ThemeProvider>

            <br />
            <br />        
            <br />        

        </div>
        )}

        {isEmployee  && (

        <div class="success">

        <h4> Howdy, employee {userName}! </h4>
        <Link to="/cashier" 
            state= {{
                userName: userName
        }}>     
            <Button type="cashier"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={(openprofile) => {userLogin()} }> Go to Cashier Page</Button>
        </Link> 

        <Link to="/login">     
            <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={() => clearLogin()} > Logout</Button>
            </Link>


        {isManager && (
        //     <Link to="/manager_route"
        //     state= {{
        //         userName: userName
        // }}>     
        //         <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={(openmanager) => {userLogin()} }> Go to Manager Page</Button>
        //     </Link> 

        <div>
        <Stack spacing={5} direction="row" justifyContent="center" >
        <div>
        <ThemeProvider theme={theme}>
            
            
            
            <Link to="/manager" 
                    state= {{
                        userName: userName
            }}>    
        
          <Button variant="contained" sx={{width:200, height:150, padding: 1, marginLeft: 2,mt:2,   mb:2}}
            >Reports</Button>
            </Link>
            
        
            <Link to="/inventory" 
                    state= {{
                        userName: userName
            }}>    
          <Button variant="contained" sx={{ width:200, height:150,padding: 1, marginLeft: 2,mt:2,  mb:2 }}
            >Inventory</Button>
            </Link>
           
            <Link to="/menu" 
                    state= {{
                        userName: userName
            }}>    
          <Button variant="contained" sx={{ width:200, height:150, padding: 1, marginLeft: 2, mt:2,mb:2 }}
            >Menu Customization</Button> 
            </Link>

           

        
        </ThemeProvider>
        </div>

        </Stack>
        
        

        </div>

   
        )}

        </div> )}

    </div>

       
    );
};

export default Login;
