import React from "react";
import "./style.css";

function ProfileInsert(props) {  
  return (
    <div className="container mainWin">
      <div className="row">
        <div className="col-sm-6">
        <img className="img-fluid" src="https://via.placeholder.com/250" alt="profilePic" />
        </div>
        <div className="col-sm-6">
        <br></br>
        <br></br>
        <p>My places of interest</p>
        <br></br>
        <br></br>
        <div className="mainInfo">
          <p>User Name:</p>
          <p>Email:</p>
          <p>Name:</p>
      </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="general">
        <p>General information:</p>
      </div>
    </div>
  );
}

export default ProfileInsert;