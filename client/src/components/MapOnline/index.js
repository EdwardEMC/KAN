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
            lng: position.coords.longitude,
            zoom: 10
          });
      }, 
      setUser(
        {
          lat: -33.8688,
          lng: 151.2093,
          zoom: 3
        })
      )
    }
    // incase the browser doesn't support navigator
    else {
      setUser(
        {
          lat: -33.8688,
          lng: 151.2093,
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
        // icon={}
      />
      {infoOpen && selectedPlace && (
        <InfoWindow
          anchor={markerMap[selectedPlace.id]}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div>
            <h3 className="text-center">Set Marker Here?</h3>
            <div className="text-center">
              <button className="btn btn-success" onClick={setOnline}>Go Online</button>
            </div>
          </div>
        </InfoWindow>
      )}
    </Fragment>
  );
}

export default MapOnline;