import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";

const Topic = (props) => {
  console.log(props);
  return (
    <Wrapper>
      <Link to="/forums/" > {/*Make it so it only goes back to the previous subforum*/}
        <p>Back to Forums</p>
      </Link>
      <p>{props.location.state.topic.title}</p>
    </Wrapper>
  )
}
  
export default Topic;