import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";

export interface PatientHomeProps { }

export interface PatientHomeState { }

class PatientHome extends React.Component<PatientHomeProps, PatientHomeState> {
  state = {};
  render() {
    return (
    	<div className= "find-a-doc-box">
    		<PatientHomeSearchDoctor />
    	</div>
    );
  }
}

export default PatientHome;
