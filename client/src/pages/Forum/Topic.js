import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";

class Topic extends Component {
  render() {
    return (
      <Wrapper>
        <Link to="/forums/" > {/*Make it so it only goes back to the previous subforum*/}
          <p>Back to Forums</p>
        </Link>
        <p>Topic</p>
      </Wrapper>
    )
  }
}
  
export default Topic;