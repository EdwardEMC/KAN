import React, { useState, Fragment, useEffect } from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import API from "../utils/API";

const MapPoI = () => {
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
  const setPoI = (event) => {
    event.preventDefault();

    const data = {
      title: document.getElementById("title-input").value,
      description: document.getElementById("description-input").value,
      category: document.getElementById("category-input").value.replace(/ +/g, ""),
      lat: online.pos.lat,
      lng: online.pos.lng
    }

    API.setPoIMarker(data)
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
          <div className="chatColor">
            <div className="text-center">
              <form className="setPoIMarker"> 
                <label htmlFor="title-input"><h5><span className="onlineTitle">Title</span></h5></label>
                <input  id="title-input" className="input form-control" type="text" required placeholder={"Title...."}/>
                <label htmlFor="description-input"><h5><span className="onlineTitle">Description</span></h5></label>
                <textarea className="input form-control" id="description-input" type="text" required placeholder={"Description...."}/>
                <label htmlFor="category-input"><h5><span className="onlineTitle">Category</span></h5></label>
                <select id="category-input" className="input form-control" required>
                  <option>Food</option>
                  <option>Park</option>
                  <option>Shop</option>
                  <option>View Point</option>
                </select>
                <br></br>
                <div className="text-center">
                  <div className="buttons">
                  <button className="btn btn-light" onClick={setPoI}>Place Marker</button>
                  </div>  
                </div>
                <br></br>
              </form>
            </div>
          </div>
        </InfoWindow>
      )}
    </Fragment>
  );
}

export default MapPoI;