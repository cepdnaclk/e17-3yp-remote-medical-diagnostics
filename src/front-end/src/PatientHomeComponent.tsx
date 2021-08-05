import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./Store";

export interface PatientHomeProps {}
export interface PatientHomeState {}
type props = PropsFromRedux & PatientHomeProps;

class PatientHome extends React.Component<props, PatientHomeState> {
  state = {};
  render() {
    return <h2>Good Morning {this.props.firstName} </h2>;
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    firstName: state.user.firstName,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PatientHome);
