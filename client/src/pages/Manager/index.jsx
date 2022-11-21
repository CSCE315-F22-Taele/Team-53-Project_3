import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
// import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { indigo } from "@mui/material/colors";
import Stack from '@mui/material/Stack';
import e from "cors";
import TextField from '@mui/material/TextField';
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';

export default function Manager(props) {
    
    const [startDate, setStartDate] = useState((0));
    const [endDate, setEndDate] = useState((0));
    const [dates, setDates] = useState({start:-2, end:-2});
    const [salesReport, setSalesReport] = useState([]);
    const [salesShown, setSalesShown] = useState(false);

    const conn = "http://localhost:3500/"; // for testing

    const salesGet = async () => {
        
        try {
            setSalesReport([]);
            const start = JSON.stringify(dates.start);
            const end = JSON.stringify(dates.end);
            console.log("start", start);
            console.log("end", end);
            const response = await fetch (conn + "api/manager/getSaleReport", 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    params: {start, end}
                }
            );

            const data = await response.json();
            console.log(data);
            
            for(var key in data){
                var reportCustom = [];
                // reportCustom.push(data[key]);
                var reportVals = salesReport;
                reportVals.push(data[key]);
                setSalesReport(reportVals);
            }

            console.log("SALESREPORT");
            console.log(salesReport);
           
            
        } catch (err) {
    
            console.error(err.message);
        }

    };

    useEffect( () => {
        if (dates.start > 0 && dates.end > 0){
            salesGet();
        }
        
        // setSalesShown(true);
    }, [dates])

    // set start date and end date from text entry
    const handleSubmit = event => {
        event.preventDefault(); // idk what this does

        const startDate = event.target.startDate.value;
        const endDate = event.target.endDate.value;

        setDates({start: startDate, end: endDate});
        console.log("start", startDate);
        console.log("end", endDate);

        event.target.reset(); // idk what this does
    }

    return (

        <div>

            
            {/* <div class="options">
                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                    Excess Report</Button>

                    <Button  variant="contained" sx={{ width:200, height:150, padding: 4, marginleft: 2, marginRight:2, marginBottom:2 }}>
                    Inventory Report</Button>

            </div> */}

            <h1>Sales Report</h1>

            <div class="salesReport">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="startDate"
                        name="startDate"
                        placeholder="Start Date"
                    />

                    <br />
                    <br />

                    <input
                        type="text"
                        id="endDate"
                        name="endDate"
                        placeholder="End Date"
                    />

                    <br />
                    <br />

                    <button type="submit">Submit</button>

                    <br />
                    <br />
                </form>
{/* 
                { salesShown ( */}

                {/* )} */}

                <h5>Sales from {dates.start} to {dates.end}:</h5>
                    {salesReport.map( (item) =>
                        <li> {item.name}</li>
                    )}

            </div>

        </div>

    );
}

