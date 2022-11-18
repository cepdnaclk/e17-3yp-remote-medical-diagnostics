import * as React from "react";
import { setupMedicalDevice } from "../../model/configureDevice";
import "../../Styles/ConfigDeviceOverlay.css";
import Store from "../../store/Store"

export interface ConfigDeviceOverlayProps {
  st: boolean;
  closePopup: () => void;
}

export interface ConfigDeviceOverlayState {
  deviceID : string;
  settingUpDevice: boolean;
}


class ConfigDeviceOverlay extends React.Component<
  ConfigDeviceOverlayProps,
  ConfigDeviceOverlayState
> {
  
  state = {
    deviceID : "",
    settingUpDevice : false,
  };


  handleDeviceIdChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      deviceID: e.currentTarget.value,
    });
  };

  render() {

    const {deviceID, settingUpDevice} = this.state;
    const deviceStatus = Store.getState().device.setupComplete;
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
              <div className = "device-id-setup">
                <div id="device-id-float">
                  Enter Device ID : <input id="device-id" type="text" onChange={this.handleDeviceIdChange} />
                </div>
                {settingUpDevice && !deviceStatus && <div className="device-id-float" id="loader"></div>}
              </div>
            </div>

            <div className="btns">
              <button
                onClick = {
                  () => {
                    this.setState({settingUpDevice:true})
                    setupMedicalDevice(deviceID)
                  }
                }
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
