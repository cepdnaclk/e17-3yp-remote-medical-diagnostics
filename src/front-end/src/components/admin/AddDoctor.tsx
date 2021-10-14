import * as React from "react";
import "../../Styles/AddDoctor.css";
import { addDoctor } from "../../useCases/addDoctor/AddDoctor";


export interface AddDoctorState {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  gender: string;
  password: string;
  passwordConfirmation: string;
  license:string;
  mobileNo:string;
  errors: {
    // fname: string; //required
    // lname: string; //required
    // email: string; //valid/invalid
    // age: string; //required (must be a number?)
    // gender: string; //required
    password: string; //must be at least 8 characters long
  };
}
export interface AddDoctorProps {}

class AddDoctor extends React.Component<AddDoctorProps,AddDoctorState> {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "male",
    password: "",
    passwordConfirmation: "",
    license:"",
    mobileNo:"",
    errors: {
      // fname: "",
      // lname: "",
      // email: "",
      // age: "",
      // gender: "",
      password: "",
    },
  };

  handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const name = "Dr."+this.state.firstName + " " + this.state.lastName;
    const gender = this.state.gender === "male" ? "M" : "F";

    const userData = {
      name: name,
      email: this.state.email,
      age: parseInt(this.state.age),
      gender: gender,
      password: this.state.password,
      passwordConfirmation: this.state.passwordConfirmation,
      license:this.state.license,
      mobileNo:this.state.mobileNo,
    };

    if (name.length < 200) {
        try {
          console.log(await addDoctor(userData));
        } catch (error) {
          console.log(error);
        }
      }

      //clear the fields : Consider moving this UP
      this.setState(
        {
          firstName: "",
          lastName: "",
          email: "",
          age: "",
          gender: "male",
          password: "",
          passwordConfirmation: "",
          license:"",
          mobileNo:"",
          errors: {
            password: "",
          }
        }
      );

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
      age: e.currentTarget.value,
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

  handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      license: e.currentTarget.value,
    });
  };

  handleMobileNoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({
      mobileNo: e.currentTarget.value,
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
    const { firstName, lastName, age, gender,license,mobileNo } = this.state;
    return (
      (firstName.length > 0 || lastName.length > 0) &&
      gender.length > 0 &&
      parseInt(age) > 3 &&
      this.isEmailCorrect() &&
      this.arePasswordsMatching() &&
      license.length > 0 &&
      mobileNo.length >0
    );
  };

  render() {
    const { firstName,lastName,email, age,license,mobileNo,password,passwordConfirmation,errors } = this.state;
    return (
      <>
        <div className="add-doc">
          <div className="add-doc-form">
            <label className="create-account-label">Add a Doctor</label>
            <form onSubmit={this.handleSignup}>
              <div className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText3"
                    placeholder="First Name"
                    value = {firstName}
                    onChange={this.handleFirstNameChange}
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="inputText4"
                    placeholder="Last Name"
                    value = {lastName}
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
                    value = {email}
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
                    value = {age}
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
                    type="text"
                    className="form-control"
                    id="inputlicense"
                    placeholder="SLMC Registration No."
                    value = {license}
                    onChange={this.handleLicenseChange}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-12">
                  <input
                    type="text"
                    className="form-control"
                    id="inputmobileno"
                    placeholder="Mobile No."
                    value = {mobileNo}
                    onChange={this.handleMobileNoChange}
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
                    value = {password}
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
                    value = {passwordConfirmation}
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
                Add Doctor
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default AddDoctor;
