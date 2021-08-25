import React from "react";

export interface PatientHomeProps {}

export interface PatientHomeState {}

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {};
  render() {
    return <h1>This is patient home component</h1>;
  }
}

export default PatientHome;
