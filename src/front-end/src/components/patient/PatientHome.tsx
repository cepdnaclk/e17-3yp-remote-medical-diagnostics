import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import ConfigDeviceOverlay from "./ConfigDeviceOverlay";

export interface PatientHomeProps { }

export interface PatientHomeState { }

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {
    modl:true,
  };
  
  closePopup = ():void =>{
    this.setState({modl : !this.state.modl});
  }


  render() {
    return (
    	<div className= "find-a-doc-box">
    		<PatientHomeSearchDoctor />
        <ConfigDeviceOverlay  st = {this.state.modl} closePopup = {this.closePopup}/>
    	</div>
    );
  }
}

export default PatientHome;
