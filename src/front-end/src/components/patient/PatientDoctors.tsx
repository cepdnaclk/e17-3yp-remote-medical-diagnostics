import React from "react";
import PatientHomeSearchDoctor from "./PatientHomeSearchDoctor";
import { ReactComponent as Closebutton } from "../../icons/close-button.svg";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {listSchedules} from "../../useCases/listSchedules/ListSchedules";
import {makeAppointment} from "../../useCases/makeAppointment/MakeAppointment"
import { RootState } from "../../store/Store";
import { addPatientToSchedule } from "../../useCases/addPatientToSchedule/AddPatientToSchedule";

export interface DoctorProps {
  doctor: {
    _id : string;
    doctor:string; //doctor's email
    name: string;
    speciality: string;
    date: string;
    time: string;
  };
}

const Doctor = (props: DoctorProps) => {
  const user = useSelector((state :RootState) => state.user.email)
  const history = useHistory();
  const handleAddButton = async () => {
    // Create the appointment
    const appointmentData = {
      scheduleId: props.doctor._id,
      doctor:props.doctor.doctor,
      doctorName: props.doctor.name,
      doctorSpeciality: props.doctor.speciality,
      paid: true,
      patient: user, //patient's email
      date: props.doctor.date, //session date
      time: props.doctor.time, //session starting time
    }

    try{
      await makeAppointment(appointmentData);
    }catch(error){
      console.log(error);
    }

    // Patient should be added to the particular session of the doctor
    try{
      await addPatientToSchedule(appointmentData.scheduleId,user)
    }catch(error){
      console.log(error)
    }

    alert(`An appointment to ${props.doctor.name} made`);
    history.push("/appointments");
  }


  //A doctor component to be put in the list
  return (
    <tr>
      <td>
        <img
          src="/fallbackProfilePic.jpg"
          alt=""
          className="rounded-circle me-2"
          width="32"
          height="32"
        />
      </td>

      <td>{props.doctor.name}</td>
      <td>{props.doctor.speciality}</td>
      <td>{props.doctor.date}</td>
      <td>{props.doctor.time}</td>
      <td>
      <button onClick = {handleAddButton} type="button" className="btn btn-info">Add</button>
      </td>
    </tr>
  );
};

export interface PatientDoctorsProps {}
export interface PatientDoctorsState {
  findDoctorPopup: boolean;
  doctors: {
    _id: string;
    doctor:string;
    name: string;
    speciality: string;
    date: string;
    time: string;
  }[];
}

class PatientDoctors extends React.Component<PatientDoctorsProps,PatientDoctorsState>{
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
      const all_schedules = await listSchedules();   
      let schedule_list: any[] = [];
      all_schedules.forEach((schedule:any)=>{
        const {_id,doctor,doctorName,doctorSpecialization,date,time} = schedule; //date - session date, time - starting time
  
            schedule_list.push({
              _id: _id,
              doctor:doctor,
              name: doctorName,
              speciality: doctorSpecialization,
              date:date,
              time:time,
            })
      })

      //  put the data into the table
      if (this.hasMounted) {
        this.setState({ doctors: schedule_list.slice(0, 7) }); //<---- limit fetched data to 7 entries
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
              <h2>AVAILABLE DOCTORS</h2> &nbsp;
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
                      <th key="date" scope="col">
                        Session Date
                      </th>
                      <th key="time" scope="col">
                        Sarting Time
                      </th>
                      <th key="add" scope="col">
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
