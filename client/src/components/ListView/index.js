import React from "react";
// import { Link } from "react-router-dom";
import "./style.css";

function ListView(props) {
  console.log(props);
  return (
    <div className="outline card"> 
      <div className="card-header row text-center">
        {/* {props.user.user1 !== props.current ? props.user.user1 : props.user.user2} */}
        <div className="col-md-6 d-inline">
          Category: {props.info.category}
        </div>
        <div className="col-md-6 d-inline">
          Title: {props.info.title}
        </div>
      </div>
      <div className="card-body remove-padding">
        <div className="card-text">
          <br></br>
          Description: 
          <br></br>
          {props.info.description}
        </div>
        <br></br>
      </div>
      <div className="card-footer card-text text-muted text-center">
        {props.info.createdAt}
      </div>
    </div>
  )
}

export default ListView;