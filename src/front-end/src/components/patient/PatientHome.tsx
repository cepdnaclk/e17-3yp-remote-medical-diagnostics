import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import ConfigDeviceOverlay from "./ConfigDeviceOverlay";
import {
  hasPopupAlreadyShown,
  markPopupAsShown,
} from "../../model/configureDevice";

export interface PatientHomeProps {}

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
    markPopupAsShown();
    this.setState({ modal: false });
  };

  componentDidMount = (): void => {
    if (!hasPopupAlreadyShown())
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
          closePopup={this.closePopup}
        />
      </>
    );
  }
}

export default PatientHome;
