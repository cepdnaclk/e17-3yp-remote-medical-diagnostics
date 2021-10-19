import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import "../../App.css";
import { ReactComponent as Calendar } from "../../icons/calendar.svg";
import { ReactComponent as Globe } from "../../icons/globe.svg";
import { ReactComponent as Clock } from "../../icons/clock.svg";



export interface PatientHomeSearchDoctorState {
    date: string;
    time: string;
    language: string;
}

class PatientHomeSearchDoctor extends React.Component<
  RouteComponentProps,
  PatientHomeSearchDoctorState
> {
  state = {
    date: "",
    time:"",
    language: "sinhala",
    
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    alert(
    `${this.state.date} | ${this.state.language} | ${this.state.time}`
    );
    e.preventDefault();
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

export default withRouter(PatientHomeSearchDoctor);
