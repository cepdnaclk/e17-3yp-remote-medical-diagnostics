import * as React from "react";

import { RouteComponentProps, withRouter } from "react-router-dom";
import "../../App.css";
import { ReactComponent as SearchIcon } from "../../icons/search.svg";
import { ReactComponent as Calendar } from "../../icons/calendar.svg";
import { ReactComponent as Specialization } from "../../icons/specialization.svg";
import { ReactComponent as Person } from "../../icons/person.svg";

export interface PatientHomeSearchDoctorState {
  name: string;
  specialization: string;
  date: string;
}

class PatientHomeSearchDoctor extends React.Component<
  RouteComponentProps,
  PatientHomeSearchDoctorState
> {
  state = {
    name: "",
    specialization: "general-practitioner",
    date: "",
  };

  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined = async (
    e
  ) => {
    alert(
      `${this.state.name} | ${this.state.specialization} | ${this.state.date}`
    );
    e.preventDefault();
    this.props.history.push("/doctors");
  };

  handleNameChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      name: e.currentTarget.value,
    });
  };

  handleSpecializationChange = (
    e: React.FormEvent<HTMLSelectElement>
  ): void => {
    this.setState({
      specialization: e.currentTarget.value,
    });
  };



  handleDateChange = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({
      date: e.currentTarget.value,
    });
  };

  render() {
    const { name, specialization,  date } = this.state;

    return (
      <div className="find-a-doctor shadow-sm">
        <div className="mb-3">Find a Doctor</div>
        <form onSubmit={this.handleSubmit} className="d-flex flex-column">
          <label className="find-a-doctor-input-field">
            &nbsp;&nbsp;
            <Person />
            &nbsp;&nbsp;
            <input
              type="text"
              value={name}
              onChange={this.handleNameChange}
              placeholder="Name"
              className="find-a-doctor-input"
            />
          </label>

          <label className="find-a-doctor-input-field">
            &nbsp;&nbsp;
            <Specialization />
            &nbsp;&nbsp;
            <select
              className="find-a-doctor-input"
              value={specialization}
              onChange={this.handleSpecializationChange}
            >
              <option value="general-practitioner">General Practitioner</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="Allergist">Allergist</option>
            </select>
          </label>

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
          <button type="submit" className="find-a-doctor-button">
            <SearchIcon />
            &nbsp; Search
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(PatientHomeSearchDoctor);
