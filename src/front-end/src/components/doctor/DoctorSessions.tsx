import React from "react";
import DoctorHomeCreateSession from "./DoctorHomeCreateSession";
import { connect, ConnectedProps } from "react-redux";
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
  //A doctor component to be put in the list
  return (
    <tr>
      <td>{props.session.date}</td>
      <td>{props.session.time}</td>
      <td>{props.session.timeRemaining}</td>
      <td key="join"><button className="btn btn-primary btn-sm" onClick = {handleStartBtn}>Start</button></td>
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
