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
          <div className="card noBorder">
            <h2 className="text-center card-header colorHeader">
              New Registration
            </h2>
            <div className="card-body colorBody">
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