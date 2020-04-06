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
      console.log(result);
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