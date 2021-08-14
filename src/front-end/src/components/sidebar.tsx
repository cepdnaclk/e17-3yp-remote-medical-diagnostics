import * as React from "react";
import "../App.css";
import logo from "../logo.svg";
import SidebarItem from "./sidebarItem";
export interface SidebarProps {}

export interface SidebarState {
  isExpanded: boolean;
}

class Sidebar extends React.Component<SidebarProps, SidebarState> {
  state = {
    isExpanded: true,
  };
  expandStatus = (): string => {
    const { isExpanded } = this.state;
    let expansion = isExpanded ? "sidebar open" : "sidebar";
    return expansion + " d-flex flex-column flex-shrink-0 p-3 text-white";
  };
  handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };
  render() {
    return (
      <div className={this.expandStatus()}>
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none row ms-2 "
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

export default Sidebar;
