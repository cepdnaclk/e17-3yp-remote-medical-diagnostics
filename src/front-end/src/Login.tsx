import * as React from "react";
import logo from "./logo.svg";

export interface LoginProps {}

export interface LoginState {
  email: string;
  pass: string;
}

class Login extends React.Component<LoginProps, LoginState> {
  state = {
    email: "",
    pass: "Password",
  };
  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
    // console.log("email changed", event.currentTarget.value);
  };
  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pass: event.currentTarget.value });
    // console.log("email changed", event.currentTarget.value);
  };

  isEmailCorrect = () => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.state.email);
  };
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault();
    // console.log("form state", this.state);

    window.alert(`Email = ${this.state.email}\n Password = ${this.state.pass}`);
  };
  render() {
    return (
      <main className="container  text-center">
        <div className="row justify-content-md-center align-items-center login-form">
          <div className="col col-lg-4 col-md-6 col-12">
            <form onSubmit={this.handleSubmit}>
              <img
                className="mb-4"
                src={logo}
                alt="our logo"
                width="100"
                height="100"
              />
              <h1 className="h3 mb-3 fw-normal">Sign in to MedGenie</h1>

              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder={this.state.email}
                  onChange={this.onEmailChange}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder={this.state.pass}
                  onChange={this.onPasswordChange}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>

              <div className="checkbox mb-3">
                <label>
                  Remember me
                  <input className="m-2" type="checkbox" value="remember-me" />
                </label>
              </div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                disabled={!this.isEmailCorrect()}
              >
                Sign in
              </button>
            </form>
            <div className="mt-2">
              Don't have an account?
              <a href="example.com"> Register</a>
            </div>
            <p className="mt-5 mb-3 text-muted">Medgenie© 2021</p>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
