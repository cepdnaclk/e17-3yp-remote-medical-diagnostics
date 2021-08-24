import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../Store";
import { Switch, Route } from "react-router";
import Sidebar from "./sidebar";
import SidebarItem from "./sidebarItem";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Appointment } from "../icons/appointment.svg";
import { ReactComponent as Doctor } from "../icons/doctor.svg";
import { ReactComponent as CreditCard } from "../icons/creditCard.svg";
import PatientHome from "./patient/PatientHome";
import PatientAppointments from "./patient/PatientAppointments";
import PatientDoctors from "./patient/PatientDoctors";
import PatientPayments from "./patient/PatientPayments";
import { BrowserRouter as Router } from "react-router-dom";

export interface PatientHomeProps { }
export interface PatientHomeState { }
type props = PropsFromRedux & PatientHomeProps;

class PatientMeta extends React.Component<props, PatientHomeState> {
  state = {};
  render() {
    return (
      <Router>
        <div className="d-flex">
          <div className="d-flex flex-column flex-shrink-0 me-3">
            <Sidebar username={this.props.firstName}>
              <SidebarItem name="Home" icon={Home} link="/" />
              <SidebarItem
                name="Appointments"
                icon={Appointment}
                link="/appointments"
              />
              <SidebarItem name="Doctors" icon={Doctor} link="/doctors" />
              <SidebarItem name="Payments" icon={CreditCard} link="/payments" />
            </Sidebar>
          </div>

          <div className="flex-column">
            <Switch>
              <Route exact path="/">
                <PatientHome />
              </Route>
              <Route path="/appointments">
                <PatientAppointments />
              </Route>
              <Route path="/doctors">
                <PatientDoctors />
              </Route>
              <Route path="/payments">
                <PatientPayments />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    firstName: state.user.firstName,
  };
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PatientMeta);
