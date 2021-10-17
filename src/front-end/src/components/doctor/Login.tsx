import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import LoginForm from "../LoginForm";

export interface LoginProps extends RouteComponentProps {}
type props = PropsFromRedux & LoginProps;
export interface LoginState {}

class Login extends React.Component<props, LoginState> {
  static contextType = AuthContext;
  componentDidMount = () => {
    document.body.style.backgroundColor = "white";
  };
  componentWillUnmount = () => {
    document.body.style.removeProperty("background-color");
  };
  handleHomeButton = (): void => {
    this.props.history.push("/");
  };
  handleSignup = (): void => {
    this.props.history.push("/signup");
  };
  render() {
    return (
      <>
        <button id="home-login" onClick={this.handleHomeButton}>
          <HomeIcon />
        </button>
        <main className="container  text-center">
          <div className="row justify-content-md-center align-items-center login-form">
            <div className="col col-lg-4 col-md-6 col-12" id="login_">
              <LoginForm type="doctor" />
              <div className="mt-2 mb-2">Don't have an account?</div>
              <button
                className="w-100 btn btn-lg btn-primary"
                type="submit"
                onClick={this.handleSignup}
              >
                Create Account
              </button>
              <p className="mt-4 mb-3 ">
                <Link to="/login-doctor">I am a patient</Link>
              </p>
            </div>
          </div>
        </main>
      </>
    );
  }
}

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
