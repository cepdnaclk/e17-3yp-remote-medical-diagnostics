import * as React from "react";
import { NavLink } from "react-router-dom";
export interface SidebarItemProps {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  link: string;
}

export interface SidebarItemState {}

class SidebarItem extends React.Component<SidebarItemProps, SidebarItemState> {
  state = {};
  render() {
    return (
      <li className="nav-item mb-2">
        <NavLink
          exact
          activeClassName="active"
          to={this.props.link}
          className="nav-link link-dark d-flex  align-items-center  "
          aria-current="page"
        >
          <span>{this.props.name}</span>
          <this.props.icon
            className="bi d-inline ms-auto"
            width="16px"
            height="16px"
          />
        </NavLink>
      </li>
    );
  }
}

export default SidebarItem;
