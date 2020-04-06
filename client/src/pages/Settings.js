import React, { useState, useEffect } from "react";
import API from "../components/utils/API"
import UserSettings from "../components/UserSettings";
import Wrapper from "../components/Wrapper";

const Settings = () => {

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
      <UserSettings currentUser = {user}/>
    </Wrapper>
  )
}
  
export default Settings;