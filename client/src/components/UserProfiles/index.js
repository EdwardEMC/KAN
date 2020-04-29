import React from "react";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "./style.css";

const iconPath = process.env.PUBLIC_URL + '/assets/UserIcons/';

function UserInsert(props) {  
  let history = useHistory();

  function chatting(event) {
    const data = {
      currentUser: props.currentUser
    }
    API.newChat(data)
    .then(function(result) {
      // console.log(result);
      history.push("/chats");
    })
    .catch(function(err) {
      console.log(err);
      // redirect if the chatbox already exists
      history.push("/chats");
    })
  }


  return (
    <div className="container mainWin">
      <div className="card">
        <div className="card-header colorHeader text-center">
          <h3 id="userName">User Name: {props.currentUser.userName}</h3> {/*Remove after auth done, just keep props. */}
        </div>
        <div className="card-body colorBody">
          <div className="row">
            <div className="col-sm-6 text-center">
              <img className="img-fluid profilePic" src={iconPath + props.currentUser.icon + ".png"} alt="profilePic" />
              <br></br>
              <br></br>
            </div>
            <div className="col-sm-6">
              <button className="btn btn-success" onClick={chatting}>Start Chatting</button>
              <br></br>
              <br></br>
              <div className="mainInfo">
                <h5 className="userInfo">Name: {props.currentUser.name}</h5>
                <br></br>
                <h5 className="userInfo">Email: {props.currentUser.email}</h5>
                <br></br>
                <h5 className="userInfo">Phone: {props.currentUser.phone}</h5>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="general">
            <h5 className="userInfo">General information:</h5>
            <div className="card">
              <textarea id="generalInfo" className="inputColor" readOnly value={props.currentUser.generalInformation}>
              </textarea>
            </div>
          </div>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default UserInsert;