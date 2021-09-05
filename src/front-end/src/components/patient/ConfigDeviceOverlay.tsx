import * as React from 'react';
import "../../Styles/ConfigDeviceOverlay.css"

export interface ConfigDeviceOverlayProps {
    st: boolean
    closePopup: () => void,
}

export interface ConfigDeviceOverlayState {}

class ConfigDeviceOverlay extends React.Component<ConfigDeviceOverlayProps,ConfigDeviceOverlayState> {
    
    render(){
        return (
                this.props.st && (
                    <div className="modl">
                    <div className="overlay"></div>
                    <div className = "config-device">
                        <label className="b4-u-continue">Before you continue...</label>
                        <div className="text-message">
                            <p>It seems like you haven't configured your device yet. Would you like
                                to set it up now? </p>
                        </div>

                        <div className = "btns">
                            <button className = "overlay-btns" id="now">Setup Now</button> &nbsp;
                            <button onClick={this.props.closePopup} className = "overlay-btns" id="later" >Maybe Later</button>
                        </div>

                    </div>

                </div>
                )
            
        )
    }
}

export default ConfigDeviceOverlay;