import React from "react";
import "./style.css";

function Header() {
  return ( 
    <div id="header">
      <div className="row justify-content-center">
        <p id="copyname">Edward Coad <span id="copyright">&copy;2019</span></p>
      </div>
    </div>
  )
}

export default Header;