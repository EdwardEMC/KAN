import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import API from "../components/utils/API"
import ProfileInsert from "../components/ProfileInsert";

class Profile extends Component {
  componentDidMount() {
    API.getUser()
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
        {/*Pass props to user insert for user that just logged in*/}
        <ProfileInsert />
      </Wrapper>
    )
  }
}
  
export default Profile;