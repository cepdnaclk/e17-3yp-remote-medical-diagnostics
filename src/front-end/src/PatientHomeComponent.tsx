import * as React from "react";

export interface PatientHomeProps {}

export interface PatientHomeState {}

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {};
  render() {
    return <h1>Patient - Home Screen</h1>;
  }
}

export default PatientHome;
