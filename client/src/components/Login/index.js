import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../utils/GlobalState";
import { useHistory } from "react-router-dom";
import API from "../utils/API";
import "./style.css";

function LoginForm() {
  const [state, dispatch] = useStoreContext();
  let history = useHistory();
  const LoginSubmit = (event) => {

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
            API.loginCheck({
              email: userData.email,
              password: userData.password
            })
            .then(result => {
              // console.log(result);
              const userData = {username: result.data.userName, email: result.data.email, name: result.data.name};
              dispatch({
                type: "SET_USER",
                user: userData
              });
            }).then(function(){
              history.push('/profile')
            })
            .catch(err => console.log(err)); // If there's an error, log the error
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

  // console.log(state);

  return(
    <form className="login">
        <br></br>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input id="email-input" className="input form-control" type="text" required placeholder="john.doe@gmail.com"/>
          <p id="noEmail"></p>
        </div>
        <div className="form-group">
          <label htmlFor="password-input">Password</label>
          <input id="password-input" className="input form-control" type="password" required placeholder="********"/>
          <p id="noPassword"></p>
        </div>
        <br></br>
        <div className="text-center">
          <button onClick={LoginSubmit} className="btn btn-primary">
          Submit
          </button>
          <p className="help" id="errorMsg"></p>
        </div>
        <div className="text-center">
          <p>Don't have a account? Sign up &nbsp; 
            <Link to="/register"> 
              here
            </Link>
          </p>
        </div>
    </form>
  )
}

export default LoginForm