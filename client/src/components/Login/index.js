import React from "react";
import { Link, useHistory } from "react-router-dom";
import API from "../utils/API";
import setAuth from "../utils/setAuth";
import "./style.css";

function LoginForm() {
  let history = useHistory();
  
  const LoginSubmit = (event) => {

    event.preventDefault();
  
    // Getting references to our form and inputs
    var emailInput = document.getElementById("email-input");
    var passwordInput = document.getElementById("password-input");

    userCheck(emailInput.value.trim(), passwordInput.value.trim())
  };

  function userCheck(email, password) {
    API.loginCheck({
      email: email,
      password: password
    })
    .then(result => {
      if(result.data === "Incorrect password.") {
        return document.getElementById("errorMsg").innerHTML = "Password Incorrect!";  
      }
      else if (result.data === "Incorrect email.") {
        return document.getElementById("errorMsg").innerHTML = "Email Address Does Not Exist!";
      }
      else {
        userAuth()
      }
    })
    .catch(err => console.log(err));
  }

  function userAuth() {
    API.verify()
    .then(result => {
      if(result.data === "Admin") {
        localStorage.setItem('user', result.data);
        history.push('/admin');
      }
      else {
        const token = result.data
        localStorage.setItem('jwtToken', token);
        setAuth(token);
        history.push('/profile');
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  return(
    <form className="login" onSubmit={LoginSubmit}>
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
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <p className="help" id="errorMsg"></p>
        </div>
        <div className="text-center">
          <p>Don't have a account? Sign up 
            &nbsp; 
            <Link to="/register"> 
              here
            </Link>
          </p>
        </div>
    </form>
  )
}

export default LoginForm