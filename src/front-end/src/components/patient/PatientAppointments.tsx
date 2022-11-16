import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/Store";
import Card from "react-bootstrap/Card";
import { ReactComponent as Trash } from "../../icons/trash.svg";
import "../../Styles/PatientAppointments.css";
//import {useDispatch} from "react-redux"
//import { join } from '../../store/globalStates/VideoChat';
//import Store from "../../store/Store";
import { useHistory } from "react-router";
import { getAppointmentsOfUser } from "../../useCases/getAppointmentsOfUser/GetAppointmentsOfUser";
import { deleteAppointment } from "../../useCases/deleteAppointment/DeleteAppointment";
import { removePatientFromSchedule } from "../../useCases/removePatientFromSchedule/RemovePatientFromSchedule";

export interface AppointmentProps {
  appointment: {
    appointment_id:string;
    schedule_id: string; //ObjectID
    doctorName: string,
    doctor:string, //doctor's email
    doctorSpeciality: string,
    patient: string, //patient's email
    paid: boolean,
    date: string, //session date
    time: string, //session starting time
  };

  deleteAppointment: any;
}

const Appointment = (props: AppointmentProps) => {
  const history = useHistory();

  //==========================================PLEASE========================================
  
  // const dispatch = useDispatch();
  // const handleJoin = (doctorEmail : string) =>{
  //   dispatch(join({ email: doctorEmail }));
  //   history.push("/chat-room");
  // }

  //========================================================================================


  const handleDelete = async (appointment_id:string, schedule_id:string, patient: string) =>{
    //  1. Delete the appointment from the appointments collection
    //  2. Remove the patient from the patient list of the schedule
    try{
      await deleteAppointment(appointment_id);
      await removePatientFromSchedule(schedule_id,patient);
    }catch(error){
      console.log(error);
    }

    props.deleteAppointment(appointment_id);
  }

  //An appointment component to be put in the list
  return (
    <tr>
      <td>{props.appointment.doctorName}</td>
      <td>{props.appointment.doctorSpeciality}</td>
      <td>{props.appointment.date}</td>
      <td>{props.appointment.time}</td>
      <td>
        {
          props.appointment.paid && (<label id = "paid-badge"> &#10003; Paid</label>)
        }
      </td>
      <td>
        {
         props.appointment.paid ? 
        <button onClick = {()=> history.push("/chat-room")} type="button" className="btn btn-primary">Join</button>:
        <button onClick ={()=> history.push("/payments")} type="button" className="btn btn-success">Pay</button>
        }
      </td>

      <td>
      <button onClick = {() => handleDelete(props.appointment.appointment_id,props.appointment.schedule_id,props.appointment.patient)} type="button" id = "del-btn" className="btn btn-danger">
        <Trash/>
        </button>
      </td>
    </tr>
  );
};



export interface PatientAppointmentsProps { }

type props = PatientAppointmentsProps & PropsFromRedux;

export interface PatientAppointmentsState {
  appointments: {
    appointment_id : string,
    schedule_id : string,
    doctorName : string;
    doctor: string; //doctor's email
    doctorSpeciality: string,
    patient:string, //patient's email
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

  deleteAppointment= (id :string) =>{
    this.setState({
      appointments : this.state.appointments.filter((appointment:any) => appointment.appointment_id !== id)
    })
  }
  
  appointmentList = () => {
    return this.state.appointments.map((appointment:any) => {
      return <Appointment appointment={appointment} key={appointment.appointment_id} deleteAppointment = {this.deleteAppointment}/>;
    });
  };


  getAppointments = async () => {
    try {
      let appointments = await getAppointmentsOfUser(this.props.email) //this.props.email
      
      let appointment_list: any[] = [];

      appointment_list = appointments.map((appointment : any) => {
        return ({
          appointment_id : appointment._id,
          schedule_id : appointment.scheduleId,
          doctorName : appointment.doctorName,
          doctor: appointment.doctor,
          doctorSpeciality : appointment.doctorSpeciality,
          patient:appointment.patient,
          paid:appointment.paid,
          date:appointment.date,
          time:appointment.time,
        })
      })
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