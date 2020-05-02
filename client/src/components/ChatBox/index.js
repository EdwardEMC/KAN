import React from "react";
import "./style.css";

function ChatBox(props) {
  return ( 
    <div className="row outline pointer side-padding textColor chatBoxColor" value={props.user.chatName} data-id={props.user.id} onClick={props.onClick}> 
      <div className="card-title text-center pointer">
        <strong>{props.user.user1 !== props.current ? props.user.user1 : props.user.user2}</strong>
      </div>
      <div className="card-body remove-padding pointer">
        <div className="text-right">
          <span value={props.user.chatName} onClick={props.delete} className="deleteChat">X</span>
        </div>
        <div className={"card-text text-center pointer " + props.user.chatName} id={props.user.chatName + "lastMsg"}>
          {props.lastMsg}
        </div>
        <div className="card-text text-muted text-center pointer" id={props.user.chatName + "lastTime"}>
          {props.lastTime}
        </div>
      </div>
    </div>
  )
}

export default ChatBox;