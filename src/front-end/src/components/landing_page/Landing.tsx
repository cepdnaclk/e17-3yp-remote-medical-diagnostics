import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import landing from "../../images/landing.jpg";

class Landing extends React.Component {
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
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Landing;
