import React, { useState } from "react";
import API from "../utils/API";
import { useHistory } from "react-router-dom";
import "./style.css";

import Modal from "react-modal";

const iconPath = process.env.PUBLIC_URL + '/assets/UserIcons/';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

Modal.setAppElement('body');

function UserSettings(props) {
  const [modalIsOpen,setIsOpen] = useState(false);

  let history = useHistory();
  let subtitle;
  let selectedIcon;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  function selected(event) {
    selectedIcon = event.target.getAttribute("id")
  }

  function picChange() {
    if(typeof selectedIcon !== "undefined") {
      document.getElementById("picture").src = iconPath + selectedIcon + ".png";
    }
    setIsOpen(false);
  }

  function goOffline() {
    API.offline()
    .then(function(result) {
      document.getElementById("offline").innerHTML = result.data;
    })
    .catch(function(err) {
      console.log(err);
    });
  }

  function sumbitUpdate(event) {
    event.preventDefault();

    // determine the selected icon name
    let profilePic = document.getElementById("picture").getAttribute("src");
    let image = profilePic.split("UserIcons/");
    let icon = image[1].split(".png");

    let nameInput = document.getElementById("name-input");
    let phoneInput =  document.getElementById("phoneNumber-input");
    let infoInput = document.getElementById("information-input");

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

    const userData = {
      icon: icon[0],
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
        <h2 className="text-center card-header colorHeader">
          Update User
        </h2>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Picture Selection"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Select a new image</h2>


          {/* working just need to add more icons */}
          <div className="icons">
            <div className="row">
              <div className="col-4">
                <img onClick={selected} id="Default" className="img-fluid iconPic" src={iconPath + "Default.png"} alt="Default" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Smile" className="img-fluid iconPic" src={iconPath + "Smile.png"} alt="Smile" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Cat" className="img-fluid iconPic" src={iconPath + "Cat.png"} alt="Cat" tabIndex="0"/>
              </div>
            </div>   
            <div className="row">
              <div className="col-4">
                <img onClick={selected} id="Duck" className="img-fluid iconPic" src={iconPath + "Duck.png"} alt="Duck" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Santa" className="img-fluid iconPic" src={iconPath + "Santa.png"} alt="Santa" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Orange" className="img-fluid iconPic" src={iconPath + "Orange.png"} alt="Orange" tabIndex="0"/>
              </div>
            </div>  
            <div className="row">
              <div className="col-4">
                <img onClick={selected} id="Monkey" className="img-fluid iconPic" src={iconPath + "Monkey.png"} alt="Monkey" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Elephant" className="img-fluid iconPic" src={iconPath + "Elephant.png"} alt="Elephant" tabIndex="0"/>
              </div>
              <div className="col-4">
                <img onClick={selected} id="Dog" className="img-fluid iconPic" src={iconPath + "Dog.png"} alt="Dog" tabIndex="0"/>
              </div>
            </div>  
          </div>
          <br></br>
          <button onClick={picChange}>Confirm</button> 
          &emsp;
          &emsp; 
          <button onClick={closeModal}>close</button>
        </Modal>

        <div className="card-body colorBody">
          <form className="update-user"> 
            <div className="form-row">
              <img 
                id="picture"
                className="img-fluid profilePic" 
                onClick={openModal} 
                src={iconPath + props.currentUser.icon + ".png"} 
                alt="profilePic" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="name-input"><h5>Name</h5></label>
                <input  id="name-input" className="input form-control" type="text" required placeholder={props.currentUser.name}/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="phoneNumber-input"><h5>Phone Number</h5></label>
                <input className="input form-control" id="phoneNumber-input" type="number" required placeholder={props.currentUser.phone}/>
                <br></br>
              </div>
            </div> 
            <div className="form-row">  
              <div className="form-group col-md-12">
                <label htmlFor="information-input"><h5>General Information</h5></label>
                <textarea id="information-input" className="input form-control" type="text" placeholder={props.currentUser.generalInformation}/> 
              </div>
            </div>
            <br></br>
            <div className="text-center">
              <div className="buttons">
                <button onClick={goOffline} className="btn btn-warning">
                  Go Offline
                </button>
                &emsp;
                <button onClick={sumbitUpdate} className="btn btn-primary">
                  Update
                </button>
                &emsp;
                <button onClick={handleDelete} className="btn btn-danger delete-user">
                  Delete User
                </button>
              </div> 
              <p id="offline"></p> 
            </div>
            <br></br>
          </form>
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default UserSettings;