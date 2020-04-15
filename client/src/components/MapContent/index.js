import React, { useState, Fragment, useEffect } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import API from "../utils/API";

// https://codesandbox.io/s/react-google-maps-api-ir5ks marker code

const poiPath = process.env.PUBLIC_URL + '/assets/CategoryIcons/';
const userPath = process.env.PUBLIC_URL + '/assets/UserIcons/';

const MapContent = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [markerMap, setMarkerMap] = useState({});
  const [myPlaces, setMyPlaces] = useState();

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
    // Required so clicking a 2nd marker works as expected
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
  
  if(myPlaces) {
    return (
      <Fragment>
        <MarkerClusterer >
          {clusterer => {
            return (
              myPlaces.map(place => {
                // saved for use with the list to show certain icons
                if(place.userName) {
                  let iconUser = userPath + "online.png";
                  // for custom icons when implemented
                  // let iconUser = userPath + place.icon;
                  return (
                    <Marker
                      key={place.lat}
                      position={{lat: parseFloat(place.lat), lng: parseFloat(place.lng)}}
                      onLoad={marker => markerLoadHandler(marker, place)}
                      onClick={event => markerClickHandler(event, place)}
                      clusterer={clusterer}
                      // Marker loads user icons
                      icon={iconUser}
                    /> 
                  )
                }
                else {
                  let iconPoI = poiPath + place.category + ".png";
                  return (
                    <Marker
                      key={place.lat}
                      position={{lat: parseFloat(place.lat), lng: parseFloat(place.lng)}}
                      onLoad={marker => markerLoadHandler(marker, place)}
                      onClick={event => markerClickHandler(event, place)}
                      clusterer={clusterer}
                      // Marker loads category icons
                      icon={iconPoI}
                    /> 
                  )
                }
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
              <h3>{selectedPlace.title || selectedPlace.userName}</h3>
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