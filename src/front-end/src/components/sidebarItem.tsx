import * as React from "react";
import logo from "../logo.svg";
export interface SidebarItemProps {}

export interface SidebarItemState {}

class SidebarItem extends React.Component<SidebarItemProps, SidebarItemState> {
  state = {};
  render() {
    return (
      <li className="nav-item mb-2">
        <a
          href="/"
          className="nav-link active d-flex  align-items-center"
          aria-current="page"
        >
          <span>Home</span>
          <img
            className="d-inline ms-auto"
            width="36"
            height="36"
            src={logo}
            alt="icon"
          />
        </a>
      </li>
    );
  }
}

export default SidebarItem;
