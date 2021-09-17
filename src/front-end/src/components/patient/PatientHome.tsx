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
    modal: false,
  };
  timerHandle: NodeJS.Timeout | undefined;

  openPopup = (): void => {
    this.setState({ modal: true });
  };

  closePopup = (): void => {
    this.props.closeModal();
    this.setState({ modal: false });
  };

  componentDidMount = (): void => {
    this.timerHandle = setTimeout(this.openPopup, 2000);
  };
  componentWillUnmount = () => {
    if (this.timerHandle) clearTimeout(this.timerHandle);
    this.timerHandle = undefined;
  };

  render() {
    return (
      <>
        <PatientHomeSearchDoctor />
        <ConfigDeviceOverlay
          st={this.state.modal}
          st_global={this.props.modal_status_global}
          closePopup={this.closePopup}
        />
      </>
    );
  }
}

export default PatientHome;
