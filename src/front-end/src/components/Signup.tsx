import * as React from "react";
import "../Styles/Signup.css";
import signup_pic from "../images/signup_pic.jpg";
import { ReactComponent as GoogleIcon } from "../icons/google.svg";

class Signup extends React.Component {
  render() {
    return (
      <>
        <div className="signup-page">
          <img className="signup-img" src={signup_pic} alt="signup" />
          <div className="mg-txt" id="mg-t1">
            MedGenie
          </div>

          <div className="signup-form">
            <label className="create-account-label">Create Your Account</label>
            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText3"
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
                    id="inputpassword3"
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
              <button
                type="submit"
                id="sign-up-btn"
                className="btn btn-primary"
              >
                Create Account
              </button>
              or
              <button
                type="submit"
                id="sign-up-btn-google"
                className="btn btn-primary"
              >
                <GoogleIcon />
                &nbsp; Sign Up with Google
              </button>
              Already have an account ?
              <button type="submit" id="login-btn" className="btn btn-primary">
                Log In
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
