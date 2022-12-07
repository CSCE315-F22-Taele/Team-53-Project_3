import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import Stack from "@mui/material/Stack";
//import {BrowserRouter as Router, Link, useNavigate} from 'react-router-dom';

const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

/**
 * Function to display sales report and excess report.
 * @constructor
 */
export default function Manager() {
    const [dates, setDates] = useState({start:-2, end:-2}); // default start
    const [startDate, setStartDate] = useState((0));
    const [endDate, setEndDate] = useState((0));
    const [dates, setDates] = useState({start:-2, end:-2});
    const [salesReport, setSalesReport] = useState([]);
    const [salesShown, setSalesShown] = useState(false); // show text after submit
    const [excessReport, setExcessReport] = useState([]);
    const [excessParams, setExcessParams] = useState({start:0, end:0, threshold:0});
    const [excessShown, setExcessShown] = useState(false); // show text after submit
    const [alignment, setAlignment] = React.useState('left'); // for toggle
    const [toggle, setToggle] = React.useState(true);

    const [display_start, setDisplayStart] = useState("");
    const [display_end, setDisplayEnd] = useState("");

    /**
   * Styling for reports display
   */
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));


   /**
   * Returns an array containing sales report data: data.name, data.sold
   */
    const salesGet = async () => {
        
        try {
            setSalesReport([]);
            const start = (dates.start);
            const end = (dates.end);
            const response = await fetch (conn + `api/manager/getSaleReport/${start}/${end}`, 
            {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = await response.json();
            // for(var key in data){
            //     var reportVals = salesReport;
            //     reportVals.push(data[key]);
            //     setSalesReport(reportVals);
            // }
            
            setSalesReport(data); 
            
        } catch (err) {
    
            console.error(err.message);
        }

    };

    /**
   * Returns an array containing excess report data: data.name, data.amount
   */

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

            setExcessReport(data);
            
        } catch (err) {
    
            console.error(err.message);
        }
    };

    
    /** 
    *   sets start date and end date for sales api call 
    */
    const handleSaleSubmit = event => {

        setSalesReport([]); // clear sales report between each request

        event.preventDefault(); // idk what this does

        if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.startDate.value)) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.endDate.value)) {
                // To display results in proper date format.
                setDisplayStart(event.target.startDate.value);
                setDisplayEnd(event.target.endDate.value);

                const start_date = new Date(event.target.startDate.value);
                const end_date = new Date (event.target.endDate.value);
                if (start_date <= end_date) {
                    var startDate = (event.target.startDate.value.replace('-','').replace('-','') + "000").substring(2);
                    var endDate = (event.target.endDate.value.replace('-','').replace('-','') + "000").substring(2);

                    setDates({start: parseInt(startDate), end: parseInt(endDate)});
                    setSalesShown(true);
                    event.target.reset();
                }
                else {
                    alert("Invalid inputs. Start date must begin before end date.");
                }
            }
            else {
                alert("Invalid end date. Please enter in YYYY-MM-DD format.")
            }
        }
        else {
            setSalesShown(false);
            alert("Invalid start date. Please enter in YYYY-MM-DD format.")
        }
    };


    /** 
    *   sets params for excess api call
    */
    const handleExcessSubmit = event => {
        setExcessReport([]);

        event.preventDefault();

        if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.startDate.value)) {
            if (/^\d{4}-\d{2}-\d{2}$/.test(event.target.endDate.value)) {
                // To display results in proper date format.
                setDisplayStart(event.target.startDate.value);
                setDisplayEnd(event.target.endDate.value);

                const start_date = new Date(event.target.startDate.value);
                const end_date = new Date (event.target.endDate.value);
                if (start_date <= end_date) {
                    var startDate = (event.target.startDate.value.replace('-','').replace('-','') + "000").substring(2);
                    var endDate = (event.target.endDate.value.replace('-','').replace('-','') + "000").substring(2);

                    if (/^\d+$/.test(event.target.thresholdVal.value)) {
                        var thresh = event.target.thresholdVal.value;
                        setExcessParams({start: parseInt(startDate), end: parseInt(endDate), threshold: parseInt(thresh)});
                        setExcessShown(true);
                        event.target.reset();
                    }
                    else {
                        setExcessShown(false);
                        alert("Invalid threshold. Please enter a whole number. (Eg. 10)");
                    }
                    
                }
                else {
                    alert("Invalid inputs. Start date must begin before end date.");
                }
            }
            else {
                alert("Invalid end date. Please enter in YYYY-MM-DD format.")
            }
        }
        else {
            setExcessShown(false);
            alert("Invalid start date. Please enter in YYYY-MM-DD format.")
        }
    }

    // for toggle
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleSalesClick = event => {
        setToggle(true);
        setExcessShown(false);
    }

    const handleExcessClick = event => {
        setToggle(false);
        setSalesShown(false);
    }


    // handling to ensure correct display

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
                    <p>This will display all sales from start to end date.</p>
                    <br />
                    <form onSubmit={handleSaleSubmit}>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date (YYYY-MM-DD)"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date (YYYY-MM-DD)"
                        />

                        <br />
                        <br />

                        <button type="submit">Submit</button>

                        <br />
                        <br />

                        {salesShown && <h5>Sales from {display_start} to {display_end}:</h5>}

                    </form>

                    <br />

                    <div id="salesTable" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 

                    {salesShown && 
                                        
                                        <TableContainer component={Paper} sx={{ maxWidth: 400}} align="center" justifyContent="center">
                                            <Table sx={{ maxWidth: 400}} aria-label="customized table" align="center" justifyContent="center">
                                              <TableHead>
                                                <TableRow>
                                                  <StyledTableCell>Item</StyledTableCell>
                                                  <StyledTableCell align="left">Amount Sold</StyledTableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                                {salesReport.map((row) => (
                                                  <StyledTableRow key={row.name}>
                                                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                                                    <StyledTableCell align="left">{row.sold}</StyledTableCell>
                                                  </StyledTableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </TableContainer>}
                    </div>

                </div>

                : // if toggle=false

                <div class="excessReport">
                    <br />
                    <h1>Excess Report</h1>
                    <p>This will display inventory items used under a specified percentage from start to end date.</p>
                    <br />
                    <form onSubmit={handleExcessSubmit}>
                        <input
                            type="text"
                            id="startDate"
                            name="startDate"
                            placeholder="Start Date (YYYY-MM-DD)"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="endDate"
                            name="endDate"
                            placeholder="End Date (YYYY-MM-DD)"
                        />

                        <br />
                        <br />

                        <input
                            type="text"
                            id="thresholdVal"
                            name="thresholdVal"
                            placeholder="Threshold (Eg. 10)"
                        />

                        <br />
                        <br />

                        <button type="submit">Submit</button>

                        <br />
                        <br />

                    </form>

                    {excessShown && <h5>Excess Report from {display_start} to {display_end} with a {excessParams.threshold}% threshold:</h5>}
                    
                    <br />
                    <div id="excessTable" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}> 
                    {excessShown && 
                        <TableContainer component={Paper} sx={{ maxWidth: 400}} align="center" justifyContent="center">
                        <Table sx={{ maxWidth: 400}} aria-label="customized table" align="center" justifyContent="center">
                            <TableHead>
                            <TableRow>
                                <StyledTableCell>Item</StyledTableCell>
                                <StyledTableCell align="left">Excess Amount</StyledTableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {excessReport.map((row) => (
                                <StyledTableRow key={row.name}>
                                <StyledTableCell align="left">{row.name}</StyledTableCell>
                                <StyledTableCell align="left">{row.amount}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    }
                    
                    </div>


                </div>
            }

        </div>

    );
}

