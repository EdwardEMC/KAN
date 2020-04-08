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
  const setPoI = (event) => {
    event.preventDefault();

    const data = {
      title: document.getElementById("title-input").value,
      description: document.getElementById("description-input").value,
      category: document.getElementById("category-input").value,
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
            <div className="text-center">
              <form className="setPoIMarker"> 
                <label htmlFor="title-input"><h5>Title</h5></label>
                <input  id="title-input" className="input form-control" type="text" required placeholder={"Title...."}/>
                <label htmlFor="description-input"><h5>Description</h5></label>
                <textarea className="input form-control" id="description-input" type="text" required placeholder={"Description...."}/>
                <label htmlFor="category-input"><h5>Category</h5></label>
                <select id="category-input" className="input form-control" required>
                  <option>Food</option>
                  <option>Park</option>
                  <option>Shop</option>
                  <option>View Point</option>
                </select>
                <br></br>
                <div className="text-center">
                  <div className="buttons">
                  <button className="btn btn-success" onClick={setPoI}>Place Marker</button> {/*button to save lat/lng to mysql*/}
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