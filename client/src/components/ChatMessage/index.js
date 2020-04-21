import React from "react";
import API from "../utils/API";
import io from "socket.io-client";
import "./style.css";

function ChatMessage(props) {

  let currentUser;

  // api call to load messages
  function messageHistory() {
    API.getMessages(props.id)
    .then(function(result) {
      console.log(result, "RESULT");
      // function to display results in message area
      currentUser = result.data.id;
      displayMessages(result.data)
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  // function to display results in message area
  function displayMessages(data) {
    const area = document.getElementById('messages');
    data.messages.map(element => {
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.innerHTML = element.message
      if(element.UserId === data.id) {
        li.setAttribute("class", "current");
        span.setAttribute("class", "sent");
      }
      else {
        li.setAttribute("class", "other");
        span.setAttribute("class", "received");
      }
      li.append(span);
      area.append(li);

      let objDiv = document.getElementById("messageScroll");
      objDiv.scrollTop = objDiv.scrollHeight;

      return true;
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
  // let socket = io( process.env.PORT || 'localhost:3001', {query: 'r_var=' + x.room});
  let socket = io();

  // register to listen to the x variable
  if(typeof x.roomInternal !== "undefined") {
    x.registerListener(function(val) {
      socket.emit('join', x.room);
      socket.emit('changeRoom');
      if(document.getElementById('messages')) {
        document.getElementById('messages').innerHTML = "";
      }
      messageHistory();
    });
  }
  
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

    let msg = {
      message: document.getElementById('m').value,
      user: currentUser
    }

    // socket emit
    socket.emit('chat message', msg);
    document.getElementById('m').value='';
  }

  socket.on('chat message', function(msg){
    // console.log(msg, "CLIENT");
    let area = document.getElementById('messages');
    let li = document.createElement('li');
    let span = document.createElement('span');
    span.innerHTML = msg.message;
    if(msg.user === currentUser) {
      li.setAttribute("class", "current");
      span.setAttribute("class", "sent");
    }
    else {
      li.setAttribute("class", "other");
      span.setAttribute("class", "received");
    }
    li.append(span);
    area.append(li);

    let objDiv = document.getElementById("messageScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  });
    
  return ( 
    <div>
      <div id="messageScroll" className="displayArea">
        <ul id="messages">
          {/* Area to display messages */}
        </ul> 
      </div>
      <div className="row send remove-padding">
        <form className="form-horizontal sendArea" id="form" action="">
          <input id="m" autoComplete="off" />
          <button id="sendButton" className="btn btn-primary" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessage;