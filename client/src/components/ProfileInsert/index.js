import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const iconPath = process.env.PUBLIC_URL + '/assets/UserIcons/';

function ProfileInsert(props) { 
  // console.log(props); 
  return (
    <div className="container mainWin">
      <div className="card profileCard">
        <div className="card-header colorHeader text-center">
          <h3 id="userName">User Name: {props.currentUser.userName}</h3> {/*Remove after auth done, just keep props. */}
        </div>
        <div className="card-body colorBody">
          <div className="row">
            <div className="col-sm-6 text-center">
              <img className="img-fluid profilePic" src={iconPath + props.currentUser.icon + ".png"} alt="profilePic" />
            </div>
            <div className="col-sm-6">
              <Link to="/myPlaces"> 
                <h5>Places of interest</h5>
              </Link>
              <br></br>
              <Link to="/myTopics"> 
                <h5>Topics</h5>
              </Link>
              <br></br>
              <div className="mainInfo">
                <h5 className="userInfo">Name: {props.currentUser.name}</h5>
                <br></br>
                <h5 className="userInfo">Email: {props.currentUser.email}</h5>
                <br></br>
                <h5 className="userInfo">Phone: {props.currentUser.phone}</h5>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="general">
            <h5 className="userInfo">General information:</h5>
            <div className="card">
              <textarea id="generalInfo" className="inputColor" readOnly value={props.currentUser.generalInformation}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default ProfileInsert;