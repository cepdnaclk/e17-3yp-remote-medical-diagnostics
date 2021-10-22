import * as React from "react";
import { Link } from "react-router-dom";
import "../../Styles/landingPage.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4  ps-3 pe-3">
        <p className="col-md-4 mb-0 text-muted">© 2021 Medgenie, Inc</p>

        <ul className="nav col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/admin-login" className="nav-link px-2 text-muted">
              Admin
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Features
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              Pricing
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 text-muted">
              FAQs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link px-2 text-muted">
              About
            </Link>
          </li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
