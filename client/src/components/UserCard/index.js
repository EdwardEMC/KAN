import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function ListView(props) {
  return (
    <div>
      <div className="card"> 
        <div className="card-header text-center colorHeader">
          <strong>Username: </strong>{props.info.userName}
        </div>
        <div className="card-body colorBody">
          <div className="card-text">
            <strong>Description: </strong>
            <br></br>
            {props.info.generalInformation}
          </div>
          <div className="card-text text-right">
            <Link to={"/profile/" + props.info.userName}>
              Profile Link
            </Link>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default ListView;