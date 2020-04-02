import React, { Component } from "react";
import Wrapper from "../components/Wrapper";

class Login extends Component {
  render() {
    return (
      <Wrapper>
        <div class="box">
          <article class="panel is-primary">
            <p class="panel-heading .has-text-centered">
              Login
            </p>
            <form class="login">
              <div id="login" class="box">
                <div class="field is-horizontal">
                  <div class="field-label is-normal">
                    <label class="label">Enter user details</label>
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input id="email-input" class="input" type="text" required placeholder="john.doe@gmail.com"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                        </span>
                      </p>
                    </div>
                    <div class="field">
                      <p class="control is-expanded has-icons-left">
                        <input  id="password-input" class="input" type="password" required placeholder="********"/>
                        <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="field is-horizontal">
                  <div class="field-label">
                    {/*left empty for spacing*/}
                  </div>
                  <div class="field-body">
                    <div class="field">
                      <div class="control">
                        <button type="submit" class="button is-primary">
                        Submit
                        </button>
                        <p class="help" id="errorMsg"></p>
                      </div>
                    </div>
                  </div>
                </div>
                <p class="has-text-centered">Or sign up <a href="/register">here</a></p> {/*change to Link after testing*/}
              </div>
            </form>
          </article>
        </div>
      </Wrapper>
    )
  }
}

export default Login;