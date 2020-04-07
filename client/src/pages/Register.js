import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import Logo from "../components/Logo";
import RegisterForm from "../components/Register";

class Register extends Component {
  render() {
    return (
      <Wrapper>
        <br></br>
        <Logo />
        <br></br>
        <div className="container">
          <div className="card">
            <h2 className="text-center card-header greenHeader">
              New Registration
            </h2>
            <div className="card-body greenBody">
              <RegisterForm />
            </div>
          </div>
        </div>
        <br></br>
      </Wrapper>
    )
  }
}

export default Register;