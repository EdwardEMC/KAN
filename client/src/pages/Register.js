import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <Wrapper>
        <br></br>
        <div className="text-center">
          <img src="" alt="KAN logo"/>
        </div>
        <br></br>
        <div className="container">
          <div className="card">
            <h2 className="text-center card-header">
              New Registration
            </h2>
            <div className="card-body">
              <form className="signup-user">
                {/* <div id="uRegistration" className="is-hidden">*/}
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="userName-input">Username</label>
                      <input id="userName-input" className="input form-control" type="text" required placeholder="Username....."/>
                      <p id="userNameTaken"></p>
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
                      <input className="input form-control" id="phoneNumber-input" type="tel" required placeholder="Your phone number....."/>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="name-input">Name</label>
                      <input  id="name-input" className="input form-control" type="text" required placeholder="Name....."/>
                    </div>
                  </div> 
                  <div className="form-row">  
                    <div className="form-group col-md-6">
                      <label htmlFor="information-input">General Information</label>
                      <textarea  id="information-input" className="input form-control" type="text" required placeholder="General Information....."/> 
                    </div>
                    <div className="form-group col-md-6">
                      <label className="label">Password</label>
                      <input className="input form-control" id="password-input" type="password" required placeholder="Password....."/>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="terms"/>
                      <label className="form-check-label" htmlFor="terms">I have read the 
                        <a href="/"> {/*change to link and actual location*/}
                          terms & conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  <br></br>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                    Submit
                    </button>
                  </div>
                  <br></br>
                  <div className="text-center">
                    <p>Already have an account? Login &nbsp; 
                      <Link to="/"> 
                        here
                      </Link>
                    </p>
                  </div>
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
        <br></br>
      </Wrapper>
    )
  }
}

export default Register;