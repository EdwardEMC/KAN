import React, { useState, useReducer, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./style.css";
// import MapContent from "./MapContent";

// https://github.com/lauriharpf/shipwrecks/blob/master/src/main/js/map/Map.js <- fucking legend
//export stuff from Map content

const GoogleMaps = () => { 
  const [center, setCenter] = useState();

  useEffect(() => {
    showPosition()
  }, [])

  function showPosition() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setCenter(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
      })
    }
    else {
      setCenter(
        {
          lat: 25.34,
          lng: 131.04
        });
    }
  }

  let map;
  const onMapLoad = loadedMap => (map = loadedMap);
  const centerChanged = () =>
    map && setCenter({ lat: map.center.lat(), lng: map.center.lng() });

  return (
    <GoogleMap
      id="map"
      zoom={10}
      center={center}
      onLoad={onMapLoad}
      onCenterChanged={centerChanged}
    >
      {/* <MapContent
        shipwrecks={shipwrecks}
        favourites={favourites}
        handleMarkerClick={handleMarkerClick}
      /> */}
    </GoogleMap>
  );
};

export default GoogleMaps;