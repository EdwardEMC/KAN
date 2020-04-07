import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ProfileInsert(props) {  
  return (
    <div className="container mainWin">
      <div className="card">
        <div className="card-header colorHeader text-center">
          <h3 id="userName">User Name: {props.currentUser.userName}</h3> {/*Remove after auth done, just keep props. */}
        </div>
        <div className="card-body colorBody">
          <div className="row">
            <div className="col-sm-6 text-center">
              <img className="img-fluid" src="https://via.placeholder.com/250" alt="profilePic" /> {/* src={props.currentUser.profilePic} */}
            </div>
            <div className="col-sm-6">
              <Link to="/myPlaces"> 
                <h5>My places of interest</h5>
              </Link>
              <br></br>
              <Link to="/myTopic"> 
                <h5>My Topics</h5>
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
              <textarea id="generalInfo" readOnly value={props.currentUser.generalInformation}>
              </textarea>
            </div>
          </div>
        </div>
        <div className="card-footer colorFooter">
          {/*Left blank, to be filled in later?*/}
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default ProfileInsert;