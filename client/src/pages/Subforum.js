import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../components/utils/API";
import { Link } from "react-router-dom";

class Subforum extends Component {

  componentDidMount() {
    const category = window.location.href.split("forums/");
    API.getTopics(category[1])
    .then(function(result) {
      console.log(result);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  render() {
    return (
      <Wrapper>
        <Link to="/forums/" >
          <p>Back to Forums</p>
        </Link>
        <p>Topics</p>
      </Wrapper>
    )
  }
}
  
export default Subforum;