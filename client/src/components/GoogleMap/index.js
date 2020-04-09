import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";
import MapContent from "../MapContent";
import MapOnline from "../MapOnline";
import MapPoI from "../MapPoI";
import "./style.css";

// https://github.com/lauriharpf/shipwrecks/blob/master/src/main/js/map/Map.js <- fucking legend

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
            lng: position.coords.longitude,
            zoom: 10
          });
      }, 
      setCenter(
        {
          lat: -33.8688,
          lng: 151.2093,
          zoom: 3
        })
      )
    }
    // incase the browser doesn't support navigator
    else {
      setCenter(
        {
          lat: -33.8688,
          lng: 151.2093,
        });
    }
  }

  let map;
  const onMapLoad = loadedMap => (map = loadedMap);
  const centerChanged = () =>
    map && setCenter({ lat: map.center.lat(), lng: map.center.lng() });

  // Determine which map content to load
  const mapType = window.location.href.split("/mapType/")
 
  if(mapType[1] === "map") {
    return (
      <GoogleMap
        id="map"
        zoom={10}
        center={center}
        onLoad={onMapLoad}
        onCenterChanged={centerChanged}
      >
        <MapContent
          // shipwrecks={shipwrecks}
          // favourites={favourites}
          // handleMarkerClick={handleMarkerClick}
        />
      </GoogleMap>
    );
  }
  else if(mapType[1] === "setOnline") {
    return (
      <GoogleMap
        id="map"
        zoom={10}
        center={center}
        onLoad={onMapLoad}
        onCenterChanged={centerChanged}
      >
        <MapOnline />
      </GoogleMap>
    );
  }
  else if(mapType[1] === "setPoI") {
    return (
      <GoogleMap
        id="map"
        zoom={10}
        center={center}
        onLoad={onMapLoad}
        onCenterChanged={centerChanged}
      >
        <MapPoI />
      </GoogleMap>
    );
  }
};

export default GoogleMaps;