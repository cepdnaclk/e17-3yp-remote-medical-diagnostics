import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RouteComponentProps } from "react-router-dom";

class Contact extends React.Component<RouteComponentProps> {
  render() {
    return (
      <>
        <Navbar />
        <h1>Contact Us</h1>
        <Footer />
      </>
    );
  }
}

export default Contact;
