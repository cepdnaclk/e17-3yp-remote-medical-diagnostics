import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import ConfigDeviceOverlay from "./ConfigDeviceOverlay";

export interface PatientHomeProps { }

export interface PatientHomeState { }

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
      <>
        <PatientHomeSearchDoctor />
        <ConfigDeviceOverlay
          st={this.state.modl}
          closePopup={this.closePopup}
        />
      </>
    );
  }
}

export default PatientHome;
