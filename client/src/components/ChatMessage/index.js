import React from "react";
import "./style.css";

function ChatMessage() {
  return ( 
    <div>
      <div className="displayArea">
          Area to display messages
      </div>
      {/* Area to send messages */}
      <div className="row send">
        <div className="col-lg-12 remove-padding">
          <div className="input-group">
            <textarea type="text" className="form-control" id="send-message" placeholder="Hi......"/>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">Send</button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;