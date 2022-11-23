import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import Stack from "@mui/material/Stack";
import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';

export default function Manager(props) {

    const [dates, setDates] = useState({start:-2, end:-2}); // default start
    const [salesReport, setSalesReport] = useState([]);
    const [salesShown, setSalesShown] = useState(false); // show text after submit
    const [excessReport, setExcessReport] = useState([]);
    const [excessParams, setExcessParams] = useState({start:0, end:0, threshold:0});
    const [excessShown, setExcessShown] = useState(false); // show text after submit
    const [alignment, setAlignment] = React.useState('left'); // for toggle
    const [toggle, setToggle] = React.useState(true);
    

    const conn = "http://localhost:3500/"; // for testing

    const salesGet = async () => {
        
        try {
            setSalesReport([]);
            const start = (dates.start);
            const end = (dates.end);
            console.log("start", start);
            console.log("end", end);
            const response = await fetch (conn + `api/manager/getSaleReport/${start}/${end}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            console.log(data);
            
            // for(var key in data){
            //     var reportVals = salesReport;
            //     reportVals.push(data[key]);
            //     setSalesReport(reportVals);
            // }
            
            setSalesReport(data);
            console.log("SALESREPORT");
            console.log(salesReport);
           
            
        } catch (err) {
    
            console.error(err.message);
        }

    };

    const excessGet = async () => {
        try {
            setExcessReport([]);
            const start = (excessParams.start);
            const end = (excessParams.end);
            const threshold = (excessParams.threshold);

            const response = await fetch (conn + `api/manager/getExcessReport/${start}/${end}/${threshold}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            console.log(data);

            setExcessReport(data);
            
        } catch (err) {
    
            console.error(err.message);
        }
    };

    // set start date and end date from text entry
    const handleSaleSubmit = event => {

        setSalesReport([]); // clear sales report between each request

        event.preventDefault(); // idk what this does

        const startDate = event.target.startDate.value;
        const endDate = event.target.endDate.value;

        setDates({start: parseInt(startDate), end: parseInt(endDate)});
        console.log("start", startDate);
        console.log("end", endDate);

        setSalesShown(true);

        event.target.reset(); // idk what this does
    };

    // set parameters for excess report
    const handleExcessSubmit = event => {
        setExcessReport([]);

        event.preventDefault();

        const startDate = event.target.startDate.value;
        const endDate = event.target.endDate.value;
        const thresh = event.target.thresholdVal.value;

        setExcessParams({start: parseInt(startDate), end: parseInt(endDate), threshold: parseInt(thresh)});
        setExcessShown(true);

        event.target.reset(); // idk what this does
    }

    // for toggle
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleSalesClick = event => {
        setToggle(true);
    }

    const handleExcessClick = event => {
        setToggle(false);
    }


    useEffect( () => {
        if (dates.start > 0 && dates.end > 0){
            salesGet();
        }
        
        if (excessParams.start > 0){
            excessGet();
        }
        
    }, [dates, excessParams])

    return (

        <div>

            <div class="options">
                <ToggleButtonGroup color="primary" value={alignment} exclusiveonchange={handleAlignment}>
                    <ToggleButton onClick={(handleSalesClick)}>Sales Report</ToggleButton>
                    <ToggleButton onClick={(handleExcessClick)}>Excess Report</ToggleButton>
                </ToggleButtonGroup>
            </div>

            {
                toggle? // if toggle=true display sales report

                <div class="salesReport">
                    <br />
                    <h1>Sales Report</h1>
                    <br />
                    <form onSubmit={handleSaleSubmit}>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date: YYMMDD000"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date: YYMMDD000"
                        />

                        <br />
                        <br />

                        <button type="submit">Submit</button>

                        <br />
                        <br />

                        {salesShown && <h5>Sales from {dates.start} to {dates.end}:</h5>}

                    </form>

                    {salesReport.map( (item) =>
                        <li> {item.name} : {item.sold}</li>
                    )}

                </div>

                : // if toggle=false

                <div class="excessReport">
                    <br />
                    <h1>Excess Report</h1>
                    <br />
                    <form onSubmit={handleExcessSubmit}>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date: YYMMDD000"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date: YYMMDD000"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="thresholdVal"
                            name="thresholdVal"
                            placeholder="Threshold "
                        />

                        <br />
                        <br />

                        <button type="submit">Submit</button>

                        <br />
                        <br />

                    </form>

                    {excessShown && <h5>Excess Report from {excessParams.start} to {excessParams.end} with {excessParams.threshold} threshold:</h5>}

                    {excessReport.map( (item) =>
                        <li> {item.name} : {item.amount}</li>
                    )}

                </div>
            }

        </div>

    );
}

