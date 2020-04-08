import React, { Component } from 'react'
import { LoadScript } from '@react-google-maps/api'
import GoogleMaps from "../components/GoogleMap";
import "./style.css";

class MapComp extends Component {
  render() {
     return (
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyCPo2a9WyXNAIwuMBgu8AXuCatBsc17TSo"
      >
        <GoogleMaps />
      </LoadScript>
     )
  }
}

export default MapComp