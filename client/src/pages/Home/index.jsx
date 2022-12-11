import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";
import Button from "@mui/material/Button";
import { Link } from 'react-router-dom';

// const conn = "http://localhost:3500/";
const conn = "https://pom-and-honey-bhf5.onrender.com/";

/**
 * This function will display the home page.
 */
const Home = () => {
    const name = "Pom & Honey at Texas A&M MSC";
    const center = useMemo(() => ({ lat:  30.610656, lng:-96.342429 }), []);

    const [clicked, setClicked] = useState(false);

    const containerStyle = {
        width: '400px',
        height: '400px',
        margin: 'auto'

    };

    const handleClick = (val)  => {
        console.log('clicked');
        setClicked(val);
    };

    /**
     * This function will get the Google Map API key
     * @return {Promise} [Google Map API key]
     */
    const getGoogleMapKey = async () => {
        try {
            const response = await fetch(conn + "api/login/getGoogleMapsKey");
            var jsonVals = await response.json();
            localStorage.setItem("googleMapAPIKey", jsonVals);
        } catch (err) {
            console.error(err.message);
        }
    };

    getGoogleMapKey();

    /*
    *   Google translate api call
    */
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false
          },
          "google_translate_element"
        );
    };

    useEffect(() => {
        var addScript = document.createElement("script");
        addScript.setAttribute(
          "src",
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);


    return (
        <div>
        <div class="home__header">
            <div class="home__title">{name}</div>
            <div class="home__subtitle">
                <h2>
                    {" "}
                    We offer one of a kind Mediterranean food for all visitors
                    of Texas A&M University.{" "}
                </h2>
                <br></br>
                <Link to="/order">{" "}
                    <Button variant="contained" sx={{ width:300, height:50, padding: 4, marginleft: 2, marginRight:2, marginBottom:2, color: "black", borderRadius:10, border:1}} style={{backgroundColor: "#f3d03e",}}>Try us today.</Button>
                </Link>
            </div>
        </div>


        <br />

        <table class="center">
            <tr>
            <th>
            <h3>Location</h3>
        <div class= "maps">
        <LoadScript
        googleMapsApiKey={localStorage.getItem("googleMapAPIKey")}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
          class="googlemaps"
          onChildClick={() => handleClick(true)}
        >
           <Marker onclick={() => handleClick(true)} position={{ lat: 30.612255, lng: -96.341286 }} >

          {clicked && (
                <InfoWindow onCloseClick={() => {setClicked(false) }} >
                    <span> Hello.</span>
                </InfoWindow>
                )}

            </Marker>
        </GoogleMap>
      </LoadScript>
      <br/>
      <p><b> 275 Joe Routt Tamu Blvd, College Station, TX 77840</b></p>
      <br/>
      <br/>
      </div>

        </th>
        <th>

        <h3> Hours of Operation</h3>
        <table class="hours">
            <tr>
                <th class="left_align"> Monday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th class="left_align"> Tuesday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th class="left_align"> Wednesday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th class="left_align"> Thursday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th class="left_align"> Friday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th class="left_align"> Saturday</th>
                <th> Closed</th>
            </tr>
            <tr>
                <th class="left_align"> Sunday</th>
                <th> Closed</th>
            </tr>

        </table>

        <br></br>
        <br></br>
        <h3> Contact us</h3>
        <p>Call:  (210) 741-9309</p>
        <p>Email:<a href="mailto:dining@tamu.edu">dining@tamu.edu</a></p>
        <br />
        <p> Leave us feedback!</p>
        <br />


      </th>
      </tr>
      </table>

      <div class="footer">
            <br></br>
            <span class="home__footer_text">
                <p id="google_translate_element">Made by Team 53: Preksha Vaghela, Victoria Pham, Annie Ren, Hexin Hu.</p>
            </span>
      </div>
        </div>
    );
};

export default Home;
