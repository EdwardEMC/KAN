import React from "react";
import "./style.css";

function ListView(props) {
  return (
    <div className="card"> 
      <div className="card-header text-center colorHeader">
        <div className="row">
          <div className="col-md-6 d-inline">
            <strong>Category: </strong>{props.info.category}
          </div>
          <div className="col-md-6 d-inline">
            <strong>Title: </strong>{props.info.title}
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="card-text">
          <strong>Description: </strong>
          <br></br>
          {props.info.description}
        </div>
        <div className="card-text text-right">
          <span className="pointer link" onClick={() => console.log("click")}>Link</span>
          &emsp;
          &emsp;
          <span className="pointer delete" value={props.info.title} onClick={props.onClick}>Delete</span>
        </div>
      </div>
      <div className="card-footer card-text text-muted text-center colorFooter">
        {props.info.createdAt}
      </div>
    </div>
  )
}

export default ListView;