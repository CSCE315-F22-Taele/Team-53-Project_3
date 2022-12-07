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
import { TextField, Checkbox} from '@mui/material';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import e from "cors";

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
/**
 * Function to display the employee controls page
 * @constructor
 */
function Employee (props) {
    const location = useLocation();

    const nameManager = location.state.userName;
    const [workingEmployees, setWorking] = useState([]);
    const [notworkingEmployees, setNotWorking] = useState([]);
    const [clicked, setClickedInfo] = useState(false);
    const [isworking, setIsWorking] = useState(null);
    const [disabled, setClickeddisabledInfo] = useState(null);
    const [employeename, setName] = useState("");
    const [salary, setSalary] = useState("");
    const [ismanager, setismanager] = useState(false);

    /**
     * get the active and inactive employees
     */
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

    /**
     * update database to set an employee as active or not
     * @param  {Number} employeeid the employee id
     * @param  {Boolean} is_working boolean if it is working
     */
    const handleIsworking = async(employeeid, is_working)=> {

        try {
            // console.log(val);
            // const employeeid = val[0];
            const body = {is_working, employeeid };
            console.log(body);
            fetch (conn + "api/employee/update_working",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              }


          );
          window.location.reload();
        } catch (err) {
            console.error(err.message);
          }

    }

    /**
     * Add new employee to the database
     */
    const addEmployee = async()=> {


        try {

            const body = {salary,employeename, ismanager };

            console.log(body);
            fetch (conn + "api/employee/add",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
              }

            );
            setClickedInfo(false);

        } catch (err) {
            alert("additon failed");
            console.error(err.message);

          }

          window.location.reload();


    }

    /**
     * Setup the connections to the datbase to use to render the page.
     */
    useEffect( () => {
      getEmployees();
    }, [])

    /**
     * handle new name input
     * @param  {[type]}  e     event
     */
    const handleName = async (e) => {
        setName(e.target.value);
    }

    /**
     * set the new salary input
     * @param  {[type]}  e               event
     */
    const handleSalary = async (e) => {
        setSalary(e.target.value);
    }

    /**
     * set the new manager input
     * @param  {[type]}  e               event
     */
    const handleManager = async(event) =>{
        setismanager(!ismanager);
    }
    
    return (
        <div>
            <br />
            <h1> Employee Control Center</h1>
            <p> Enable or disable the employees by clicking on their employee id.</p>
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


                { workingEmployees.map( (item, index) =>
                    <tr>
                        <Button variant="contained"  size="large" sx={{  width:100, height:50,color:'black', backgroundColor:'white', mt: 3 , mb:2 }} onClick={() => handleIsworking(item[0], false)} >
                        {/* () => setClickedInfo(true) */}
                        <td> {item[0]} </td>
                        </Button>
{/*
                        <Dialog open={clicked} onClose={() => setClickedInfo(false)}>
                            <DialogTitle>Employee Information</DialogTitle>
                            <Button variant="contained"  size="large" sx={{  width:100, height:50,color:'black', backgroundColor:'white', mt: 3 , mb:2 }} onClick={() => handleIsworking(item[0], false)}>
                                 Disable Employee </Button>
                        </Dialog> */}

                    <td> {item[2]} </td>

                    <td> {item[1]} </td>
                    <td> {item[3].toString()} </td>
                    </tr>
                )}

            </table>

            <br />

            <Button variant="contained"  size="large" sx={{  width:200, height:50,color:'black', backgroundColor:'#283593', mt: 3 , mb:2  }} onClick={() => setClickedInfo(true)}> ADD EMPLOYEE </Button>

            <Dialog fullWidth={true} open={clicked} onClose={() => setClickedInfo(false)} >
                            <DialogTitle>Employee Information</DialogTitle>
                            <br />
                            <TextField id="outlined-basic" label="Employee Name" variant="outlined" onChange={handleName} />
                            <br />
                            <TextField id="outlined-basic" label="Salary" variant="outlined" onChange={handleSalary} />
                            <br />
                            <DialogContentText> Is this Employee a manager?</DialogContentText>
                            <br />
                            <FormControlLabel control={<Checkbox defaultChecked checked={ismanager} onChange={handleManager}/>} label="Check if Manager"  class="manager"/>

                            <Button variant="contained" onClick={() => addEmployee()} size="large" sx={{  width:100, height:50,color:'black', backgroundColor:'white',ml:2, mr:2, mt: 3 , mb:2 }}>
                                 Submit </Button>
             </Dialog>


            <br />
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


                { notworkingEmployees.map( (item, index) =>
                    <tr>

                    <Button variant="contained"  size="large" sx={{  width:100, height:50,color:'black', backgroundColor:'white', mt: 3 , mb:2 }} onClick={() => handleIsworking(item[0], true)} >
                    <td> {item[0]} </td>
                    </Button>

                    <td> {item[2]} </td>

                    <td> {item[1]} </td>
                    <td> {item[3].toString()} </td>
                    </tr>
                )}

            </table>

            <br />
            <br />

        </div>
    );

}

export default Employee;
