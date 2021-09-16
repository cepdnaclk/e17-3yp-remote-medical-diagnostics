import React from "react";

export interface PatientPaymentsProps {}

export interface PatientPaymentsState {}

class PatientPayments extends React.Component<
  PatientPaymentsProps,
  PatientPaymentsState
> {
  state = {};
  render() {
    return(
      <button type="button" className="btn btn-primary btn-lg" id="btn-1">Request a Refund</button>
    );
  }
}

export default PatientPayments;
