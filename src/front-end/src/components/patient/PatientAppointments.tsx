import { Dictionary } from "@reduxjs/toolkit";
import React, { Fragment } from "react";
import { Badge } from "react-bootstrap";

export interface PatientAppointmentsProps { }

export interface PatientAppointmentsState {
  appointments: string;
}

class PatientAppointments extends React.Component<
  PatientAppointmentsProps,
  PatientAppointmentsState
> {
  constructor(props: PatientAppointmentsProps) {
    super(props);
    this.state = { appointments: '[{"doctor" : "name", "Specialty": "specilaty", "Date" : "xxxx-xx-xx", "Time" : "xxPM" }]' }
  }
  componentDidMount() {
    //until the api is implemented 
    this.setState({ appointments: '[{"doctor" : "Dr.Geller", "Specialty": "Dentist", "Date" : "2019-09-09", "Time" : "5PM", "paid" : "true" }, {"doctor" : "Dr.Monica", "Specialty": "Cardiologist", "Date" : "2021-08-07", "Time" : "7PM", "paid" : "false" }]' })
    fetch('http://localhost:5000/api/appointments')
      .then(res => res.json())
      .then((data) => {
        this.setState({ appointments: data })
      })
      .catch(console.log)
  }

  render() {
    const valuesArray: Array<Dictionary<string>> = JSON.parse(this.state.appointments);
    let i = 1;
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} >
        <div>
          <div>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            <h2>APPOINTMENTS</h2>
          </div>
          <div >
            <table className="table" style={{ width: "800px", margin: 0 }}>
              <thead>
                <tr>
                  <th scope="col">Doctor</th>
                  <th scope="col">Specialty</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {valuesArray.map((item: Dictionary<string>) => {
                  return <tr><td>{item["doctor"]}</td>
                    <td>{item["Specialty"]}</td>
                    <td>{item["Date"]}</td>
                    <td>{item["Time"]}</td>
                    <th scope="row">{i++}</th>
                    {item["paid"] === "true" && <Fragment><td><button className="btn btn-primary btn-sm">join</button></td><td><Badge bg="secondary">PAID</Badge></td></Fragment>}
                    {item["paid"] === "false" && <td><button className="btn btn-success btn-sm">pay</button></td>}
                  </tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default PatientAppointments;
