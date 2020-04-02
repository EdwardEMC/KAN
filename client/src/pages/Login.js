import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

class Login extends Component {
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
              Login
            </h2>
            <div className="card-body">
              <form className="login">
                {/* <div id="login" className="box"> */}
                  <br></br>
                  <div className="form-group">
                    <label htmlFor="email-input">Email</label>
                    <input id="email-input" className="input form-control" type="text" required placeholder="john.doe@gmail.com"/>
                  </div>
                  <div className="form-group">
                  <label htmlFor="password-input">Password</label>
                    <input id="password-input" className="input form-control" type="password" required placeholder="********"/>
                  </div>
                  <br></br>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
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
                {/* </div> */}
              </form>
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Login;