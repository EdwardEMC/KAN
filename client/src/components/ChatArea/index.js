import React from "react";
import ChatBox from "../ChatBox";
import ChatMessage from "../ChatMessage";
import "./style.css";

function ChatArea() {
  return ( 
    <div>
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="card chatArea">
            <div className="card-header text-center">
              CURRENT ACTIVE CHATS
            </div>
            <div className="card-body">
              {/* map the chat boxes from api call */}
              <ChatBox />
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card chatArea">
            <div className="card-body remove-padding ">
                {/* component to display the messages */}
                {/* click on the chat box will trigger api call and show all messages between the two users */}
                <ChatMessage />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea;