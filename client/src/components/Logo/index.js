import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const iconPath = process.env.PUBLIC_URL + '/assets/Logo/';

function Logo(props) {
  return (
    <div className="text-center">
      <Link to="/description" >
        <img className="img-fluid" style={{maxHeight: props.height}} id="logoImage" src={iconPath + "logo.png"} alt="KAN logo"/>
      </Link >
    </div>
  )
}

export default Logo;