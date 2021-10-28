import React from "react";
import DoctorHomeCreateSession from "./DoctorHomeCreateSession";
import { connect, ConnectedProps } from "react-redux";
import { ReactComponent as Trash } from "../../icons/trash.svg";
import { RootState } from "../../store/Store";
import { ReactComponent as Closebutton } from "../../icons/close-button.svg";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import {listSchedules} from "../../useCases/listSchedules/ListSchedules";

export interface SessionProps {
  session: {
    date: string;
    time: string;
    timeRemaining: string;
  };
}
const Session = (props: SessionProps) => {
    let history = useHistory();
    const handleStartBtn = () =>{
        history.push("/chat-room");
    }

  const calculateTimeDiff = (date:string,time:string) =>{
    const now = new Date(); //UTC current date and time
    const time_utc = now.getTime(); //current time in ms (from 1970)

    const offset = (5.5 * 60 * 60 * 1000) //+5:30 TimeZone
    const time_sl = time_utc + offset //current time in ms(SL time)
    const date_2 = new Date(date+"T"+time+":00Z");  //appointment date & time
    const appointment_time = date_2.getTime();  //time in ms
    const time_diff_ms = appointment_time - time_sl //remaining time in ms
    return time_diff_ms; //return time remaining in ms
  }

  const getRemainingTime = (remaining_time:number)=>{
    const time_diff_hrs = remaining_time/(1000*60*60);
    const days = Math.floor(time_diff_hrs/24);
    const hrs = Math.floor(time_diff_hrs - days*24)
    const mins = Math.floor((time_diff_hrs-Math.floor(time_diff_hrs))*60)

    return (days+"d "+hrs+"h "+mins+"m")
  }

  const remaining_time_ms = calculateTimeDiff(props.session.date, props.session.time);

  const remaining_time = getRemainingTime(remaining_time_ms);

  //A doctor component to be put in the list
  return (
    <tr>
      <td>{props.session.date}</td>
      <td>{props.session.time}</td>
      <td>{remaining_time}</td>
      <td key="join"><button className="btn btn-primary" onClick = {handleStartBtn}>Start</button></td>
      <td>
      <button type="button" id = "del-btn" className="btn btn-danger"><Trash/></button>
      </td>
    </tr>
  );
};

export interface DoctorSessionsProps {}
export interface DoctorSessionsState {
  createSessionPopup: boolean;
  sessions: {
    date: string;
    time: string;
    timeRemaining: string;
  }[];
}

type props = DoctorSessionsProps & PropsFromRedux;

class DoctorSessions extends React.Component<props, DoctorSessionsState> {
  hasMounted: boolean = false;
  state = {
    createSessionPopup: false,
    sessions: [],
  };

  togglePopup = (): void => {
    //Close the PopUp
    this.setState({ createSessionPopup: !this.state.createSessionPopup });
  };

  sessionList = () => {
    return this.state.sessions.map((session) => {
      return <Session session={session} key={Math.random()} />; // *****Change the Key*******
    });
  };

  getSessions = async () => {
    try {
      const all_sessions = await listSchedules();
      const sessions = all_sessions.filter((schedule:any) => schedule.doctor === this.props.email);
      let session_list: any[] = [];
      sessions.forEach((doc: any) => {
        session_list.push({
          date: doc.date,
          time: doc.time,
          timeRemaining: doc.time,
        });
      });
      if (this.hasMounted) {
        this.setState({ sessions: session_list.slice(0, 8) }); //<---- fetched data : TODO : Implement Pagination
      }
    } catch (err) {
      console.log(err);
    }
  };

  componentDidMount = () => {
    //fetch doctors from the database
    this.hasMounted = true;
    this.getSessions();
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
              <h2>Sessions</h2> &nbsp;
            </div>
            <div>
              <Card className="rounded shadow p-3 mb-5 bg-white rounded">
                <table className="table" style={{ width: "800px", margin: 0 }}>
                  <thead>
                    <tr>
                      
                      <th key="date" scope="col">
                        Date
                      </th>
                      <th key="time" scope="col">
                        Time
                      </th>
                      <th key="timeRem" scope="col">
                        Time Remaining
                      </th>
                      <th key="start" scope="col">
                        {" "}
                      </th>
                      <th key="del" scope="col">
                        {" "}
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.sessionList()}</tbody>
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
          Create a Session
        </button>
        {/* Modal overlay */}

        {this.state.createSessionPopup && (
          <div className="modl-pdoc">
            <div className="overlay-pdoc"></div>
            <div className="find-a-doc-popup">
              <DoctorHomeCreateSession />
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


const mapStateToProps = (state: RootState) => {
  return {
    email: state.user.email,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(DoctorSessions);
