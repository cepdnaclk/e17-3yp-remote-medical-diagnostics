import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import logo from "../logo.svg";
import { freshLogin } from "../useCases/logIn/freshLogin";

export interface LoginProps extends RouteComponentProps {}
type props = PropsFromRedux & LoginProps;
export interface LoginState {
  email: string;
  pass: string;
  formDisabled: boolean;
}

class Login extends React.Component<props, LoginState> {
  static contextType = AuthContext;
  context!: React.ContextType<typeof AuthContext>;
  state = {
    email: "",
    pass: "",
    formDisabled: false,
  };

  onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.currentTarget.value });
  };
  onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ pass: event.currentTarget.value });
  };

  isEmailCorrect = () => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.state.email);
  };
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    e.preventDefault();
    this.setState({ formDisabled: true });
    if (await this.loginDetailsAreCorrect()) {
      this.context.markAuthSuccess();
      this.props.history.push("/home");
    } else {
      this.setState({ formDisabled: false });
    }
  };

  handleSignup = (): void => {
    this.props.history.push("/signup");
  };
  componentDidMount = () => {
    document.body.style.backgroundColor = "white";
  };
  componentWillUnmount = () => {
    document.body.style.removeProperty("background-color");
  };
  render() {
    return (
      <main className="container  text-center">
        <div className="row justify-content-md-center align-items-center login-form">
          <div className="col col-lg-4 col-md-6 col-12">
            <form onSubmit={this.handleSubmit}>
              <fieldset disabled={this.state.formDisabled}>
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
                    <input
                      className="m-2"
                      type="checkbox"
                      value="remember-me"
                    />
                  </label>
                </div>
                <button
                  className="w-100 btn btn-lg btn-primary"
                  type="submit"
                  disabled={!this.isEmailCorrect()}
                >
                  {this.state.formDisabled ? "Signing in" : "Sign in"}
                </button>
              </fieldset>
            </form>
            <div className="mt-2">Don't have an account?</div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={this.handleSignup}
            >
              Create Account
            </button>
            <p className="mt-5 mb-3 text-muted">Medgenie© 2021</p>
          </div>
        </div>
      </main>
    );
  }
  async loginDetailsAreCorrect(): Promise<boolean> {
    try {
      await freshLogin({
        email: this.state.email,
        password: this.state.pass,
        userType: "patient",
      });
      return true;
    } catch (error) {
      if (error instanceof Error)
        alert(error.message || "Connection error. Check your internet");
      return false;
    }
  }
}

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
