import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ProfileInsert(props) {  
  // console.log(props.currentUser, "USER");
  return (
    <div className="container mainWin">
      <div className="card">
        <div className="card-header">
          <p>User Name: {props.currentUser.userName}</p>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm-6">
            <img className="img-fluid" src="https://via.placeholder.com/250" alt="profilePic" />
            </div>
            <div className="col-sm-6">
            <br></br>
            <br></br>
            <Link to="/myPlaces"> 
              My places of interest
            </Link>
            <br></br>
            <br></br>
            <div className="mainInfo">
              <p>Name: {props.currentUser.name}</p>
              <p>Email: {props.currentUser.email}</p>
          </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="general">
            <p>General information:</p>
            <div className="card">
              <textarea id="generalInfo" readOnly>
                {props.currentUser.generalInformation}
              </textarea>
            </div>
          </div>
        </div>
        <div className="card-footer">

        </div>
      </div>
    </div>
  );
}

export default ProfileInsert;