import React from "react";
import { Link } from "react-router-dom";
import RegisterUser from "../utils/register";
import "./style.css";

function RegisterForm() {
  return (
    <form className="signup-user" onSubmit={RegisterUser}>
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="userName-input">Username</label>
          <input id="userName-input" className="input form-control" type="text" required placeholder="Username....."/>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="email-input">Email</label>
          <input className="input form-control" id="email-input" type="email" required placeholder="alex@smith.com"/>
          <p id="emailInUse"></p>
        </div>
      </div> 
      <div className="form-row">
        <div className="form-group col-md-6">
          <label htmlFor="phoneNumber-input">Phone Number</label>
          <input className="input form-control" id="phoneNumber-input" type="number" placeholder="Optional....."/>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="name-input">Name</label>
          <input  id="name-input" className="input form-control" type="text" required placeholder="Name....."/>
          <br></br>
        </div>
      </div> 
      <div className="form-row">  
        <div className="form-group col-md-6">
          <label htmlFor="information-input">General Information</label>
          <textarea  id="information-input" className="input form-control" type="text" placeholder="Optional....."/> 
        </div>
        <div className="form-group col-md-6">
          <label className="label">Password</label>
          <input className="input form-control" id="password-input" type="password" required placeholder="Password....."/>
        </div>
      </div>
      <div className="form-row">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" required id="terms"/>
          <label className="form-check-label" htmlFor="terms">I have read the
            &nbsp;
            <Link to="/terms">
              terms & conditions
            </Link>
          </label>
          <p id="checked"></p>
        </div>
      </div>
      <br></br>
      <div className="text-center">
        <button type="submit" className="btn btn-primary">  {/*fix to show if username or email is already in use*/}
        Submit
        </button>
      </div>
      <p id="errorMsg"></p>
      <br></br>
      <div className="text-center">
        <p>Already have an account? Login
          &nbsp; 
          <Link to="/"> 
            here
          </Link>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm;