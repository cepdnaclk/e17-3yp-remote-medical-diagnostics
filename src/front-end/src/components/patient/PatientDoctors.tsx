import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import { ReactComponent as Closebutton } from "../../icons/close-button.svg";
import { Card } from "react-bootstrap";
import axios from "axios";

export interface PatientDoctorsProps {}

export interface PatientDoctorsState {}

class PatientDoctors extends React.Component<
  PatientDoctorsProps,
  PatientDoctorsState
> {
  state = {
    findDoctorPopup: false,
  };

  togglePopup = (): void => {
    //Close the PopUp
    this.setState({ findDoctorPopup: !this.state.findDoctorPopup });
  };

  render() {
    // const valuesArray: Array<Dictionary<string>> = JSON.parse(
    //   this.state.appointments
    // );
    let i = 1;
    return (
      <>
        <div className="d-flex mb-auto mt-5">
          <div>
            {" "}
            &nbsp;
            <div>
              &nbsp;
              <h2>DOCTORS</h2> &nbsp;
            </div>
            <div>
              <Card className="rounded shadow p-3 mb-5 bg-white rounded">
                <table className="table" style={{ width: "800px", margin: 0 }}>
                  <thead>
                    <tr>
                      <th key="pic" scope="col">
                        {" "}
                      </th>
                      <th key="doc" scope="col">
                        Name
                      </th>
                      <th key="esp" scope="col">
                        Speciality
                      </th>
                      <th key="age" scope="col">
                        Age
                      </th>
                      <th key="email" scope="col">
                        Email
                      </th>
                      <th key="rating" scope="col">
                        Rating
                      </th>
                      <th key="add" scope="col">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>

        {/* ===================================================================================================
        =================================================================================================== */}
        <button
          onClick={this.togglePopup}
          type="button"
          className="btn btn-primary btn-lg"
          id="btn-1"
        >
          Find a Doctor
        </button>
        {this.state.findDoctorPopup && (
          <div className="modl-pdoc">
            <div className="overlay-pdoc"></div>
            <div className="find-a-doc-popup">
              <PatientHomeSearchDoctor />
              <button onClick={this.togglePopup} className="close-modl-pdoc">
                <Closebutton />
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default PatientDoctors;
