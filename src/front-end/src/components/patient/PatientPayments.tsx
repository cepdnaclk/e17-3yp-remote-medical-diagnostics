import React from "react";

export interface PatientPaymentsProps {}

export interface PatientPaymentsState {}

class PatientPayments extends React.Component<
  PatientPaymentsProps,
  PatientPaymentsState
> {
  state = {};
  render() {
    return <h1>This is patient payments component</h1>;
  }
}

export default PatientPayments;
