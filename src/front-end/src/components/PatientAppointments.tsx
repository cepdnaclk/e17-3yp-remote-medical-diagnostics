import React from "react";

export interface PatientAppointmentsProps {}

export interface PatientAppointmentsState {}

class PatientAppointments extends React.Component<
  PatientAppointmentsProps,
  PatientAppointmentsState
> {
  state = {};
  render() {
    return <h1>This is patient appointments component</h1>;
  }
}

export default PatientAppointments;
