import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import ChatArea from "../components/ChatArea";

// https://github.com/ninesystems/node-chat-one-to-one

class Chats extends Component {
  render() {
    return (
      <Wrapper>
        <ChatArea />
      </Wrapper>
    )
  }
}
  
export default Chats;