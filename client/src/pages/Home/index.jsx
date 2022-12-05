import * as React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import { useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow, withGoogleMap} from "@react-google-maps/api";



const Home = () => {
    const name = "Pom and Honey at Texas A&M MSC";
    const center = useMemo(() => ({ lat:  30.610656, lng:-96.342429 }), []);

    // useEffect( () => {
    //     useLoadScript({googleMapsApiKey: ""});
        
    // });
    
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

    // const Marker = ({text}) => (
    //     <InfoWindow onClick={() => handleClick(false)} alignItems={'center'}>
    //         <Text>{text}</Text>
    //     </InfoWindow>
    // );
    // const markerClicked() => {

    // }
    // var apiKey = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    // console.log(JSON.stringify(apiKey));

    return (
        

        <div>
        <div class="home__header">
            <div class="home__title">{name}</div>
            <div class="home__subtitle">
                <h2>
                    {" "}
                    We offer one of a kind Mediterranean food for all visitors
                    of Texas A&M's Memorial Student Center.{" "}
                </h2>
            </div>
        </div>

        <h2>
            Our Store:
        </h2>
        <br />
        <h5>
            Hours
        </h5>

        <table class="hours">
            <tr>
                <th> Monday-Friday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th>Saturday and Sunday</th>
                <th> CLOSED</th>
            </tr>
            
            
        </table>
        <br />
        <br />
        <h5>
            Location
        </h5>

        <div class= "maps">
        <LoadScript
        googleMapsApiKey="AIzaSyBPOdOPwCGIUGjZ8Wl_SmEpkaL5dA38wF8"
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
      <br/>
      <h5> 275 Joe Routt Tamu Blvd, College Station, TX 77840</h5>
      <br/>
      <br/>
      </div>
        </div>
    );
};

export default Home;
