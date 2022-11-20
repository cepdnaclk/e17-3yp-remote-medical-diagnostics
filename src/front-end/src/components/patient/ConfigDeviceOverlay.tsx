import * as React from "react";
import { setupMedicalDevice } from "../../model/configureDevice";
import "../../Styles/ConfigDeviceOverlay.css";

export interface ConfigDeviceOverlayProps {
  st: boolean;
  closePopup: () => void;
}

export interface ConfigDeviceOverlayState {
  deviceID: string;
  settingUpDevice: boolean;
  deviceConnectedStatus: boolean;
}

class ConfigDeviceOverlay extends React.Component<
  ConfigDeviceOverlayProps,
  ConfigDeviceOverlayState
> {
  state = {
    deviceID: "",
    settingUpDevice: false,
    deviceConnectedStatus: false,
  };

  handleDeviceIdChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      deviceID: e.currentTarget.value,
    });
  };

  handleSetupNowButtonClick = (): void => {
    this.setState({
      settingUpDevice: true,
    });
  };

  handleDeviceConnectedStatus = (): void => {
    this.setState({
      deviceConnectedStatus: true,
    });
    setTimeout(() => this.props.closePopup(), 2000);
  };

  render() {
    const { deviceID, settingUpDevice, deviceConnectedStatus } = this.state;
    return (
      this.props.st && (
        <div className="modl">
          <div className="overlay"></div>
          <div className="config-device">
            <label className="b4-u-continue">Before you continue...</label>
            <div className="text-message">
              <p>It seems like you haven't configured your device yet. </p>
              <div className="device-id-setup">
                <div id="device-id-float">
                  Enter Device ID :{" "}
                  <input
                    id="device-id"
                    type="text"
                    onChange={this.handleDeviceIdChange}
                    disabled={settingUpDevice}
                  />
                </div>
                {settingUpDevice && !deviceConnectedStatus && (
                  <div className="device-id-float" id="loader"></div>
                )}
                {deviceConnectedStatus && (
                  <div className="wrapper">
                    <svg
                      className="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52"
                    >
                      {" "}
                      <circle
                        className="checkmark__circle"
                        cx="26"
                        cy="26"
                        r="25"
                        fill="none"
                      />{" "}
                      <path
                        className="checkmark__check"
                        fill="none"
                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            <div className="btns">
              <button
                onClick={() => {
                  this.handleSetupNowButtonClick();
                  setupMedicalDevice(
                    deviceID,
                    this.handleDeviceConnectedStatus
                  );
                }}
                className="overlay-btns"
                id="now"
                disabled={settingUpDevice}
              >
                Setup Now
              </button>{" "}
              &nbsp;
              <button
                onClick={this.props.closePopup}
                className="overlay-btns"
                id="later"
                style={
                  settingUpDevice ? { color: "red" } : { color: "#2671e9" }
                }
              >
                {settingUpDevice ? "Cancel" : "Maybe Later"}
              </button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ConfigDeviceOverlay;
