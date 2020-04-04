import React from "react";
import { useStoreContext } from "../utils/GlobalState";
import "./style.css";

function ProfileInsert() {
  const [state] = useStoreContext();

  //checking if state is updating
  const click = () => {
    console.log(state);
  }
  
  return (
    <p onClick={click}>Profile</p>
  );
}

export default ProfileInsert;