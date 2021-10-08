import { Dictionary } from "@reduxjs/toolkit";
import React, { Fragment } from "react";
import { connect, ConnectedProps } from "react-redux";
import Card from "react-bootstrap/Card";
import { RouteComponentProps, withRouter } from "react-router";
// import { join } from '../../store/globalStates/VideoChat';
// import Store from "../../store/Store";
// import * as actions from '../../store/api';

export interface PatientAppointmentsProps extends RouteComponentProps {}

type props = PatientAppointmentsProps & PropsFromRedux;
export interface PatientAppointmentsState {
  appointments: string;
}

class PatientAppointments extends React.Component<
  props,
  PatientAppointmentsState
> {
  constructor(props: props) {
    super(props);
    this.state = {
      appointments:
        '[{"doctor" : "name", "Specialty": "specilaty", "Date" : "xxxx-xx-xx", "Time" : "xxPM" }]',
    };
  }

  enterChatRoom = (props: props) => {
    props.history.push("/chat-room");
    //Store.dispatch(join());
  };

  componentDidMount() {
    //until the api is implemented
    this.setState({
      appointments:
        '[{"id":"1", "doctor" : "Dr.Geller", "Specialty": "Dentist", "Date" : "2019-09-09", "Time" : "5PM", "paid" : "true" }, {"id":"2","doctor" : "Dr.Monica", "Specialty": "Cardiologist", "Date" : "2021-08-07", "Time" : "7PM", "paid" : "false" }]',
    });

    /*Store.dispatch(actions.apiCalled({
      url: "/appointments",
      onSuccess: "",
      onError: ""
    }))*/
  }

  render() {
    const valuesArray: Array<Dictionary<string>> = JSON.parse(
      this.state.appointments
    );
    let i = 1;
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
            <h2>APPOINTMENTS</h2> &nbsp;
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
                    <th key="num" scope="col">
                      #
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {valuesArray.map((item: Dictionary<string>) => {
                    const id = item["id"];
                    return (
                      <tr key={id}>
                        <td key={"doctor"}>{item["doctor"]}</td>
                        <td key={"specialty"}>{item["Specialty"]}</td>
                        <td key={"date"}>{item["Date"]}</td>
                        <td key={"time"}>{item["Time"]}</td>
                        <th scope="row" key={id}>
                          {i++}
                        </th>
                        {item["paid"] === "true" && (
                          <Fragment key={id}>
                            <td key="join">
                              <button
                                key={id}
                                className="btn btn-primary btn-sm"
                                onClick={() => this.enterChatRoom(this.props)}
                              >
                                join
                              </button>
                            </td>
                            <td>
                              <span className="badge bg-secondary">PAID</span>
                            </td>
                          </Fragment>
                        )}
                        {item["paid"] === "false" && (
                          <td key="pay">
                            <button
                              key={id}
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                this.props.history.push("/payments")
                              }
                            >
                              pay
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

const connector = connect();
type PropsFromRedux = ConnectedProps<typeof connector>;
export default withRouter(connector(PatientAppointments));
