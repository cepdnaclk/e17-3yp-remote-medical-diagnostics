import * as React from "react";
import "../Styles/Signup.css";
// import signup_pic from "../images/signup_pic.jpg";
import { ReactComponent as GoogleIcon } from "../icons/google.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { RouteComponentProps } from "react-router-dom";
import axios from "axios";

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordConfirmation: string;
  errors: {
    fname: string; //required
    lname: string; //required
    email: string; //valid/invalid
    age: string; //required (must be a number?)
    gender: string; //required
    password: string; //must be at least 8 characters long
  };
}

class Signup extends React.Component<RouteComponentProps, SignupState> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    gender: "",
    password: "",
    passwordConfirmation: "",
    errors: {
      fname: "",
      lname: "",
      email: "",
      age: "",
      gender: "",
      password: "",
    },
  };

  handleLoginButton = (): void => {
    this.props.history.push("/login");
  };

  handleSignup = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const url = "http://localhost:8080/api/patient";
    const name = this.state.firstName + " " + this.state.lastName;
    const gender = this.state.gender === "male" ? "M" : "F";

    const userData = {
      name: name,
      email: this.state.email,
      age: this.state.age,
      gender: gender,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
    };

    if (name.length < 200) {
      axios
        .post(url, userData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this.props.history.push("/login");
  };

  handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      firstName: e.currentTarget.value,
    });
  };

  handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      lastName: e.currentTarget.value,
    });
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      email: e.currentTarget.value,
    });
  };

  handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      age: parseInt(e.currentTarget.value),
    });
  };

  handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    this.setState({
      gender: e.currentTarget.value,
    });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      password: e.currentTarget.value,
    });
  };

  handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    this.setState({
      passwordConfirmation: e.currentTarget.value,
    });
  };

  isEmailCorrect = () => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.state.email);
  };

  arePasswordsMatching = (): boolean => {
    return this.state.password === this.state.passwordConfirmation;
  };

  handleHomeButton = (): void => {
    this.props.history.push("/");
  };

  render() {
    return (
      <>
        <div className="signup-page">
          <div className="pic">
            {/* <img className="signup-img" src={signup_pic} alt="signup" /> */}
            <button id="home-signup" onClick={this.handleHomeButton}>
              <HomeIcon />
            </button>
            <div className="mg-txt" id="mg-t1">
              MedGenie
            </div>
          </div>

          <div className="signup-form">
            <label className="create-account-label">Create Your Account</label>
            <form onSubmit={this.handleSignup}>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText3"
                    placeholder="First Name"
                    onChange={this.handleFirstNameChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText4"
                    placeholder="Last Name"
                    onChange={this.handleLastNameChange}
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
                    onChange={this.handleEmailChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAge"
                    placeholder="Age"
                    onChange={this.handleAgeChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <select
                    className="form-control"
                    id="gender"
                    onChange={this.handleGenderChange}
                  >
                    <option selected disabled hidden>
                      {/*WARNING!!!!!*/}
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="male">Female</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-12">
                  <input
                    type="password"
                    className="form-control"
                    id="inputpassword3"
                    placeholder="Password"
                    onChange={this.handlePasswordChange}
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
                    onChange={this.handleConfirmPasswordChange}
                  />
                </div>
              </div>
              <button
                type="submit"
                id="sign-up-btn"
                className="btn btn-primary"
                disabled={
                  !(this.isEmailCorrect() && this.arePasswordsMatching())
                }
              >
                Create Account
              </button>
              or
              <button id="sign-up-btn-google" className="btn btn-primary">
                <GoogleIcon />
                &nbsp; Sign Up with Google
              </button>
              Already have an account ?
              <button
                id="login-btn"
                className="btn btn-primary"
                onClick={this.handleLoginButton}
              >
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
