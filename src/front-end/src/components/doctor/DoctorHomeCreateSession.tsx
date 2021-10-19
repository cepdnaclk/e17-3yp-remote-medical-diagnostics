import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import Store, { RootState } from "../../store/Store";
import { RouteComponentProps, withRouter } from "react-router-dom";
import "../../App.css";
import { ReactComponent as Calendar } from "../../icons/calendar.svg";
import { ReactComponent as Globe } from "../../icons/globe.svg";
import { ReactComponent as Clock } from "../../icons/clock.svg";
import { addSchedule } from "../../useCases/addSchedule/AddSchedule";


type props = RouteComponentProps & PropsFromRedux;

export interface DoctorHomeCreateSessionState {
    date: string;
    time: string;
    language: string;
}

class PatientHomeSearchDoctor extends React.Component<
  props,
  DoctorHomeCreateSessionState
> {
  state = {
    date: "",
    time:"",
    language: "sinhala",
    
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault();
    const {date, time } = this.state;
    
    const scheduleData = {
      doctor:this.props.email,
      date: date,
      time: time,
      patients: new Array<string>(),
    }

    try{
      await addSchedule(scheduleData);
    }catch(error){
      console.log(error);
    }

    alert("Session was successfully created");
    this.props.history.push("/sessions");
  };

  handleDateChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      date: e.currentTarget.value,
    });
  };

  handleTimeChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      time: e.currentTarget.value,
    });
  };
  handleLanguageChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    this.setState({
      language: e.currentTarget.value,
    });
  };

  

  render() {
    const { language, date , time} = this.state;

    return (
      <div className="find-a-doctor shadow-sm">
        <div className="mb-3">Create a Session</div>
        <form onSubmit={this.handleSubmit} className="d-flex flex-column">

            <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;
                <Calendar />
                &nbsp;&nbsp;
                <input
                type="date"
                value={date}
                onChange={this.handleDateChange}
                placeholder="Date"
                className="find-a-doctor-input"
                />
            </label>

            <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;
                <Clock />
                &nbsp;&nbsp;
                <input
                type="time"
                value={time}
                onChange={this.handleTimeChange}
                placeholder="Time"
                className="find-a-doctor-input"
                />
            </label>

        {/* Language */}
          <label className="find-a-doctor-input-field">
            &nbsp;&nbsp;
            <Globe />
            &nbsp;&nbsp;
            <select
              className="find-a-doctor-input"
              value={language}
              onChange={this.handleLanguageChange}
            >
              <option value="sinhala">සිංහල​​</option>
              <option value="tamil">தமிழ்</option>
              <option value="english">English</option>
            </select>
          </label>

         
          <button type="submit" className="find-a-doctor-button">
            &nbsp; Create Session
          </button>
        </form>
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
export default connector(withRouter(PatientHomeSearchDoctor));
