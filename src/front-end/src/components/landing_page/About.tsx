import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RouteComponentProps } from "react-router-dom";

class About extends React.Component<RouteComponentProps> {
  render() {
    return (
      <>
        <Navbar />
        <h1>About Us</h1>
        <Footer />
      </>
    );
  }
}

export default About;
