import * as React from "react";
import "../styles/Signup.css";

class Signup extends React.Component {
  render() {
    return (
      <>
        <div className="signup-form">
          <label className="create-account-label">Create Your Account</label>
          <form>
            <div className="row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputText4"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputText4"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12">
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12">
                <input
                  type="password"
                  className="form-control"
                  id="inputpassword4"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-12">
                <input
                  type="password"
                  className="form-control"
                  id="inputpassword4"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <button type="submit" id="sign-up-btn" className="btn btn-primary">
              Create Account
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Signup;
