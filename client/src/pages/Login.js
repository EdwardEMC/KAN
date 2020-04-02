import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <div className="box">
          <article className="panel is-primary">
            <p className="panel-heading .has-text-centered">
              Login
            </p>
            <form className="login">
              <div id="login" className="box">
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Enter user details</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input id="email-input" className="input" type="text" required placeholder="john.doe@gmail.com"/>
                        <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                        </span>
                      </p>
                    </div>
                    <div className="field">
                      <p className="control is-expanded has-icons-left">
                        <input  id="password-input" className="input" type="password" required placeholder="********"/>
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
                        <p className="help" id="errorMsg"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="has-text-centered">Or sign up 
                  <Link to="/register"> 
                    here
                  </Link>
                </p>
              </div>
            </form>
          </article>
        </div>
      </Wrapper>
    )
  }
}

export default Login;