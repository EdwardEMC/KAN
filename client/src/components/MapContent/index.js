import React, { useState, Fragment, useEffect } from "react";
import { Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import API from "../utils/API";

// https://codesandbox.io/s/react-google-maps-api-ir5ks marker code

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

  // Static markers for testing
  // const myPlaces = [
  //   // add another field "icon" or "iconPath" to determine it PoI or Online marker
  //   { id: "place1", pos: { lat: -34.89, lng: 138.58 } },
  //   { id: "place2", pos: { lat: -34.80, lng: 138.57 } },
  //   { id: "place3", pos: { lat: -34.87, lng: 138.51 } }
  // ];

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
              myPlaces.map(place => (
                <Marker
                  key={place.lat}
                  position={{lat: parseFloat(place.lat), lng: parseFloat(place.lng)}}
                  onLoad={marker => markerLoadHandler(marker, place)}
                  onClick={event => markerClickHandler(event, place)}
                  clusterer={clusterer}
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
              ))
            );
          }}
        </MarkerClusterer>
        {infoOpen && selectedPlace && (
          <InfoWindow
            anchor={markerMap[selectedPlace.lat]}
            onCloseClick={() => setInfoOpen(false)}
          >
            <div>
              <h3>{selectedPlace.id}</h3> {/*this will be the userName or PoI title need to work out how to swtich between them*/}
              <div>This is your info window content</div> {/*this will be the link to user profile or description of PoI*/}
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