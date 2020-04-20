import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";
import "./style.css";
import API from "../utils/API";

const iconPath = process.env.PUBLIC_URL + '/assets/HeaderIcons/';

function Header() {

  function logout() {
    // trigger updating online lat/lng values to null
    API.logOut()
    .then(function() {
      // using href instead of history as href will refresh the page and disconnect any sockets automatically
      window.location.href="/";
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  return ( 
    <div id="header">
      <div className="row">
        <div className="col-sm-4 text-center" id="markers">
          <div id="online">
            <Link to="/mapType/setOnline">
              <img className="markerImages" src={iconPath + "online.png"} alt="online marker" />
            </Link>
          </div>
          &emsp;
          &emsp;
          &emsp;
          <div id="poi">
            <Link to="/mapType/setPoI">
              <img className="markerImages" src={iconPath + "poi.png"} alt="place of interest" />
            </Link>
          </div>
        </div>
        <div className="col-sm-4 text-center" id="logo">
          <Logo />
        </div>
        <div className="dropdown menu col-sm-4 text-center">
          <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Main Menu
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <p className="dropdown-item">
              <Link to="/mapType/map"> 
                Map
              </Link>
            </p>
            <p className="dropdown-item">
              <Link to="/forums"> 
                Forums
              </Link>
            </p>
            <p className="dropdown-item">
              <Link to="/chats"> 
                Chats
              </Link>
            </p>
            <p className="dropdown-item">
              <Link to="/profile"> 
                Profile
              </Link>
            </p>
            <p className="dropdown-item">
              <Link to="/settings"> 
                Settings
              </Link>
            </p>
            <p className="dropdown-item">
              <button className="btn btn-warning" onClick={logout}>Log Out</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;