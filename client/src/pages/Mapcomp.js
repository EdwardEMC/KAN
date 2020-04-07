import React, { Component } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import "./style.css";

const center = {
  lat: 0,
  lng: -180,
}

class MapComp extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCPo2a9WyXNAIwuMBgu8AXuCatBsc17TSo"
      >
        {/* https://github.com/JustFly1984/react-google-maps-api/blob/master/packages/react-google-maps-api-gatsby-example/src/components/google-maps.js  look at this, almost understand it, need to create a component that exports GoogleMap and insert below*/}
        <GoogleMap
          id='map'
          onLoad={map => {
            const bounds = new window.google.maps.LatLngBounds();
            map.fitBounds(bounds);
          }}
          center={center}
        >
          ...Your map components
        </GoogleMap>
      </LoadScript>
     )
  }
}

export default MapComp