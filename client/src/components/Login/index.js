import React from "react";
import { Link } from "react-router-dom";
import LoginSubmit from "../utils/login";
import "./style.css";

function LoginForm() {
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