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
  let socket = io( process.env.PORT || 'localhost:3001', {query: 'r_var=' + x.room});

  // register to listen to the x variable
  if(typeof x.roomInternal !== "undefined") {
    x.registerListener(function(val) {
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
    return false;
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
  });
    
  return ( 
    <div>
      <div className="displayArea">
        <ul id="messages">
          {/* Area to display messages */}
        </ul> 
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