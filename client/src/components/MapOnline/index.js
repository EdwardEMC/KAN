import React, { useState, Fragment, useEffect } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import API from "../utils/API";

const MapOnline = () => {
  let history = useHistory();

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [markerMap, setMarkerMap] = useState({});
  const [user, setUser] = useState()

  useEffect(() => {
    userPosition()
  }, [])

  const userPosition = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setUser(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
      })
    }
    else {
      setUser(
        {
          lat: 25.34,
          lng: 131.04
        });
    }
  }

  const markerClickHandler = (event, online) => {
    setSelectedPlace(online);
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  }

  const online = {
    // add another field "icon" or "iconPath" to determine it PoI or Online marker
    id: "OnlineMarker", 
    pos: user
  };

  const markerLoadHandler = (marker, online) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [online.id]: marker };
    });
  };

  // Onclick function for button
  const setOnline = () => {
    const data = {
      lat: online.pos.lat,
      lng: online.pos.lng
    }

    API.setOnlineMarker(data)
    .then(function(result) {
      history.push('/mapType/map')
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }
  
  return (
    <Fragment>
      <Marker
        key={online.id}
        position={online.pos}
        onLoad={marker => markerLoadHandler(marker, online)}
        onClick={event => markerClickHandler(event, online)}
        draggable={true}
        onDragEnd={event => setUser({lat: event.latLng.lat(), lng: event.latLng.lng()})}
        // Not required, but if you want a custom icon:
        // When marker loads switch between online and poi marker icons
        // icon={{
        //   path:
        //     "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
        //   fillColor: "#0000ff",
        //   fillOpacity: 1.0,
        //   strokeWeight: 0, 
        //   scale: 1.25
        // }}
      />
      {infoOpen && selectedPlace && (
        <InfoWindow
          anchor={markerMap[selectedPlace.id]}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div>
            <h3 className="text-center">Set Marker Here?</h3> {/*this will be the userName or PoI title*/}
            <div className="text-center">
              <button className="btn btn-success" onClick={setOnline}>Go Online</button> {/*button to save lat/lng to mysql*/}
            </div>
            {/* <div>{online.pos.lat},{online.pos.lng}</div>  */}
          </div>
        </InfoWindow>
      )}
    </Fragment>
  );
}

export default MapOnline;