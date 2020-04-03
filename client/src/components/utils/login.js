import API from "../utils/API";

// When the form is submitted, we validate there's an email and password entered
function LoginSubmit(event) {
  event.preventDefault();

  // Getting references to our form and inputs
  var emailInput = document.getElementById("email-input");
  var passwordInput = document.getElementById("password-input");

  API.getUsers("/api/user")
    .then(function(result) {
      const users = result.data;
      const pass = users.find(element => element.email === emailInput.value);
      if(pass) {    
        // The user record in database does not have a charity key or a charity key was not entered so it is a regular user
        const userData = {
          email: emailInput.value.trim(),
          password: passwordInput.value.trim(),
        };    
        // If we have an email and password we run the loginUser function and clear the form
        if (!userData.email || !userData.password) {
          return;
        }
        else {
          loginUser(userData.email, userData.password);
        }
      }
      else {
        // entered email ID is not found in database
        emailInput.value = "";
        passwordInput.value = "";
        document.getElementById("errorMsg").innerHTML = "Username does not exist!";
        return;
      }
    });
};

// loginUser does a post to our "api/login" route and if successful, redirects us the the members page
function loginUser(email, password) {
  API.loginCheck({
    email: email,
    password: password
  })
  .then(function() {
    window.location.replace("/user");
  })// If there's an error, log the error
  .catch(function(err) {
    console.log(err);
  });
}

export default LoginSubmit;