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
          <div className="card noBorder">
            <h2 className="text-center card-header colorHeader">
              Login
            </h2>
            <div className="card-body colorBody">
              <LoginForm />
            </div>
          </div>
        </div>
      </Wrapper>
    )
  }
}

export default Login;