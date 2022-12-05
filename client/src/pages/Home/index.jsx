import * as React from "react";
import { useState } from "react";
import "./index.css";
import { useMemo } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow} from "@react-google-maps/api";

const conn = "http://localhost:3500/";
// const conn = "https://pom-and-honey-bhf5.onrender.com/";

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

        
        <br />

        <table class="center">
            <tr>
            <th>
            <h5>
            Location
        </h5>

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
      <h6><b> 275 Joe Routt Tamu Blvd, College Station, TX 77840</b></h6>
      <br/>
      <br/>
      </div>
        
        </th>
        <th>

        <h5> Hours of Operation</h5>
        <table class="hours">
            <tr>
                <th> Monday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th> Tuesday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th> Wednesday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th> Thursday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th> Friday</th>
                <th> 10 AM - 3 PM</th>
            </tr>
            <tr>
                <th> Saturday</th>
                <th> Closed</th>
            </tr>
            <tr>
                <th> Sunday</th>
                <th> Closed</th>
            </tr>
            
        </table>
        
        <br></br>
        <br></br>
        <h5> Contact us</h5>
        <p>Call:  (210) 741-9309</p>
        <p>Email:<a href="mailto:dining@tamu.edu">dining@tamu.edu</a></p>
        <br />
        <h6> Leave us feedback!</h6>
        <br />


      </th>
      </tr>
      </table>
        </div>
    );
};

export default Home;
