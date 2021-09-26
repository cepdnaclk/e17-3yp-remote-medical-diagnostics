import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import landing from "../../images/landing.jpg";
import { Button } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

class Landing extends React.Component<RouteComponentProps> {
  handleGetStarted = (): void => {
    this.props.history.push("/signup");
  };

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="page-content">
          <img className="img" src={landing} alt="landing" />
          <div className="txt" id="t1">
            The Best Doctors Right on Your Doorstep.
          </div>
          <div className="txt" id="t2">
            We Make Your Experience More Lifelike With Our Convenient Medical
            Device
          </div>
          <Button
            onClick={this.handleGetStarted}
            variant="primary"
            size="lg"
            id="get-started-btn"
          >
            Get Started
          </Button>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Landing;
