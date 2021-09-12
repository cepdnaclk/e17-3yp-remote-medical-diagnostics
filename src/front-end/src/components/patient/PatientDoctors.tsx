import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import { ReactComponent as Closebutton } from "../../icons/close-button.svg"


export interface PatientDoctorsProps { }

export interface PatientDoctorsState { }

class PatientDoctors extends React.Component<PatientDoctorsProps, PatientDoctorsState> {
  state = {
    findDoctorPopup: false,
  };

  togglePopup = (): void => {//Close the PopUp
    this.setState({ findDoctorPopup: !this.state.findDoctorPopup });
  }



  render() {
    return (
      <>
        <button onClick={this.togglePopup} type="button" className="btn btn-primary btn-lg" id="btn-1">Find a Doctor</button>

        {this.state.findDoctorPopup && (
          <div className="modl-pdoc">
            <div onClick={this.togglePopup} className="overlay-pdoc"></div>
            <div className="find-a-doc-popup">
              <PatientHomeSearchDoctor />
              <button onClick={this.togglePopup} className="close-modl-pdoc"><Closebutton /></button>
            </div>
          </div>
        )}

      </>
    );
  }
}

export default PatientDoctors;
