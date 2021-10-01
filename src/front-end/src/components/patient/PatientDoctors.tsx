import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import { ReactComponent as Closebutton } from "../../icons/close-button.svg";
import Card from "react-bootstrap/Card";
import axios from "axios";

export interface DoctorProps {
  doctor: {
    name: string;
    speciality: string;
    age: number;
    email: string;
    rating: number;
  };
}

const Doctor = (props: DoctorProps) => {
  //A doctor component to be put in the list
  return (
    <tr>
      <td>
        <img
          src="https://github.com/uaudith.png"
          alt=""
          className="rounded-circle me-2"
          width="32"
          height="32"
        />
      </td>

      <td>{props.doctor.name}</td>
      <td>{props.doctor.speciality}</td>
      <td>{props.doctor.age}</td>
      <td>{props.doctor.email}</td>
      <td>{props.doctor.rating}</td>
    </tr>
  );
};

export interface PatientDoctorsProps {}
export interface PatientDoctorsState {
  findDoctorPopup: boolean;
  doctors: {
    name: string;
    speciality: string;
    age: number;
    email: string;
    rating: number;
  }[];
}

class PatientDoctors extends React.Component<
  PatientDoctorsProps,
  PatientDoctorsState
> {
  hasMounted: boolean = false;
  state = {
    findDoctorPopup: false,
    doctors: [],
  };

  togglePopup = (): void => {
    //Close the PopUp
    this.setState({ findDoctorPopup: !this.state.findDoctorPopup });
  };

  doctorList = () => {
    return this.state.doctors.map((doctor) => {
      return <Doctor doctor={doctor} key={Math.random()} />; // *****Change the Key*******
    });
  };

  getDoctors = async () => {
    try {
      const doctors = await axios.get(
        "https://jsonplaceholder.typicode.com/users" //TODO : API
      );

      //======================================================================
      let doc_list: any[] = [];
      doctors.data.forEach((doc: any) => {
        doc_list.push({
          name: doc.name,
          speciality: doc.username,
          age: doc.id,
          email: doc.email,
          rating: doc.id,
        });
      });
      //=======================================================================
      if (this.hasMounted) {
        this.setState({ doctors: doc_list.slice(0, 5) }); //<---- fetched data
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    //fetch doctors from the database
    this.hasMounted = true;
    this.getDoctors();
  };
  componentWillUnmount = () => {
    this.hasMounted = false;
  };

  render() {
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
                        |Btn|
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.doctorList()}</tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>

        <button
          onClick={this.togglePopup}
          type="button"
          className="btn btn-primary btn-lg"
          id="btn-1"
        >
          Find a Doctor
        </button>
        {/* Modal overlay */}

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
