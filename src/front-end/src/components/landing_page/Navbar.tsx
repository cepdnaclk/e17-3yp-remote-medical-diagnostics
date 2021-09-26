import * as React from "react";
import "../../Styles/landingPage.css";
import { RouteComponentProps, withRouter } from "react-router-dom";

class Navbar extends React.Component<RouteComponentProps> {
  handleLogin = (): void => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light">
          <label className="navbar-brand" id="MG">
            MedGenie
          </label>
          <button
            type="button"
            id="login-button-navbar"
            className="btn btn-primary"
            onClick={this.handleLogin}
          >
            Log In
          </button>
        </nav>
      </>
    );
  }
}

export default withRouter(Navbar);
