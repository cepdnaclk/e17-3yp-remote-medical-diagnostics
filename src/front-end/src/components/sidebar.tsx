import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import "../App.css";
import { toggle } from "../globalStates/SidebarState";
import logo from "../logo.svg";
import { RootState } from "../Store";
import DropdownMenu from "./dropdownMenu";

export interface SidebarProps {
  children: React.ReactElement[];
  username: string;
}
type props = SidebarProps & PropsFromRedux;
export interface SidebarState {
  dropdownExpanded: boolean;
}

class Sidebar extends React.Component<props, SidebarState> {
  state = {
    dropdownExpanded: false,
  };
  expandStatus = (): string => {
    let expansion = "d-flex flex-column p-3 text-black bg-light shadow-lg ";
    return expansion + (this.props.isExpanded ? "sidebar" : "sidebar closed");
  };
  handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.props.dispatch(toggle());
  };

  render() {
    return (
      <div className={this.expandStatus()}>
        <a
          href="/"
          className="d-flex align-items-center justify-content-between mb-3 mb-md-0   text-decoration-none "
        >
          <span className="fs-3 ms-3 ">MedGenie</span>
          <img
            className="d-inline "
            width="50"
            height="50"
            src={logo}
            alt="logo"
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto ">
          {this.props.children}
        </ul>
        <hr />
        <DropdownMenu username={this.props.username} />

        <button className="mt-1" onClick={this.handleToggle}>
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
