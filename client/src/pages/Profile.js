import React, { useState, useEffect } from "react";
import Wrapper from "../components/Wrapper";
import API from "../components/utils/API"
import ProfileInsert from "../components/ProfileInsert";

const Profile = () => {
  const [user, setUser] = useState([])

  useEffect(() => {
    loadUser()
  }, [])

  function loadUser() {
    API.getUser()
    .then(function(result) {
      // set username for chat area
      localStorage.setItem("User", JSON.stringify({name:result.data.userName, id:result.data.id})); // add user id as well later
      setUser(result.data);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  return (
    <Wrapper>
      <ProfileInsert currentUser = {user}/>
    </Wrapper>
  )
}
  
export default Profile;