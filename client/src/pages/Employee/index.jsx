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

function Employee (props) {
    const location = useLocation();

    const nameManager = location.state.userName;
    const [workingEmployees, setWorking] = useState([]);
    const [notworkingEmployees, setNotWorking] = useState([]);
   

    const getEmployees = async () => {
        setWorking([]);
        setNotWorking([]);

        const response = await fetch(conn + "api/employee/get");

        const jsonVals = await response.json();
        
        for( var key in jsonVals) { 
            if (jsonVals[key].is_working === true){
                
               var workingNames = [];
               workingNames.push( jsonVals[key].employeeid);
               workingNames.push( jsonVals[key].salary);
               workingNames.push( jsonVals[key].employeename);
            
               workingNames.push( jsonVals[key].ismanager);
            
               
               var namesWorking = workingEmployees;
               namesWorking.push(workingNames);
               
               setWorking(namesWorking);
            
            }
            else {
            
                var workingNames = [];
                workingNames.push( jsonVals[key].employeeid);
                workingNames.push( jsonVals[key].salary);
                workingNames.push( jsonVals[key].employeename);
                workingNames.push( jsonVals[key].ismanager);

                var namesWorking = notworkingEmployees;
                namesWorking.push(workingNames);
                setNotWorking(namesWorking);
            
             }

        }
    };

    useEffect( () => {  
      getEmployees();
    }, [])


    console.log(workingEmployees.at(0));
    return (
        <div>
            <br />
            <h1> Employee Control Center</h1>
            <br />
            <br />
            <h2> Working Employees</h2>
            <br />
            <table> 
                <tr>
                    <th>Employee ID</th>
                    <th> Name</th>
                    <th> Salary</th>
                    <th> Manager</th>
                </tr>
                
               
                { workingEmployees.map( (item) =>
                    <tr>
                        <Button variant="contained"  size="large" sx={{  width:100, height:50,color:'green', backgroundColor:'white', mt: 3 , mb:2 }} >
                        <td> {item[0]} </td>
                        </Button>
                    <td> {item[2]} </td>
                    
                    <td> {item[1]} </td>
                    <td> {item[3].toString()} </td>
                    </tr>
                )}
           
            </table>
            <br />

            <h2> Disabled Employees</h2>
            <br />
            <table> 
                <tr>
                    <th>Employee ID</th>
                    <th> Name</th>
                    <th> Salary</th>
                    <th> Manager</th>
                </tr>
                
               
                { notworkingEmployees.map( (item) =>
                    <tr>
                        <Button variant="contained"  size="large" sx={{  width:100, height:50,color:'green', backgroundColor:'white', mt: 3 , mb:2 }} >
                        <td> {item[0]} </td>
                        </Button>
                    <td> {item[2]} </td>
                    
                    <td> {item[1]} </td>
                    <td> {item[3].toString()} </td>
                    </tr>
                )}
           
            </table>
            <br />

        </div>
    );

}

export default Employee;




