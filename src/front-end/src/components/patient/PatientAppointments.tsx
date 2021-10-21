import { Dictionary } from "@reduxjs/toolkit";
import React, { Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/Store";
import Card from "react-bootstrap/Card";
import { useHistory } from "react-router";
import { getAppointmentsOfUser } from "../../useCases/getAppointmentsOfUser/GetAppointmentsOfUser";
// import { join } from '../../store/globalStates/VideoChat';
// import Store from "../../store/Store";
// import * as actions from '../../store/api';


export interface AppointmentProps {
  appointment: {
    // scheduleId: string; //ObjectID
    doctorName: string,
    doctorSpeciality: string,
    paid: boolean,
    // patient: String, //patient's email
    date: string, //session date
    time: string, //session starting time
  };
}

const Appointment = (props: AppointmentProps) => {
  const history = useHistory();
  const handleButton = ():void => {
    // The appointment should be created
    // Patient should be added to the particular session of the doctor
    history.push(props.appointment.paid? "/chat-room" : "/payments");
  }


  //A doctor component to be put in the list
  return (
    <tr>
      <td>{props.appointment.doctorName}</td>
      <td>{props.appointment.doctorSpeciality}</td>
      <td>{props.appointment.date}</td>
      <td>{props.appointment.time}</td>
      <td>
        {
         props.appointment.paid ? 
        <button onClick ={()=> history.push("/chat-room")} type="button" className="btn btn-primary">Join</button>:
        <button onClick ={()=> history.push("/payments")} type="button" className="btn btn-success">Pay</button>
        }
      </td>
      <td>
        {
          props.appointment.paid && (<span className="badge bg-secondary">Paid</span>)
        }
      </td>

      <td>
      <button type="button" className="btn btn-danger">Delete</button>
      </td>
    </tr>
  );
};



export interface PatientAppointmentsProps { }

type props = PatientAppointmentsProps & PropsFromRedux;

export interface PatientAppointmentsState {
  appointments: {
    doctorName : string;
    doctorSpeciality: string,
    paid:boolean
    date: string;
    time: string;
  }[];
}

class PatientAppointments extends React.Component<props,PatientAppointmentsState> {
  
  hasMounted: boolean = false;
  state = {
    appointments: [],
  };

  appointmentList = () => {
    return this.state.appointments.map((appointment) => {
      return <Appointment appointment={appointment} key={Math.random()} />; // *****Change the Key*******
    });
  };

  getAppointments = async () => {
    try {
      let appointments = await getAppointmentsOfUser(this.props.email) //this.props.email
      
      let appointment_list: any[] = [];

      appointments.forEach((appointment: any) => {
        appointment_list.push({
          doctorName : appointment.doctorName,
          doctorSpeciality : appointment.doctorSpeciality,
          paid:appointment.paid,
          date:appointment.date,
          time:appointment.time,
        }
        );
      });   
      if (this.hasMounted) {
        this.setState({ appointments: appointment_list.slice(0, 7) }); //<---- limit fetched data to 7 entries
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    //fetch doctors from the database
    this.hasMounted = true;
    this.getAppointments();
  };
  componentWillUnmount = () => {
    this.hasMounted = false;
  };

  render() {
    return (
      <div className="d-flex mb-auto mt-5">
        <div>
          {" "}
          &nbsp;
          <div>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>{" "}
            &nbsp;
            <h2>YOUR APPOINTMENTS</h2> &nbsp;
          </div>
          <div>
            <Card className="rounded shadow p-3 mb-5 bg-white rounded">
              <table className="table" style={{ width: "800px", margin: 0 }}>
                <thead>
                  <tr>
                    <th key="doc" scope="col">
                      Doctor
                    </th>
                    <th key="esp" scope="col">
                      Specialty
                    </th>
                    <th key="date" scope="col">
                      Date
                    </th>
                    <th key="time" scope="col">
                      Time
                    </th>
                    <th key="join-pay" scope="col"></th>
                    <th key="paid" scope="col"></th>
                    <th key="delete" scope="col"></th>

                  </tr>
                </thead>
                <tbody>{this.appointmentList()}</tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    email: state.user.email,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PatientAppointments);