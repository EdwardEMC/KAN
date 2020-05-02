import React, { useState, useEffect } from "react";
import API from "../../components/utils/API";
import ChatBox from "../ChatBox";
import ChatMessage from "../ChatMessage";
import "./style.css";

const iconPath = process.env.PUBLIC_URL + '/assets/MiscIcons/';

function ChatArea() {
  const [chats, setChats] = useState([])
  const [logged, setLogged] = useState();
  const [active, setActive] = useState();
  const [chatId, setChatId] = useState();

  // api call to get all active chats
  useEffect(() => {
    loadChats();
  }, []) // setInterval for 5 minutes or find a way to alert user if a new chat has been started

  function loadChats() {
    API.getChats()
    .then(function(result) {
      console.log(result, "CURRENT CHATS");
      setLogged(result.data.logged.userName);
      setChats(result.data.chats);
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  function activate(event) {
    // add class to change color 
    let focus = document.getElementsByClassName("focused");
    if(focus[0]) {
      focus[0].classList.remove("focused");
      event.currentTarget.className += " focused";
    }
    else {
      event.currentTarget.className += " focused";
    }
    // set currently active chat box
    setActive(event.currentTarget.getAttribute("value"));
    setChatId(event.currentTarget.getAttribute("data-id"));
  }

  // function to delete the chat box and update the setChats
  function deleteBox(event) {
    const data = {
      chatName: event.target.getAttribute("value")
    }
    // console.log(chats, "CHATS");
    API.deleteChat(data)
    .then(function(result){
      // console.log(result);
      const chatList = [];
      chats.map(element => {
        if(element.chatName !== data.chatName) {
          return chatList.push(element);
        }
        return true;
      })
      setChats(chatList);
    })
    .catch(function(err) {
      console.log(err);
    })
  }

  return ( 
    <div>
      <div className="row no-gutters">
        <div className="col-md-4">
          <div className="card chatArea">
            <div className="card-header text-center colorHeader">
              <strong>CURRENT ACTIVE CHATS</strong>
              &emsp;
              <label htmlFor="checkbox"> 
                <input type="checkbox" id="checkbox"/>
                <img className="pointer refresh img-fluid" alt="refreshIcon" onClick={loadChats} src={iconPath + "refresh.png"} />
              </label> 
            </div>
            <div className="card-body chatBoxArea" id="chatboxes">
              {chats.map(element => (
                element.Messages.length === 0 ? 
                <ChatBox 
                  key={element.id} 
                  user={element} 
                  current={logged} 
                  lastMsg={"No past messages"}
                  lastTime={"Not available"}
                  onClick={activate} 
                  delete={deleteBox} 
                />
                :
                <ChatBox 
                  key={element.id} 
                  user={element} 
                  current={logged} 
                  lastMsg={element.Messages[element.Messages.length - 1].message}
                  lastTime={element.Messages[element.Messages.length - 1].createdAt}
                  onClick={activate} 
                  delete={deleteBox} 
                />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card chatArea">
            <div className="card-body remove-padding chatColor">
              <ChatMessage active={active} id={chatId} function={loadChats} user={logged}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea;