import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import ConfigDeviceOverlay from "./ConfigDeviceOverlay";

export interface PatientHomeProps {
  modal_status_global: boolean;
  closeModal: () => void;
}

export interface PatientHomeState {}

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {
    modl: false,
  };

  openPopup = (): void => {
    this.setState({ modl: true });
  };

  closePopup = (): void => {
    this.props.closeModal();
    this.setState({ modl: false });
  };

  componentDidMount = (): void => {
    setTimeout(this.openPopup, 2000);
  };

  render() {
    return (
      <>
        <PatientHomeSearchDoctor />
        <ConfigDeviceOverlay
          st={this.state.modl}
          st_global={this.props.modal_status_global}
          closePopup={this.closePopup}
        />
      </>
    );
  }
}

export default PatientHome;
