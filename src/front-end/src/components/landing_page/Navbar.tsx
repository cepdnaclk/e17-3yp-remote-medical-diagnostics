import * as React from "react";
import "../../Styles/landingPage.css";

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            MedGenie
          </a>
          <button
            type="button"
            id="login-button-navbar"
            className="btn btn-primary"
          >
            Log In
          </button>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
