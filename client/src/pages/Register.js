import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <Wrapper>
        <div className="box">
          <article className="panel is-primary">
            <p className="panel-heading .has-text-centered">
              New Registration
            </p>
            <br></br>
            <br></br>
            <form className="signup-user">
              <div id="uRegistration" className="is-hidden">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Enter user details</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input id="userName-input" className="input" type="text" required placeholder="Username"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input  id="name-input" className="input" type="text" required placeholder="Name"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field is-expanded">
                      <div className="field has-addons">
                        <p className="control">
                        </p>
                        <p className="control is-expanded">
                        <input className="input" id="phoneNumber-input" type="tel" required placeholder="Your phone number"/>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label"></div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left has-icons-right">
                        <input className="input is-success" id="email-input" type="email" required placeholder="alex@smith.com"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                        <i className="fas fa-check"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <p className="control is-expanded has-icons-left">
                    <textarea  id="information-input" className="input" type="text" required placeholder="General Information"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                    </span>
                  </p>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Enter password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control has-icons-left">
                        <input className="input" id="password-input" type="password" required placeholder="Password"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label">
                    {/*left empty for spacing*/}
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button type="submit" className="button is-primary">
                        Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br></br>
                <p className="has-text-centered">Or login 
                  <Link to="/"> 
                    here
                  </Link>
                </p>
              </div>
            </form>
            <br></br>
          </article>
        </div>
      </Wrapper>
    )
  }
}

export default Register;