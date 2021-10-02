import * as React from "react";
import "../Styles/Signup.css";
import { ReactComponent as GoogleIcon } from "../icons/google.svg";
import { ReactComponent as HomeIcon } from "../icons/home.svg";
import { RouteComponentProps } from "react-router-dom";
import { signUp } from "../useCases/signUp/signup";

export interface SignupState {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  password: string;
  passwordConfirmation: string;
  errors: {
    // fname: string; //required
    // lname: string; //required
    // email: string; //valid/invalid
    // age: string; //required (must be a number?)
    // gender: string; //required
    password: string; //must be at least 8 characters long
  };
}

class Signup extends React.Component<RouteComponentProps, SignupState> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    age: 4,
    gender: "male",
    password: "",
    passwordConfirmation: "",
    errors: {
      // fname: "",
      // lname: "",
      // email: "",
      // age: "",
      // gender: "",
      password: "",
    },
  };

  handleLoginButton = (): void => {
    this.props.history.push("/login");
  };

  handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
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
      try {
        console.log(await signUp(userData));
      } catch (error) {
        console.log(error);
      }
    }

    this.props.history.push("/login");
  };

  handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      firstName: e.currentTarget.value,
    });
    // this.state.errors.fname =
    //   e.currentTarget.value.length > 0 ? "" : "First Name Required!";
  };

  handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      lastName: e.currentTarget.value,
    });
    // this.state.errors.lname =
    //   e.currentTarget.value.length > 0 ? "" : "Last Name Required!";
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
      errors: {
        ...this.state.errors,
        password:
          e.currentTarget.value.length < 8
            ? "Password must be at least 8 characters long"
            : "",
      },
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
    const { password, passwordConfirmation } = this.state;
    return password.length > 7 && password === passwordConfirmation;
  };

  areFieldsFilled = (): boolean => {
    const { firstName, lastName, age, gender } = this.state;
    return (
      (firstName.length > 0 || lastName.length > 0) &&
      gender.length > 0 &&
      age > 3 &&
      this.isEmailCorrect() &&
      this.arePasswordsMatching()
    );
  };

  handleHomeButton = (): void => {
    this.props.history.push("/");
  };

  render() {
    const { errors } = this.state;
    return (
      <>
        <div className="signup-page">
          <div className="pic">
            {/* <img className="signup-img" src={signup_pic} alt="signup" /> */}
            <button id="home-signup" onClick={this.handleHomeButton}>
              <HomeIcon />
            </button>
            <div className="mg-txt d-none d-sm-none d-md-block" id="mg-t1">
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
                  {/* {errors.fname.length > 0 && (
                    <span className="err">{errors.fname}</span>
                  )} */}
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText4"
                    placeholder="Last Name"
                    onChange={this.handleLastNameChange}
                  />
                  {/* {errors.lname.length > 0 && (
                    <span className="err">{errors.lname}</span>
                  )} */}
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
                    <option defaultValue="male" disabled hidden>
                      {/*WARNING!!!!!*/}
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
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
                  {errors.password.length > 0 && (
                    <span className="err">{errors.password}</span>
                  )}
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
                  {this.arePasswordsMatching() && (
                    <span className="confirm-pw">Passwords Match</span>
                  )}
                </div>
              </div>
              {!this.areFieldsFilled() && (
                <span className="err">No field should be empty!</span>
              )}
              <button
                type="submit"
                id="sign-up-btn"
                className="btn btn-primary"
                disabled={!this.areFieldsFilled()}
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
