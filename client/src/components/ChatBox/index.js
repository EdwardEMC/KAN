import React from "react";
import "./style.css";

function ChatBox(props) {
  return ( 
    <div className="row outline pointer" value={props.user.chatName} onClick={props.onClick}> 
      {/* <div className="col-md-3 remove-padding d-flex justify-content-middle">
        <img src="..." alt="profile" id="profilePic"></img>
      </div>
      <div className="col-md-9"> */}
        <div className="card-title text-center pointer">
          {props.user.user1 !== props.current ? props.user.user1 : props.user.user2}
        </div>
        <div className="card-body remove-padding pointer">
          <div className="card-text text-center pointer">
            Last message sent
          </div>
          <div className="card-text text-muted text-center pointer">
            Time of last message
          </div>
        </div>
      {/* </div> */}
    </div>
  )
}

export default ChatBox;