import * as React from "react";
import "../../Styles/landingPage.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="ftr">
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3" style={{ backgroundColor: "white" }}>
            © 2021 MedGenie:
            <a
              className="text-dark"
              href="https://cepdnaclk.github.io/e17-3yp-remote-medical-diagnostics/"
            >
              Visit
            </a>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
