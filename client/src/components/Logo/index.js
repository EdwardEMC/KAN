import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Logo() {
  return (
    <div className="text-center">
      <Link to="/description" >
        <img id="logoImage" src="" alt="KAN logo"/>
      </Link >
    </div>
  )
}

export default Logo;