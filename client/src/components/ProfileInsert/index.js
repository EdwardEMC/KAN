import React from "react";
import API from "../utils/API";
// import { useStoreContext } from "../utils/GlobalState";
import "./style.css";

function ProfileInsert() {  
  const getUserInfo = () => {
    API.getUser()
    .then(function(result) {
      console.log(result);
    })// If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }  

  console.log(getUserInfo())
  
  return (
    <p>Profile</p>
  );
}

export default ProfileInsert;

// const [state] = useStoreContext();

// const getUserInfo = () => {
//   // console.log(state);
//   if(state.user[0]) {
//     API.getUser(state.user[0].username)
//     .then(function(result) {
//       console.log(result);
//     })// If there's an error, log the error
//     .catch(function(err) {
//       console.log(err);
//     });
//   }
// }  