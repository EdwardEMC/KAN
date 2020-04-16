import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import API from "../components/utils/API"
import UserInsert from "../components/UserProfiles";

const OtherUsers = () => {
  const [user, setUser] = useState([])

  const userProfile = window.location.href.split("profile/");
  
  useEffect(() => {
    loadUser()
  }, [])

  function loadUser() {
    API.getProfile(userProfile[1])
    .then(function(result) {
      setUser(result.data);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  //make a new profile insert below as to add start chatting button
  return (
    <Wrapper>
      <UserInsert currentUser = {user}/> 
    </Wrapper>
  )
}
  
export default OtherUsers;