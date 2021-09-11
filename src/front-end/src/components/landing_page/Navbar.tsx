import * as React from "react";

class Navbar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            MedGenie
          </a>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
