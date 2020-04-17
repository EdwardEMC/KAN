import React from "react";
import io from "socket.io-client";
import "./style.css";

function ChatMessage(props) {
  // console.log(props, "MESSAGE");

  let room = props.active;

  // const socket = io({query: 'r_var=' +room}); join a specific room
  
  let socket = io({query: 'r_var=' + room});

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