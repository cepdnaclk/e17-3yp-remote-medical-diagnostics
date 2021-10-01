import * as React from "react";
import "../../Styles/landingPage.css";
import { RouteComponentProps, withRouter, Link } from "react-router-dom";

class Navbar extends React.Component<RouteComponentProps> {
  handleLogin = (): void => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <>
        <nav className="navbar navbar-light bg-light" id="nav-bar">
          <label className="navbar-brand" id="MG">
            MedGenie
          </label>

          <ul className="navlinks">
            <Link to="/" style={{ textDecoration: "none" }}>
              <li>Home</li>
            </Link>

            <Link to="/about" style={{ textDecoration: "none" }}>
              <li>About</li>
            </Link>

            <Link to="/contact" style={{ textDecoration: "none" }}>
              <li>Contact</li>
            </Link>
          </ul>
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
