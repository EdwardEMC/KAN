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

  const userData = {
    userName: userNameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    name: nameInput.value.trim(),
    generalInformation: generalInput.value.trim(),
    password: passwordInput.value.trim(),
  };

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
  document.getElementById("usernameInUse").innerHTML = "";
  document.getElementById("emailInUse").innerHTML = "";

  const data = {
    userName: userName,
    email: email,
    phone: phone,
    name: name,
    generalInformation: generalInformation,
    password: password,
  };

  API.newUser(data)
  .then(result => {
    if(result.data === "user.userName must be unique") {
      document.getElementById("usernameInUse").innerHTML = "Username already in use";
    }
    else if(result.data === "user.email must be unique") {
      document.getElementById("emailInUse").innerHTML = "Email already in use";
    }
    else {
      window.location.replace("/");
    }
  })
  .catch(handleLoginErr);     
}

function handleLoginErr(err) {
  console.log(err);
}

export default RegisterUser;