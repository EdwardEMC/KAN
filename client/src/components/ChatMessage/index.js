import React, { useState } from "react";
import API from "../utils/API";
import io from "socket.io-client";
import "./style.css";

function ChatMessage(props) {
  const [activeChat, setActiveChat] = useState();

  // not getting called on variable change ????????????????????????????????????????
  // api call to load messages
  function messageHistory() {
    console.log("GETTING HERE")
    API.getMessages(props.id)
    .then(function(result) {
      console.log(result, "RESULT");
      // setActiveChat(result); // might be result.data
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  // detect if the room has changed when user clicks on chat box
  let x = {
    roomInternal: props.active,
    roomListener: function(val) {},
    set room(val) {
      this.roomInternal = val;
      this.roomListener(val);
    },
    get room() {
      return this.roomInternal;
    },
    registerListener: function(listener) {
      this.roomListener = listener;
    }
  }
  
  // socket.io connection with room query
  let socket = io('localhost:3001', {query: 'r_var=' + x.room}); //change to prcoess.env_PORT?

  // register to listen to the x variable
  x.registerListener(function(val) {
    messageHistory();
    socket.emit('changeRoom');
    if(document.getElementById('messages')) {
      document.getElementById('messages').innerHTML = "";
    }
  });

  // reset x.room to the clicked on room
  x.room = props.active;

  // add api put to add the message to the specific chat model
  function sendMessage(event) {
    event.preventDefault();
    // Put API route to save message to the current chat
    const data = {
      message: document.getElementById('m').value,
      id: props.id
    }

    API.sendMessage(data)
    .then(function(result) {
      console.log("success");
    })
    .catch(function(err) {
      console.log(err);
    });

    // socket emit
    socket.emit('chat message', document.getElementById('m').value);
    document.getElementById('m').value='';
    return false;
  }

  socket.on('chat message', function(msg){
    console.log(msg, "CLIENT");
    document.getElementById('messages').append(document.createElement('li').innerHTML = msg);
  });
    
  return ( 
    <div>
      <div className="displayArea">
        {/* Add a map function of activeChat to display history of messages */}
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