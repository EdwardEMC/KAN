import React from "react";
import API from "../utils/API";
import io from "socket.io-client";
import formatTime from "../utils/timeFormat";
import "./style.css";

let isAlreadyCalling = false;
let getCalled = false;
let chatName;
let friends = [];

// Array to hold currently online friends (relates to the offline/online icons)
let onlineFriends = [];

let socket;
let connected = false;

const { RTCPeerConnection, RTCSessionDescription } = window;

const peerConnection = new RTCPeerConnection();

function Messaging() {
  //===========================================================================
  // Friends Areas
  //===========================================================================

  // Sometimes not called until after the update-user-list causing the newly connected socket to show in active users in stead of friends
  
  API.getChats()
    .then(function(result) {
      // console.log(result, "CURRENT CHATS");
      createFriendItemContainer(result.data.chats);
      // Populate the friends array
      result.data.chats.map(element => {
        let username = user.name !== element.user1 ? element.user1 : element.user2;
        return friends.push(username);
      });  
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
  });

  function createFriendItemContainer(data) {
    // console.log(data, "FRIEND");
    data.forEach(element => {
      // console.log(element);
      const name = user.name !== element.user1 ? element.user1 : element.user2;

      const userContainerEl = document.createElement("div");
      const usernameEl = document.createElement("p");

      userContainerEl.setAttribute("class", "active-user ");
      userContainerEl.setAttribute("id", name);
      usernameEl.setAttribute("class", "username");
      usernameEl.innerHTML = `Socket: ${name}`;

      const offlineEl = document.createElement("button");
      const callButtonEl = document.createElement("button");

      // If online show call button
      let friend = onlineFriends.find(element => element.name === name);

      // console.log(friend, "FRIEND ONLINE");

      if(typeof friend !== "undefined" && friend.name === name) {
        userContainerEl.setAttribute("value", friend.socket);
        userContainerEl.classList.add(friend.socket);

        offlineEl.setAttribute("id", name + "offline");
        offlineEl.setAttribute("class", "call-button btn btn-danger hide");
        offlineEl.innerHTML = "Offline";

        callButtonEl.setAttribute("id", name + "online");
        callButtonEl.setAttribute("class", "call-button btn btn-success");
        callButtonEl.innerHTML = "Call";
      } // If offline show offline icon
      else {
        offlineEl.setAttribute("id", name + "offline");
        offlineEl.setAttribute("class", "call-button btn btn-danger");
        offlineEl.innerHTML = "Offline";
  
        callButtonEl.setAttribute("id", name + "online");
        callButtonEl.setAttribute("class", "call-button btn btn-success hide");
        callButtonEl.innerHTML = "Call";  
      }

      callButtonEl.addEventListener("click", () => {
        callUser(document.getElementById(name).getAttribute("value"));
        // callUser(data.socket);
        // Show video area and call buttons for the caller
        document.getElementById("video-space").classList.toggle("hide");
        document.getElementById("call-buttons").classList.toggle("hide");
      });

      userContainerEl.append(usernameEl, callButtonEl, offlineEl);

      userContainerEl.addEventListener("click", () => {
        unselectUsersFromList();
        userContainerEl.setAttribute("class", "active-user active-user--selected");
        const talkingWithInfo = document.getElementById("talking-with-info");
        talkingWithInfo.setAttribute("value", name);
        // Setting the receiver for chat/video
        talkingWithInfo.innerHTML = `Talking with: "Socket: ${name}"`;
        
        // Alpha sort the usernames so they are always the same
        const usernames = [name, user.name];
        chatName = usernames.sort().join("-");

        API.getMessages(chatName)
        .then(function(result) {
          // console.log(result, "CHAT MESSAGES");
          displayMessages(result.data);
        })
        .catch(function(err) {
          console.log(err);
        });
      });

      return document.getElementById("friend-user-container").append(userContainerEl);
    });
  }

  // console.log(onlineFriends, "ONLINE FRIEND ARRAY");

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
      // receiver = data.socket;
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

  //===========================================================================
  // Calling Area
  //===========================================================================

  async function callUser(socketId) {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket.emit("call-user", {
      offer,
      to: socketId
    });
  }

  function updateUserList(socketIds) {
    // console.log(socketIds, "ONLINE USERS");
    const activeUserContainer = document.getElementById("active-user-container");

    let friendList = [];

    //Making sure the socket doesn't populate the active list if it is a friend
    API.getChats()
    .then(function(result) {
      result.data.chats.map(element => {
        let username = user.name !== element.user1 ? element.user1 : element.user2;
        return friendList.push(username);
      });  
    })
    .then(function() {
      socketIds.forEach(data => {
        const alreadyExistingUser = document.getElementById(data.name);
        if (!alreadyExistingUser && data.name !== user.name && !friendList.includes(data.name)) {
          const userContainerEl = createUserItemContainer(data);

          activeUserContainer.append(userContainerEl);
        }
        else if (alreadyExistingUser) {
          // Problem with the toggle need to fix connections first the add on connect and remove on disconnect
          // NEED TO FIX THIS AS TOGGLE WILL NOT WORK WHEN REFRESHING
          onlineFriends.push({name: data.name, socket: data.socket});
          document.getElementById(data.name).setAttribute("value", data.socket);
          document.getElementById(data.name).classList.add(data.socket);
          document.getElementById(data.name + "offline").classList.add("hide");
          document.getElementById(data.name + "online").classList.remove("hide");
        }
      });
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  //===========================================================================
  // Socket Connection Area
  //===========================================================================
  // Send data throught the connection (username)
  // Only make one connection when logging in, not on refresh
  if(!connected) {
    socket = io.connect({query: {name: user.name}});
    connected = true;
  }

  // remove any excess chat listeners
  socket.removeListener("chat-message");
  socket.removeListener("chat-sent");

  socket.on("update-user-list", ({ users }) => {
    // if on friends list show on chat area
    updateUserList(users);
  });

  socket.on("remove-user", ({ socketId }) => {
    // need to find another way to search
    let elToRemove;
    let frToRemove;
    // let username;
    let friend = onlineFriends.find(element => element.socket === socketId);
    
    console.log(friend, "FRIEND LEAVING");

    // Determine if a friend is
    if(document.getElementById(socketId)) {
      elToRemove = document.getElementById(socketId);
    }
    else if(typeof friend !== "undefined"){
      //undefind friend
      frToRemove = document.getElementById(friend.name);
    }

    if(elToRemove) {
      elToRemove.remove();
    }
    else if(frToRemove) {
      // NEED TO FIX THIS AS TOGGLE WILL NOT WORK WHEN REFRESHING
      // If online show call button
      frToRemove.classList.remove(socketId);
      frToRemove.setAttribute("value", "");
      document.getElementById(friend.name + "offline").classList.remove("hide");
      document.getElementById(friend.name + "online").classList.add("hide");

      //Filt
      onlineFriends = onlineFriends.filter(element => {
        return element.socket !== socketId
      });
    };
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

      console.log(document.getElementsByClassName(data.socket), "BOX TO FOCUS ON");
      const userCalling = document.getElementsByClassName(data.socket)
      const elToFocus = userCalling[0].getAttribute("id");

      // Show video area and call buttons for the receiver
      document.getElementById("video-space").classList.remove("hide");
      document.getElementById("call-buttons").classList.remove("hide");
      unselectUsersFromList();
      document.getElementById(elToFocus).click();
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
    // not sending to both clients
    peerConnection.close(); //change this so signalState is permanently put on closed
    document.getElementById("video-space").classList.add("hide");
    document.getElementById("call-buttons").classList.add("hide");
    document.getElementById("message-space").classList.remove("hide");
  });

  socket.on("call-rejected", data => {
    alert(`User: "Socket: ${data.socket}" rejected your call.`);
    unselectUsersFromList();
    // Hide video area and call buttons for the caller
    document.getElementById("video-space").classList.add("hide");
    document.getElementById("call-buttons").classList.add("hide");
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
    // console.log(data, "CHAT DATA");
    let active;
    let name;

    if(document.getElementById("talking-with-info")) {
      name = document.getElementById("talking-with-info").getAttribute("value");
    }
    if(name) {
      active = document.getElementById(name).getAttribute("value");
    }

    if(active === data.socket) {
      messageDisplay(data.msg);
      let objDiv = document.getElementById("messageScroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  });

  function sendMessage(event) {
    event.preventDefault();

    const data = {
      message: document.getElementById('m').value,
      chatname: chatName
    }

    //Detect if user has clicked on a chat box and if not return
    if(document.getElementById("talking-with-info").innerHTML === "Select active user on the left menu.") {
      console.log("No chatboxes selected");
      document.getElementById('m').value='';
      return;
    }

    let name = document.getElementById("talking-with-info").getAttribute("value");
    let receiver = document.getElementById(name).getAttribute("value");

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

    // console.log(msg);

    // socket emit
    socket.emit("chat-message", msg);

    messageDisplay(msg);

    let objDiv = document.getElementById("messageScroll");
    objDiv.scrollTop = objDiv.scrollHeight;

    document.getElementById('m').value='';
  }

  //===========================================================================
  // Screen manupulation Area
  //===========================================================================
  function chatarea() {
    document.getElementById("message-space").classList.toggle("hide");
  };

  function videoarea() {
    peerConnection.close(); //change this so signalState is permanently put on closed
    
    let receiverSocket = document.getElementById("talking-with-info").getAttribute("value");

    socket.emit("hang-up", receiverSocket);

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
        <div>
          <div className="active-users-panel" id="active-user-container">
            <h3 className="panel-title">Active Users:</h3>
            {/* area for active chats */}
          </div>
          <div className="friend-users-panel" id="friend-user-container">
            <h3 className="panel-title">Friends:</h3>
            {/* area for friends chats */}
          </div>
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