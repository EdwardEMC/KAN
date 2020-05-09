import React from "react";
import formatTime from "../utils/timeFormat";
import shorten from "../utils/shorten";
import "./style.css";

function ChatBox(props) {

  return ( 
    <div id={props.user.user1 !== props.current ? props.user.user1 : props.user.user2}
    className={"outline pointer side-padding textColor chatBoxColor container " +  props.user.chatName}
    value={props.user.chatName} 
    data-socketid="" 
    data-id={props.user.id} 
    onClick={props.onClick}
    > 
      <div className="row">
        <div className="col-md">
          <div className="text-left pointer chatBoxName">
            <strong>{props.user.user1 !== props.current ? props.user.user1 : props.user.user2}</strong>
          </div>
          <div className="text-right deleteIcon">
            <span value={props.user.chatName} onClick={props.delete} className="deleteChat">X</span>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <div className="card-body remove-padding pointer">
            <div className={"card-text text-left pointer chatBoxMsg " + props.user.chatName} id={props.user.chatName + "lastMsg"}>
              {shorten(props.lastMsg, 30)}
            </div>
            <div className="card-text text-muted text-center pointer chatBoxTime " id={props.user.chatName + "lastTime"}>
              {formatTime(props.lastTime)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatBox;