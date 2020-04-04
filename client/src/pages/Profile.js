import React, { Component } from "react";
import API from "../components/utils/API";
import Wrapper from "../components/Wrapper";
import ProfileInsert from "../components/ProfileInsert";
import { useStoreContext } from "../components/utils/GlobalState";

class Profile extends Component {
  // componentDidMount() {
  //   this.GetUserInfo()
  // }

  // GetUserInfo() {
  //   const [state] = useStoreContext();
  //   console.log(state);
  //   API.getUser()
  //   .then(function(result) {
  //     console.log(result);
  //   })// If there's an error, log the error
  //   .catch(function(err) {
  //     console.log(err);
  //   });
  // }  

  render() {
    return (
      <Wrapper>
        <ProfileInsert />
      </Wrapper>
    )
  }
}
  
export default Profile;