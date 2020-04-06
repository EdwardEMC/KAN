import React from "react";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import "./style.css";

function UserSettings(props) {
  let history = useHistory();

  function sumbitUpdate(event) {
    event.preventDefault();

    var nameInput = document.getElementById("name-input");
    var phoneInput =  document.getElementById("phoneNumber-input");
    var infoInput = document.getElementById("information-input");

    // Keep current values if not there is no input
    if(nameInput.value === "") {
      nameInput.value = props.currentUser.name;
    } 
    if (phoneInput.value === "") {
      phoneInput.value = props.currentUser.phone;
    }
    if (infoInput.value === "") {
      infoInput.value = props.currentUser.generalInformation;
    }

    var userData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      generalInformation: infoInput.value.trim()
    }
    console.log(userData);

    updateUser(userData);    
  }

  function updateUser(userData) {
    API.updateUser(userData)
    .then(function() {
      history.push('/profile')
    }) // If there's an error, log the error
    .catch(function(err) {
      console.log(err);
    });
  }

  // Function for handling what happens when the delete button is pressed
  function handleDelete(event) {
    event.preventDefault();
    API.deleteUser("/api/user")
    .then(history.push('/'));
  }

  return (
    <div className="container update">
      <div className="card">
        <h2 className="text-center card-header">
          Update User
        </h2>
        <div className="card-body">
          <form className="update-user"> 
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name-input">Name</label>
                <input  id="name-input" className="input form-control" type="text" required placeholder={props.currentUser.name}/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phoneNumber-input">Phone Number</label>
                <input className="input form-control" id="phoneNumber-input" type="number" required placeholder={props.currentUser.phone}/>
                <br></br>
              </div>
            </div> 
            <div className="form-row">  
              <div className="form-group col-md-12">
                <label htmlFor="information-input">General Information</label>
                <textarea id="information-input" className="input form-control" type="text" placeholder={props.currentUser.generalInformation}/> 
              </div>
            </div>
            <br></br>
            <div className="text-center">
              <div className="buttons">
                <button onClick={sumbitUpdate} className="btn btn-primary">
                  Update
                </button>
                &emsp;
                <button onClick={handleDelete} className="btn btn-danger delete-user">
                  Delete User
                </button>
              </div>  
            </div>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserSettings;