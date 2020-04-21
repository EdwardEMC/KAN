import React, { useState, Fragment, useEffect } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { Link } from "react-router-dom";
import API from "../utils/API";

// https://codesandbox.io/s/react-google-maps-api-ir5ks marker code

const poiPath = process.env.PUBLIC_URL + '/assets/CategoryIcons/';
const userPath = process.env.PUBLIC_URL + '/assets/UserIcons/';

const MapContent = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [markerMap, setMarkerMap] = useState({});
  const [myPlaces, setMyPlaces] = useState();

  // variable to hold which group the user wants to view (users, PoI, etc..)
  let iconSelection = props.value; 

  useEffect(() => {
    getMarkers()
  }, [])

  const getMarkers = () => {
    API.getAllMarkers()
    .then(function(result) {
      setMyPlaces(result.data)
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);
    // Required so clicking a 2nd marker closes the first infobox
    if (infoOpen) {
      setInfoOpen(false);
    }
    setInfoOpen(true);
  }

  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.lat]: marker }; // not the best fix but staying for now (lat instead of id)
    });
  };

  // function to load user markers
  const displayMarkers = (place, clusterer, icon) => {
    return (
      <Marker
        key={place.lat}
        position={{lat: parseFloat(place.lat), lng: parseFloat(place.lng)}}
        onLoad={marker => markerLoadHandler(marker, place)}
        onClick={event => markerClickHandler(event, place)}
        clusterer={clusterer}
        icon={icon}
      /> 
    )
  }
  
  if(myPlaces) {
    return (
      <Fragment>
        <MarkerClusterer >
          {clusterer => {
            return (
              myPlaces.map(place => {
                switch(iconSelection) {
                  case "all":
                    if(place.userName) {
                      let icon = userPath + "online.png";
                      // for custom icons when implemented
                      // let iconUser = userPath + place.icon;
                      return displayMarkers(place, clusterer, icon);
                    }
                    else {
                      let icon = poiPath + place.category + ".png";
                      return displayMarkers(place, clusterer, icon);
                    }

                  case "users":
                    if(place.userName) {
                      let icon = userPath + "online.png";
                    // for custom icons when implemented
                    // let iconUser = userPath + place.icon;
                      return displayMarkers(place, clusterer, icon);
                    }
                    break;

                  case "poi":
                    if(place.category) {
                      let icon = poiPath + place.category + ".png";
                      return displayMarkers(place, clusterer, icon);
                    }
                    break;

                  case iconSelection:
                    if(place.category === iconSelection) {
                      let icon = poiPath + place.category + ".png";
                      return displayMarkers(place, clusterer, icon);
                    }
                    break;

                  default:
                    return false;
                }
                return true;
              })
            );
          }}
        </MarkerClusterer>
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.lat]} /*Find a unique number as lat could repeat*/
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              {selectedPlace.userName ? <Link to={"/profile/" + selectedPlace.userName}>Go To Profile</Link> : null}
              <h4>{selectedPlace.title || selectedPlace.userName}</h4>
              <div>{selectedPlace.description || selectedPlace.generalInformation}</div>
            </div>
          </InfoWindow>
        )}
      </Fragment>
    );
  }
  else {
    return <Marker />
  }
}

export default MapContent;