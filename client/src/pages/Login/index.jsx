import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import e from "cors";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';

import {useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { createBox } from "@mui/system";
  
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
    const [userName, setUserName] = useState("");
    const [isEmployee,setIsEmployee ] = useState(false);
    const [isManager,setIsManager ] = useState(false);
    const [loginData, setLoginData] = useState(
        localStorage.getItem('loginData')
        ? JSON.parse(localStorage.getItem('loginData') )
        : null
    );

    const [count, setCount] = useState(0);

    

    const isEmployeeFunction= async (employeename) => {
        
        try {

            setUserName(employeename);
            // const employeename = userName;
            // console.log(employeename);
            const response = await fetch (conn + `api/login/isEmployee/${employeename}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
        
    
            const jsonVals = await response.json();
            
            //console.log(jsonVals);
           
            setIsEmployee(jsonVals);
            
            const response2 = await fetch (conn + `api/login/isManager/${employeename}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
        
    
            const jsonVals2 = await response2.json();
            
            //console.log(jsonVals2);
            setIsManager(jsonVals2);


        } catch (err) {
    
            console.error(err.message);
        }

    };

   
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
        alert("Entering Employee Pages");
    };

    const login = useGoogleLogin({
        onSuccess: async respose => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        "Authorization": `Bearer ${respose.access_token}`
                    }
                })

                console.log(res.data);
                
                
                setUserName(res.data.name);

                let countNew= count;
                setCount(countNew + 1);

                setLoginData(res);
                isEmployeeFunction(res.data.name);
            } catch (err) {
                console.log(err)

            }

        }

        

       
    });


    return (
    <div>
        <br></br>
        <h1> Welcome to Pom and Honey's System</h1>
        <br></br>
        <br></br>
        <div class="borderArea">
            <ThemeProvider theme={theme}>
            { !isEmployee  && (
                <div>
            <div class="newPerson">
                
                <h3> Create Account</h3>
                
                <Button type="googleLogin"  variant="contained" sx={{color:'black', backgroundColor:'white', mt: 3, mb: 2 }} onClick={login}> 
                <img width="20px" class="googleImg" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />     Sign In with Google
                </Button> 
                <br></br>
                <h4>Or</h4>
                <TextField id="name" label="Name" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="email" label="Email" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="password" label="Password" variant="outlined" required fullWidth/>

                <Button type="submit" size="large" variant="contained" sx={{ mt: 3, mb: 3 }} onClick={userLogin}> Create Account</Button>
                
            </div>
            </div>
            )}

            <div class="loginOld">

             { !isEmployee  && (
                <div>
                <br /> 
                <br />
                <h3> Welcome. Please Login. </h3>

                <br />
                
                <TextField id="email" label="Email" variant="outlined" required fullWidth/>
                <br class="spacing"/>
                <br class="spacing"/>
                <TextField id="password" label="Password" variant="outlined" required fullWidth/>
                <Stack>

                <Link to="/cashier" 
                    state= {{
                        userName: userName
                }}>
                    <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={(openprofile) => {userLogin()}}> Sign In</Button>
                </Link>

                
                
                <Button type="googleLogin"  variant="contained" sx={{color:'black', backgroundColor:'white', mt: 3 , mb:2 }}  onClick={ login} > 
                <img width="20px" class="googleImg" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />     Sign In with Google
                </Button> 
                </Stack>
                </div>
            ) }

                {isEmployee  && (

                <div class="success">

                <h4> Hello, employee {userName} </h4>
                <Link to="/cashier" 
                    state= {{
                        userName: userName
                }}>     
                    <Button type="cashier"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={(openprofile) => {userLogin()} }> Go to Cashier Page</Button>
                </Link> 
                
                
                {isManager && (
                    <Link to="/manager_route"
                    state= {{
                        userName: userName
                }}>     
                        <Button type="submit"  variant="contained" sx={{ mt: 3, mb: 0 }} onClick={(openmanager) => {userLogin()} }> Go to Manager Page</Button>
                    </Link> 
                )

                }
                </div>
                )}

                {/* <GoogleLogin
                    onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                
                    logo_alignment="center"
                /> */}
      
                
                <br />
                <br />        
                <br />        

            </div>

            </ThemeProvider>
        </div>

    </div>
    );
};

export default Login;
