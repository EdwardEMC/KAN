import React from "react";
import "./style.css";

function ChatBox() {
  return ( 
    <div className="row outline">
      <div className="col-md-3 remove-padding d-flex justify-content-middle">
        <img src="..." alt="profile" id="profilePic"></img>
      </div>
      <div className="col-md-9">
        <div className="card-title text-center">
          Username
        </div>
        <div className="card-body remove-padding">
          <div className="card-text text-center">
            Last message sent
          </div>
          <div className="card-text text-muted text-center">
            Time of last message
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox;