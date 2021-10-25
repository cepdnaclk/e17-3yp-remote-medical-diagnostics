import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { ReactComponent as HomeIcon } from "../../icons/home.svg";
import LoginForm from "../LoginForm";
import SignupForm from "./Signup";
import doesAdminExist from "../../useCases/createAdmin/doesExist";

export interface LoginProps extends RouteComponentProps {}
type props = PropsFromRedux & LoginProps;
export interface LoginState {
  doesAdminExist: boolean;
}

class Login extends React.Component<props, LoginState> {
  static contextType = AuthContext;
  state = { doesAdminExist: true };
  componentDidMount = async () => {
    document.body.style.backgroundColor = "white";
    if (!(await doesAdminExist())) this.setState({ doesAdminExist: false });
  };
  componentWillUnmount = () => {
    document.body.style.removeProperty("background-color");
  };
  handleHomeButton = (): void => {
    this.props.history.push("/");
  };
  setAdminExist = () => {
    this.setState({ doesAdminExist: true });
  };
  render() {
    return (
      <div
      // style={{
      //   backgroundImage: "url(patient-login-img.jpg)",
      //   height: "100vh",
      // }}
      >
        <button id="home-login" onClick={this.handleHomeButton}>
          <HomeIcon />
        </button>
        <main className="container  text-center">
          <div className="row justify-content-md-center align-items-center login-form">
            <div className="col col-lg-4 col-md-6 col-12 p-3" id="login_">
              <h4>Admin</h4>
              {this.state.doesAdminExist ? (
                <LoginForm type="admin" />
              ) : (
                <SignupForm onRegister={this.setAdminExist} />
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Login);
