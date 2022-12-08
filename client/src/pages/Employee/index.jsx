import React, { useRef } from 'react'
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
import DialogActions from '@mui/material/DialogActions';


// const conn = "http://localhost:3500/";
const conn = "https://pom-and-honey-bhf5.onrender.com/";

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState(0);

    // Update
    const [open_name_update, set_name_update] = useState(false);
    const [open_update_select, set_open_update_select] = useState(false);
    const [isworking_, setIsWorking_] = useState(false);
    const name_input = useRef('');
    const salary_input = useRef('');
    const email_input = useRef('');
    const password_input = useRef('');
    const isworking__input = useRef(0);
    const ismanager_input = useRef(0);
    const [ismanager_, setismanager_] = useState(false);

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
            // const employeeid = val[0];
            const body = {is_working, employeeid };
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

    const updateEmployee = async() => {
        try {
            if (/^[A-Za-z\s]*$/.test(name_input.current.value) && name_input.current.value !== "") {
                if (/^\d+$/.test(salary_input.current.value)) {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_input.current.value) || email_input.current.value === "") {
                        
                        var salary = salary_input.current.value;
                        var employeename = name_input.current.value;
                        // var ismanager = ismanager_input.current.value;
                        var email = email_input.current.value;
                        var password = password_input.current.value;
                        var is_working = isworking_;
                        console.log("In update manager", ismanager);
                        console.log("In update active", is_working);

                        const body = { salary, employeename, ismanager, email, password, is_working, id }

                        fetch (conn + "api/employee/update",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                          }
                        );

                        set_open_update_select(false);
                        setName("");
                        setSalary("");
                        setismanager(false);
                        setEmail("");
                        setPassword("");
                        window.location.reload();
                    }
                    else {
                        alert("Invalid email. Please retry.");
                    }
                }
                else {
                    alert("Invalid salary. Please enter a digit.")
                }
            }
            else {
                alert("Invalid employee name. Please retry.");
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    /**
     * Add new employee to the database
     */
    const addEmployee = async() => {
        try {
            if (/^[A-Za-z\s]*$/.test(employeename) && employeename !== "") {
                if (/^\d+$/.test(salary)) {
                    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) || email === "") {
                        const body = { salary, employeename, ismanager, email, password };

                        fetch (conn + "api/employee/add",
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                          }
                        );

                        setClickedInfo(false);
                        window.location.reload();

                        setName("");
                        setSalary("");
                        setismanager(false);
                        setEmail("");
                        setPassword("");

                    }
                    else {
                        alert("Invalid email. Please retry.");
                    }
                }
                else {
                    alert("Invalid salary. Please enter a digit.");
                }
            }
            else {
                alert("Invalid employee name. Please retry.");
            }

        } catch (err) {
            console.error(err.message);
          }
    }

    /**
     * Setup the connections to the datbase to use to render the page.
     */
    useEffect( () => {
      getEmployees();
    }, [])

    /**
     * handle new name input
     */
    const handleName = async (e) => {
        setName(e.target.value);
    }

    /**
     * set the new salary input
     */
    const handleSalary = async (e) => {
        setSalary(e.target.value);
    }

    /**
     * set the new manager input
     */
    const handleManager = async(event) =>{
        setismanager(!ismanager);
    }

    /**
     * set the new email input
     */
    const handleEmail = async(e) => {
        setEmail(e.target.value);
    }

    /**
     * set the new password input
     */
    const handlePassword = async(e) => {
        setPassword(e.target.value);
    }

    /**
     * Open search for employee.
     */
    const handleOpen_update = async(e) => {
        set_name_update(true);
    }

    /**
     * Close update for employee.
     */
    const handleClose_update = async(e) => {
        set_name_update(false);
    }

    /**
     * Set employee id being searched.
     */
    const handleId = async(e) => {
        setId(e.target.value);
    }

    // /**
    //  * 
    //  */
    // const handleOpen_update_success = async() => {

    // }

    /**
     * Check if employee is working in update.
     * @param {*} e 
     */
    const handleIsworking_ = async(e) => {
        console.log("In handleIsworking", isworking_);
        setIsWorking_(!isworking_);
        console.log("In handleIsworking", isworking_);
    }

    /**
     * Check if employee is a manager in update.
     * @param {*} event 
     */
    const handleManager_ = async(event) =>{
        setismanager_(!ismanager_);
    }

    const is_valid_employee = async() => {
        try {
            const response = await fetch (conn + `api/employee/isValidEmployee/${id}`, 
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );
            const data = await response.json();

            if (data && id !== 0) {
                const response = await fetch (conn + `api/employee/getEmployee/${id}`, 
                    {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    }
                );
                const data = await response.json();

                setName(data.employeename);
                // console.log(data.employeename);
                setSalary(data.salary);
                setEmail(data.email);
                setPassword(data.password);
                setismanager(data.ismanager);
                setIsWorking_(data.is_working);
                set_open_update_select(true);
                handleClose_update();

                console.log(data.ismanager);
            }    
            else {
                alert("Invalid employee ID. Please retry.");
            }

        } catch (err) {
            console.error(err.message);
        }
    }
    
    return (
        <div>
            <br />
            <h1> Employee Control Center</h1>
            <p> Enable or disable the employees by clicking on their employee id.</p>

            <Button variant="contained"  size="large" sx={{  width:200, height:50,color:'white', backgroundColor:'#283593', mt: 3 , mb:2  }} onClick={() => setClickedInfo(true)}> ADD EMPLOYEE </Button>

            {/* <Dialog fullWidth={true} open={clicked} onClose={() => setClickedInfo(false)} > */}
            <Dialog open={clicked} onClose={() => setClickedInfo(false)} >
                <DialogTitle fontSize={25}>New Employee Information</DialogTitle>
                    <DialogContent>
                            <TextField 
                            required 
                            margin="dense" 
                            id="outlined-required" 
                            variant="standard"
                            helperText="Employee Name*"
                            fullWidth
                            onChange={handleName} />
                            
                            <TextField required margin="dense" id="outlined-required" helperText="Salary* (eg. 10)" variant="standard" 
                            fullWidth onChange={handleSalary} />
                            <TextField required margin="dense" id="outlined-required" helperText="Email (if applicable)" variant="standard" 
                            fullWidth onChange={handleEmail} />
                            <TextField required margin="dense" id="outlined-required" helperText="Password (if applicable)" variant="standard"  fullWidth onChange={handlePassword} />
                            <DialogContentText> Is this Employee a manager?</DialogContentText>
                            <FormControlLabel control={<Checkbox defaultChecked checked={ismanager} onChange={handleManager}/>} label="Check if manager."  class="manager"/>

                            <DialogActions>
                                <Button onClick={() => setClickedInfo(false)}>
                                    Cancel </Button>
                                <Button onClick={() => addEmployee()}>
                                    Submit </Button>
                            </DialogActions>
                    </DialogContent>
             </Dialog>


            <Button variant="contained"  size="large" sx={{  width:200, height:50,color:'white', backgroundColor:'#283593', mt: 3 , mb:2, ml:2 }} onClick={handleOpen_update}> UPDATE EMPLOYEE </Button>

            <Dialog open={open_name_update} onClose={handleClose_update}>
                           <DialogTitle>Enter Employee ID:</DialogTitle>
                           <DialogContent>
                            <TextField 
                                required 
                                margin="dense" 
                                id="outlined-required" 
                                variant="standard"
                                helperText="Employee ID*"
                                style={{ width: "250px"}}
                                onChange={handleId} />
                           </DialogContent>

                           <DialogActions>
                               <Button onClick={handleClose_update}>Cancel</Button>
                               <Button onClick={is_valid_employee}>Search</Button>
                           </DialogActions>
            </Dialog>

            <Dialog open={open_update_select} onClose={() => set_open_update_select(false)}>
                <DialogTitle>Employee Information</DialogTitle>
                <DialogContent>
                           <TextField
                               margin="dense"
                               id="outlined-required"
                               defaultValue={employeename}
                               helperText="Employee name*"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={name_input}
                           />
                           <TextField
                               margin="dense"
                               id="outlined-required"
                               defaultValue={salary}
                               helperText="Salary*"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={salary_input}
                           />
                           <TextField
                               margin="dense"
                               id="outlined-required"
                               defaultValue={email}
                               helperText="Email*"
                               type="text"
                               fullWidth
                               variant="standard"
                               inputRef={email_input}
                           />
                           <TextField
                               margin="dense"
                               id="outlined-required"
                               defaultValue={password}
                               helperText="Password*"
                               type="password"
                               fullWidth
                               variant="standard"
                               inputRef={password_input}
                           />

                            <FormControlLabel 
                                control={<Checkbox defaultChecked={isworking_} value={isworking_} onChange={handleIsworking_}/>} label="Active Employee"  class="manager"/>

                            <FormControlLabel 
                                control={<Checkbox defaultChecked={ismanager} value={ismanager_} onChange={handleManager_}/>} label="Manager"  class="manager"/>
                            
                            <DialogActions>
                                <Button onClick={() => set_open_update_select(false)}>
                                    Cancel </Button>
                                <Button onClick={() => updateEmployee()}>
                                    Update </Button>
                            </DialogActions>
                </DialogContent>
            </Dialog>

            <br />
            <br />
            <h2> Working Employees</h2>
            <br />

            <table class="employee__head">
                <tr class="employee__table">
                    <th>Employee ID</th>
                    <th> Full Name</th>
                    <th> Salary ($/hr)</th>
                    <th> Manager</th>
                </tr>


                { workingEmployees.map( (item, index) =>
                    <tr class="employee__table">
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

            <br />
            <br />
            <h2> Disabled Employees</h2>
            <br />

            <table class="employee__head">
                <tr class="employee__table">
                    <th>Employee ID</th>
                    <th> Full Name</th>
                    <th> Salary ($/hr)</th>
                    <th> Manager</th>
                </tr>


                { notworkingEmployees.map( (item, index) =>
                    <tr class="employee__table">

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
