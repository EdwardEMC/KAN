import React from "react";
import API from "../utils/API";
import io from "socket.io-client";
import formatTime from "../utils/timeFormat";
import "./style.css";

//===========================================================================
// Call Area
//===========================================================================
let isAlreadyCalling = false;
let getCalled = false;
let receiver;
let chatName;

// const existingCalls = [];

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

function Messaging() {
  // user.name for logged in username
  // user.id for logged in id
  const user = JSON.parse(localStorage.getItem("User"));

  function unselectUsersFromList() {
    // clear the message area on active user change
    document.getElementById('messages').innerHTML = "";

    const alreadySelectedUser = document.querySelectorAll(
      ".active-user.active-user--selected"
    );

    alreadySelectedUser.forEach(el => {
      el.setAttribute("class", "active-user");
    });
  }

  function createUserItemContainer(data) {
    console.log(data);
    const userContainerEl = document.createElement("div");

    const callButtonEl = document.createElement("button");

    const usernameEl = document.createElement("p");

    userContainerEl.setAttribute("class", "active-user");
    userContainerEl.setAttribute("id", data.socket);
    callButtonEl.setAttribute("class", "call-button btn btn-success");
    callButtonEl.innerHTML = "Call";
    usernameEl.setAttribute("class", "username");
    usernameEl.innerHTML = `Socket: ${data.name}`;

    callButtonEl.addEventListener("click", () => {
      callUser(data.socket);
      // Show video area and call buttons for the caller
      document.getElementById("video-space").classList.toggle("hide");
      document.getElementById("call-buttons").classList.toggle("hide");
    });

    userContainerEl.append(usernameEl, callButtonEl);

    userContainerEl.addEventListener("click", () => {
      unselectUsersFromList();
      userContainerEl.setAttribute("class", "active-user active-user--selected");
      const talkingWithInfo = document.getElementById("talking-with-info");
      talkingWithInfo.setAttribute("value", data.socket);
      // Setting the receiver for chat/video
      receiver = data.socket;
      talkingWithInfo.innerHTML = `Talking with: "Socket: ${data.name}"`;
      
      // api call to load messages
      const usernames = [data.name, user.name];
      // alpha sort the usernames so they are always the same
      chatName = usernames.sort().join("-");

      API.getMessages(chatName)
      .then(function(result) {
        console.log(result, "CHAT MESSAGES");
        displayMessages(result.data);
      })
      .catch(function(err) {
        console.log(err);
      });
    });

    return userContainerEl;
  }

  // function to display results in message area
  function displayMessages(data) {
    // change to display past x messsages and then add a button to view more

    const area = document.getElementById('messages');

    data.messages.map(element => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      
      span.setAttribute("title", formatTime(element.createdAt));
      span.innerHTML = element.message;

      if(element.UserId === data.id) {
        li.setAttribute("class", "current");
        span.setAttribute("class", "sent");
      }
      else {
        li.setAttribute("class", "other");
        span.setAttribute("class", "received");
      }
      li.append(span);
      
      return area.append(li);
    });
  
    let objDiv = document.getElementById("messageScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  };

  async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("call-user", {
      offer,
      to: socketId
    });
  }

  function updateUserList(socketIds) {
    console.log(socketIds, "ONLINE USERS");
    const activeUserContainer = document.getElementById("active-user-container");

    socketIds.forEach(data => {
      const alreadyExistingUser = document.getElementById(data.socket);
      if (!alreadyExistingUser) {
        const userContainerEl = createUserItemContainer(data);

        activeUserContainer.append(userContainerEl);
      }
    });
  }

  // send data throught the connection (username)
  const socket = io.connect({query: {name: user.name}});

  socket.on("update-user-list", ({ users }) => {
    // if on friends list show on chat area
    updateUserList(users);
  });

  socket.on("remove-user", ({ socketId }) => {
    const elToRemove = document.getElementById(socketId);

    if (elToRemove) {
      elToRemove.remove();
    }
  });

  socket.on("call-made", async data => {
    if (getCalled) {
      const confirmed = window.confirm(
        `User "Socket: ${data.socket}" wants to call you. Do accept this call?`
      );

      if (!confirmed) {
        socket.emit("reject-call", {
          from: data.socket
        });

        return;
      }

      // Show video area and call buttons for the receiver
      document.getElementById("video-space").classList.toggle("hide");
      document.getElementById("call-buttons").classList.toggle("hide");
    }

    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    socket.emit("make-answer", {
      answer,
      to: data.socket
    });
    getCalled = true;
  });

  socket.on("answer-made", async data => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );

    if (!isAlreadyCalling) {
      callUser(data.socket);
      isAlreadyCalling = true;
    }
  });

  socket.on("hang-up", () => {
    peerConnection.close(); //change this so signalState is permanently put on closed
    document.getElementById("video-space").classList.toggle("hide");
    document.getElementById("call-buttons").classList.toggle("hide");
    document.getElementById("message-space").classList.remove("hide");
  });

  socket.on("call-rejected", data => {
    alert(`User: "Socket: ${data.socket}" rejected your call.`);
    unselectUsersFromList();
    // Hide video area and call buttons for the caller
    document.getElementById("video-space").classList.toggle("hide");
    document.getElementById("call-buttons").classList.toggle("hide");
  });

  peerConnection.ontrack = function({ streams: [stream] }) {
    const remoteVideo = document.getElementById("remote-video");
    if (remoteVideo) {
      remoteVideo.srcObject = stream;
    }
  };

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

  //===========================================================================
  // Messaging Area
  //===========================================================================
  function messageDisplay(data) {
    console.log(data, "SENT MESSAGES");
    // here
    const area = document.getElementById('messages');

    const li = document.createElement('li');
    const span = document.createElement('span');
    
    span.setAttribute("title", formatTime(data.time));
    span.innerHTML = data.message;

    if(data.fromId === user.id) {
      li.setAttribute("class", "current");
      span.setAttribute("class", "sent");
    }
    else {
      li.setAttribute("class", "other");
      span.setAttribute("class", "received");
    }
    li.append(span);
    
    return area.append(li);
  }

  socket.on("chat-sent", data => {
    //api to update chat history
    console.log("Update chat history");
    console.log(data);

    if(receiver === data.socket) {
      messageDisplay(data.msg);
      let objDiv = document.getElementById("messageScroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });

  function sendMessage(event) {
    event.preventDefault();

    // Put API route to save message to the current chat
    const data = {
      message: document.getElementById('m').value,
      chatname: chatName
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
      time: new Date(),
      socket: socket.id,
      fromName: user.name,
      fromId: user.id,
      to: receiver
    }

    console.log(msg);

    // socket emit
    socket.emit("chat-message", msg);

    messageDisplay(msg);

    let objDiv = document.getElementById("messageScroll");
    objDiv.scrollTop = objDiv.scrollHeight;

    document.getElementById('m').value='';
  }

  //===========================================================================
  // Offline messaging
  //===========================================================================


  //===========================================================================
  // Screen manupulation Area
  //===========================================================================
  function chatarea() {
    document.getElementById("message-space").classList.toggle("hide");
  };

  function videoarea() {
    peerConnection.close(); //change this so signalState is permanently put on closed
    
    let receiver = document.getElementById("talking-with-info").getAttribute("value");

    socket.emit("hang-up", receiver);

    document.getElementById("video-space").classList.toggle("hide");
    document.getElementById("call-buttons").classList.toggle("hide");
    document.getElementById("message-space").classList.remove("hide");
  }

  return (
    <div className="background">
      <header className="header">
        <div className="logo-container justify-content-between">
          <h1 className="logo-text">
            Kan<span className="logo-highlight">- Messenger</span>
          </h1>
          <div id="call-buttons" className="button-container hide">
            <button onClick={videoarea} className="btn btn-danger">Hang Up</button>
            &emsp;
            <button onClick={chatarea} className="btn btn-info">Show Chat</button>
        </div>
        </div>
        <h2 className="talk-info" id="talking-with-info">
          Select active user on the left menu.
        </h2>
      </header>
      <div className="content-container">
        <div className="active-users-panel" id="active-user-container">
          <h3 className="panel-title">Active Users:</h3>
          {/* area for friends/past chats */}
        </div>
        <div className="row interaction-area">
          <div id="video-space" className="col-md hide">
            <div className="video-chat-container">
              <div className="video-container">
                <video autoPlay className="remote-video" id="remote-video"></video>
                <video autoPlay muted className="local-video" id="local-video"></video>
              </div>
            </div>
          </div>
          <div id="message-space" className="col-md">
            <div className="chat-panel">
              <div id="messageScroll" className="display-area">
                <ul id="messages">
                </ul> 
              </div>
              <div className="row send">
                <form className="form-horizontal sendArea" id="form" action="" onSubmit={sendMessage}>
                  <input id="m" autoComplete="off" className="inputColor"/>
                  <button id="sendButton" className="btn btn-primary" type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;