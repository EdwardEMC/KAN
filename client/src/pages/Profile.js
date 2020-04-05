import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import ProfileInsert from "../components/ProfileInsert";

class Profile extends Component {

  render() {
    return (
      <Wrapper>
        <ProfileInsert />
      </Wrapper>
    )
  }
}
  
export default Profile;