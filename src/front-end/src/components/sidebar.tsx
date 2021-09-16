import * as React from "react";
import { connect, ConnectedProps } from "react-redux";
import "../App.css";
import { toggle } from "../store/globalStates/SidebarState";
import { RootState } from "../store/Store";
import DropdownMenu from "./dropdownMenu";
import { ReactComponent as ExpandIcon } from "../icons/expandIcon.svg";

export interface SidebarProps {
  children: React.ReactElement[];
  username: string;
}
type props = SidebarProps & PropsFromRedux;
export interface SidebarState { }

class Sidebar extends React.Component<props, SidebarState> {
  state = {
    sidebarExpanded: false,
  };
  expandStatus = (): string => {
    let expansion = "d-flex flex-column p-3 text-black bg-light shadow-lg ";
    return expansion + (this.props.isExpanded ? "sidebar" : "sidebar closed");
  };
  handleToggle: React.MouseEventHandler = (e) => {
    this.props.dispatch(toggle());
    e.preventDefault();
  };

  render() {
    return (
      <div className={this.expandStatus()}>
        <a
          href="/"
          className="d-flex align-items-center justify-content-between mb-3 mb-md-0   text-decoration-none "
        >
          <span className="fs-3 ms-3 ">MedGenie</span>
          <ExpandIcon
            className="d-inline bi"
            width="40"
            height="40"
            onClick={this.handleToggle}
          />
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto ">
          {this.props.children}
        </ul>
        <hr />
        <DropdownMenu
          username={this.props.username}
          sidebarExpanded={this.props.isExpanded}
        />
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
