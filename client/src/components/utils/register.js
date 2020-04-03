import API from "../utils/API";

// When the signup button is clicked, we validate the username, name, email & password are not blank
function RegisterUser(event) {
  event.preventDefault();

  // collecting the form information
  const userNameInput = document.getElementById("userName-input");
  const phoneInput = document.getElementById("phoneNumber-input");
  const nameInput = document.getElementById("name-input");
  const emailInput = document.getElementById("email-input");
  const generalInput = document.getElementById("information-input")
  const passwordInput = document.getElementById("password-input");
  const terms = document.getElementById("terms").checked;
  
  const userData = {
    userName: userNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    name: nameInput.value.trim(),
    generalInformation: generalInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  // check if all the data is filled and the terms box is checked
  if (!userData.userName || !userData.email || !userData.name || !userData.password || terms===false) {
    return;
  }

  // If we have a username, name, email & password, run the signUpUser function
  signUpUser(userData.userName, userData.email, userData.phone, userData.name, userData.generalInformation, userData.password);
  userNameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  nameInput.value = "";
  generalInput.value = "";
  passwordInput.value = "";
};

// Does a post to the signup route. If successful, we are redirected to the user's home page
// Otherwise we log any errors
function signUpUser(userName, email, phone, name, generalInformation, password) {
  const data = {
    userName: userName,
    email: email,
    phone: phone,
    name: name,
    generalInformation: generalInformation,
    password: password,
  };
    console.log(data);
    API.newUser(data)
    .then(result => {
      console.log(result);
      // redirect
    }) // If there's an error, handle it by throwing up a bootstrap alert
    .catch(handleLoginErr);     
}

function handleLoginErr(err) {
  console.log(err.responseJSON)
	// document.getElementById("errorMsg").innerHTML = err.responseJSON;
}

export default RegisterUser;