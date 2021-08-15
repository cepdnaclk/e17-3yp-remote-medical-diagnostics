import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import "../App.css";
import { toggle } from "../globalStates/SidebarState";
import logo from "../logo.svg";
import { RootState } from "../Store";

export interface SidebarProps {
  children: React.ReactElement[];
}
type props = SidebarProps & PropsFromRedux;
export interface SidebarState {}

class Sidebar extends React.Component<props, SidebarState> {
  state = {};
  expandStatus = (): string => {
    let expansion = this.props.isExpanded ? "sidebar open" : "sidebar";
    return (
      expansion +
      " d-flex flex-column flex-shrink-0 p-3 text-black bg-light shadow-lg"
    );
  };
  handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.props.dispatch(toggle());
  };
  render() {
    return (
      <div className={this.expandStatus()}>
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none row ms-2 "
        >
          <span className="fs-3 col">MedGenie</span>
          <img
            className="bi ms-1 col"
            width="50"
            height="50"
            src={logo}
            alt="logo"
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          {this.props.children}
        </ul>
        <button className="float-end" onClick={this.handleToggle}>
          toggle
        </button>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    isExpanded: !state.sidebar.isCollapsed,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(Sidebar);
