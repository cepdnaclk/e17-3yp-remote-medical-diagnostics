import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../Store";
import Sidebar from "./sidebar";
import SidebarItem from "./sidebarItem";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Appointment } from "../icons/appointment.svg";
import { ReactComponent as Doctor } from "../icons/doctor.svg";
import { ReactComponent as CreditCard } from "../icons/creditCard.svg";

export interface PatientHomeProps {}
export interface PatientHomeState {}
type props = PropsFromRedux & PatientHomeProps;

class PatientHome extends React.Component<props, PatientHomeState> {
  state = {};
  render() {
    return (
      // <h2>Good Morning {this.props.firstName} </h2>
      <div className="d-flex">
        <div className="d-flex flex-column flex-shrink-0 text-white">
          <Sidebar>
            <SidebarItem name="Home" icon={Home} />
            <SidebarItem name="Appointments" icon={Appointment} />
            <SidebarItem name="Doctors" icon={Doctor} />
            <SidebarItem name="Payments" icon={CreditCard} />
          </Sidebar>
        </div>
        <div className="flex-column">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur,
          facilis.
        </div>
      </div>
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
export default connector(PatientHome);
