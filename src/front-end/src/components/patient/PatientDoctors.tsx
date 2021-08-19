import React from "react";

export interface PatientDoctorsProps {}

export interface PatientDoctorsState {}

class PatientDoctors extends React.Component<
  PatientDoctorsProps,
  PatientDoctorsState
> {
  state = {};
  render() {
    return <h1>This is patient's doctors component</h1>;
  }
}

export default PatientDoctors;
