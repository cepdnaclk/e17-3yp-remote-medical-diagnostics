import * as React from "react";
import "../App.css";

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
    return expansion + " d-flex flex-column flex-shrink-0 p-3 bg-light";
  };
  handleToggle: React.MouseEventHandler<HTMLButtonElement> = () => {
    this.setState({
      isExpanded: !this.state.isExpanded,
    });
  };
  render() {
    return (
      <div className={this.expandStatus()}>
        <div>I slide into view</div>
        <div>Me too!</div>
        <div>Mee Three!</div>
        <button className="float-end" onClick={this.handleToggle}>
          toggle
        </button>
      </div>
    );
  }
}

export default Sidebar;
