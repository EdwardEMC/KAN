import React, { useState, useEffect } from "react";
import API from "../../components/utils/API";
import ChatBox from "../ChatBox";
import ChatMessage from "../ChatMessage";
import "./style.css";

function ChatArea() {
  const [chats, setChats] = useState([])
  const [logged, setLogged] = useState();
  const [active, setActive] = useState();

  // api call to get all active chats
  useEffect(() => {
    loadChats()
  }, [])

  function loadChats() {
    API.getChats()
    .then(function(result) {
      console.log(result);
      setLogged(result.data.logged.userName)
      setChats(result.data.chats);
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  function activate(event) {
    setActive(event.currentTarget.getAttribute("value"));
  }

  return ( 
    <div>
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="card chatArea">
            <div className="card-header text-center">
              CURRENT ACTIVE CHATS
            </div>
            <div className="card-body" id="chatboxes">
              {chats.map(element => (
                <ChatBox key={element.id} user={element} current={logged} onClick={activate} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card chatArea">
            <div className="card-body remove-padding ">
                {/* component to display the messages */}
                {/* click on the chat box will trigger api call and show all messages between the two users */}
                <ChatMessage active={active}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea;