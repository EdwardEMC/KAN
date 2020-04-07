import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Logo from "../components/Logo";
import LoginForm from "../components/Login";
import "./style.css";

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <br></br>
        <Logo />
        <br></br>
        <div className="container">
          <div className="card">
            <h2 className="text-center card-header greenHeader">
              Login
            </h2>
            <div className="card-body greenBody">
              <LoginForm />
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Login;