import React from "react";
import formatTime from "../utils/timeFormat";
import "./style.css";

function ChatBox(props) {
  function shorten(message) {
    let charAmt = message.split("");
    if(charAmt.length > 30) {
      let shrtMessage = charAmt.slice(0, 30);
      shrtMessage.push("...");
      shrtMessage.join();
      return shrtMessage;
    }
    else {
      return message;
    }
  }

  return ( 
    <div className="outline pointer side-padding textColor chatBoxColor container" value={props.user.chatName} data-id={props.user.id} onClick={props.onClick}> 
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
              {shorten(props.lastMsg)}
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