import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import ConfigDeviceOverlay from "./ConfigDeviceOverlay";

export interface PatientHomeProps {}

export interface PatientHomeState {}

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {
    modl: false,
  };

  openPopup = (): void => {
    this.setState({ modl: true });
  };

  closePopup = (): void => {
    this.setState({ modl: false });
  };

  componentDidMount = (): void => {
    setTimeout(this.openPopup, 700);
  };

  render() {
    return (
      <div className="find-a-doc-box">
        <PatientHomeSearchDoctor />
        <ConfigDeviceOverlay
          st={this.state.modl}
          closePopup={this.closePopup}
        />
      </div>
    );
  }
}

export default PatientHome;
