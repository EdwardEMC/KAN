import React from "react";
import API from "../utils/API";
import io from "socket.io-client";
import formatTime from "../utils/timeFormat";
import shorten from "../utils/shorten";
import "./style.css";

let last; 

// let updated = false;

let isAlreadyCalling = false;
let getCalled = false;
let rec;

let isNegotiating = false;
let isCalling = false;

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();
const socket = io();

//===============================================================================================
// Calling functionality
//===============================================================================================
async function callUser(receiver) {
  // // Making sure chrone only triggers negotiation once
  if(!isNegotiating) {
    console.log(peerConnection, "call user");
  
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    
    console.log(offer, "OFFER");

    socket.emit("call-user", {
      offer,
      to: receiver,
      from: socket.id
    });

    isNegotiating = true;
  }
}

socket.on("call-made", async data => {

  if(!isCalling) {
    console.log(peerConnection, "call made");
    try {
      if (!getCalled) {
        const confirmed = window.confirm(
          //later change to the username
          `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
        );

        if (!confirmed) {
          socket.emit("reject-call", {
            from: data.socket
          });
          return;
        }

        // Make the person calling the "focused" chat box


        // Show the video area for the user who answered
        document.getElementById("videoSpace").classList.remove("hide");
        document.getElementById("messageSpace").className += "  hide";
        
        navigator.getUserMedia = ( navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        );

        navigator.getUserMedia(
          { video: true, audio: true },
          stream => {
            const localVideo = document.getElementById("local-video");
            if (localVideo) {
              localVideo.srcObject = stream;
            }

            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
          },
          error => {
            console.warn(error.message);
          }
        );  

        getCalled = true;
      }
    }

    finally { 
      await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      
      console.log(answer, "ANSWER");

      socket.emit("make-answer", {
        answer,
        to: data.socket
      });

      isCalling = true;
    }
  }
});

socket.on("answer-made", async data => {
  console.log(peerConnection, "call answer");
  try {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
    
    if (!isAlreadyCalling) {
      callUser(data.socket);
      isAlreadyCalling = true;
    }
  }
  finally {
    console.log("here"); //makes it here but doesn't activate the stream
    connected();
  }
});

socket.on("call-rejected", data => {
  window.alert(`User: "Socket: ${data.socket}" rejected your call.`);
  isNegotiating = false;
});

// not getting called????????????
function connected() {
  peerConnection.ontrack = function({ streams: [stream] }) {
    console.log(stream, "STREAM");
    const remoteVideo = document.getElementById("remote-video");
    if (remoteVideo) {
      remoteVideo.srcObject = stream;
    }
  };
}

//===============================================================================================
// App
//===============================================================================================
function ChatMessage(props) {
  console.log(props);

  let currentUser;
  let videoArea = false;
  let chat = true;

  let user = {
    name: props.user,
    socket: socket.id
  }

  // if(!updated) {
    socket.emit("socket-update", user);
  //   updated = true;
  // }

  socket.removeListener("chat message");
  socket.removeListener("update-user-list");
  socket.removeListener("remove-user");

  // api call to load messages
  function messageHistory() {
    API.getMessages(props.id)
    .then(function(result) {
      currentUser = result.data.id;
      displayMessages(result.data);
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  // function to display results in message area
  function displayMessages(data) {
    // change to display past x messsages and then add a button to view more
    const area = document.getElementById('messages');
    data.messages.map(element => {
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.innerHTML = element.message;
      span.setAttribute("title", formatTime(element.createdAt));
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

  // register to listen to the x variable
  if(typeof x.roomInternal !== "undefined") {
    x.registerListener(function(val) {
      socket.removeListener("chat message");
      socket.emit('leave', last);
      socket.emit('join', x.room);
      last = x.room;
      if(document.getElementById('messages')) {
        document.getElementById('messages').innerHTML = "";
      }
      messageHistory();

      document.getElementById('messages').scrollIntoView();
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
      user: currentUser,
      time: new Date(),
      room: x.room,
      socket: socket.id //can access id like this anywhere on this page
    }

    // socket emit
    socket.emit('chat message', msg);
    document.getElementById('m').value='';
  }

  socket.on('chat message', function(msg) {
    console.log(msg, "CLIENT");
    console.log(props.user);
    const users = msg.room.split("-");
    if(props.active === msg.room) {

      // set limit for max letters
      document.getElementById(props.active + "lastMsg").innerHTML = shorten(msg.message, 30);

      // format time function
      document.getElementById(props.active + "lastTime").innerHTML = formatTime(msg.time);

      let area = document.getElementById('messages');
      let li = document.createElement('li');
      let span = document.createElement('span');
      span.innerHTML = msg.message;
      span.setAttribute("title", msg.time);
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
      
      return;
    }
    //refresh chat component if someone clicked start chatting button and sent a message
    else if((props.user === users[0] || props.user === users[1]) && !document.getElementById(msg.room + "lastMsg")) {
      props.function();
      // might not work after reload ^ double check this
      // let box = document.getElementsByClassName(msg.room);
      // if(!box[0].classList.contains("bold")) {
      //   box[0].className += " bold";
      // }

      return;
    }
    //loading latest message into chatbox
    else if(props.user === users[0] || props.user === users[1]) {
      // make the text bold
      let box = document.getElementsByClassName(msg.room);
      if(!box[0].classList.contains("bold")) {
        box[0].className += " bold";
      }
      document.getElementById(msg.room + "lastMsg").innerHTML = shorten(msg.message, 30);
      document.getElementById(msg.room + "lastTime").innerHTML = formatTime(msg.time);

      return;
    }
  });

  // only works if someone is only already and someone joins need to update everyone when someone enters????
  // can use for now for testing
  socket.on("socket-update", function(users) {
    // update the chat box with the latest online user, set the data-socketId on the chat box
    console.log(users, "Updating Chatbox");
    // props.user = currently logged in

    if(document.getElementById(users.name)) {
      document.getElementById(users.name).setAttribute("data-socketid", users.socket);
    }
  });

  socket.on("remove-user", function() {
    console.log("user left");
  });

  //Web chat functionality
  function webcall() {
    let receiver = document.getElementsByClassName(props.active);
    
    if(receiver[0] && receiver[0].getAttribute("data-socketid") !== "") {
      if(!videoArea) {
        document.getElementById("videoSpace").classList.remove("hide");
        document.getElementById("messageSpace").className += "  hide";

        navigator.getUserMedia = ( navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia ||
          navigator.msGetUserMedia
        );

        navigator.getUserMedia(
          { video: true, audio: true },
          stream => {
            const localVideo = document.getElementById("local-video");
            if (localVideo) {
              localVideo.srcObject = stream;
            }

            stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
          },
          error => {
            console.warn(error.message);
          }
        );  

        chat = false;
        videoArea = true;
      }
      else {
        document.getElementById("messageSpace").classList.remove("hide");
        document.getElementById("videoSpace").className += " hide";

        chat = true;
        videoArea = false;
      }

      rec = receiver[0].getAttribute("data-socketid");
      callUser(rec);
    }
    else {
      console.log("Please select an active chatbox or online user");
    }
  };

  function hangup() {
    console.log("stop the current web call");
  };

  function chatarea() {
    if(!chat) {
      document.getElementById("messageSpace").classList.toggle("hide");
    }
  };
    
  return ( 
    <div>
      <div className="buttonArea text-center">
        <button className="btn btn-success" onClick={webcall}>Call</button>
        &emsp;
        <button className="btn btn-danger" onClick={hangup}>Hang Up</button>
        &emsp;
        <button className="btn btn-light" onClick={chatarea}>Show Chat</button>  
      </div>
      <div id="messageScroll" className="displayArea row">
        <div id="videoSpace" className="col-md hide">
          <div className="video-chat-container">
            <div className="video-container">
              <video autoPlay className="remote-video" id="remote-video"></video>
              <video autoPlay muted className="local-video" id="local-video"></video>
            </div>
          </div>
        </div>
        <div id="messageSpace" className="col-md">
          <ul id="messages">
          </ul> 
        </div>
      </div>
      <div className="row send remove-padding">
        <form className="form-horizontal sendArea" id="form" action="">
          <input id="m" autoComplete="off" className="inputColor"/>
          <button id="sendButton" className="btn btn-primary" onClick={sendMessage}>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ChatMessage;