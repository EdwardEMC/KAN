import React from "react";
import io from "socket.io-client";
import "./style.css";

function ChatMessage() {
  
  // const socket = io({query: 'r_var=' +room}); join a specific room
  let socket = io();

  // Can get new rooms from button clicks on profile blocks from chatbox
  // function newRoom(event) {
  //   socket = io({query: 'r_var=' + event.target.value})
  // }

  function sendMessage(event) {
    event.preventDefault(); // prevents page reloading
    socket.emit('chat message',  document.getElementById('m').value);
    document.getElementById('m').value='';
    return false;
  }

  socket.on('chat message', function(msg){
    document.getElementById('messages').append(document.createElement('li').innerHTML = msg);
  });
    
  return ( 
    <div>
      <div className="displayArea">
        <ul id="messages"></ul> {/* Area to display messages */}
      </div>
      <div className="row send">
        <div className="col-lg-12 remove-padding">
          <div className="input-group">
            {/* <textarea type="text" className="form-control" id="send-message" placeholder="Hi......"/>
            <span className="input-group-btn">
              <button className="btn btn-primary" type="submit">Send</button>
            </span> */}
            <form id="form" action="">
              <input id="m" autoComplete="off" /><button onClick={sendMessage}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage;