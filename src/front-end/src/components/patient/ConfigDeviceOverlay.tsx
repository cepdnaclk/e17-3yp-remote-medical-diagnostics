import * as React from "react";
import { setupMedicalDevice } from "../../model/configureDevice";
import "../../Styles/ConfigDeviceOverlay.css";

export interface ConfigDeviceOverlayProps {
  st: boolean;
  closePopup: () => void;
}

export interface ConfigDeviceOverlayState {}


class ConfigDeviceOverlay extends React.Component<
  ConfigDeviceOverlayProps,
  ConfigDeviceOverlayState
> {

  private deviceIdInput:React.RefObject<HTMLInputElement>;

  constructor(props:ConfigDeviceOverlayProps){
    super(props);
    this.deviceIdInput = React.createRef();
  }

  const getDeviceId = this.deviceIdInput.current.value;
  
  render() {
    return (
      this.props.st && (
        <div className="modl">
          <div className="overlay"></div>
          <div className="config-device">
            <label className="b4-u-continue">Before you continue...</label>
            <div className="text-message">
              <p>
                It seems like you haven't configured your device yet.{" "}
              </p>
              Enter Device ID : <input id="device-id" type="text" ref = {ref => this.deviceIdInput}/>
            </div>

            <div className="btns">
              <button
                onClick = {() => setupMedicalDevice(this.deviceIdInput.current.value)}
                className="overlay-btns" 
                id="now"
              >
                Setup Now
              </button>{" "}
              &nbsp;
              <button
                onClick={this.props.closePopup}
                className="overlay-btns"
                id="later"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ConfigDeviceOverlay;
