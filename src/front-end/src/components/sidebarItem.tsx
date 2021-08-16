import * as React from "react";
export interface SidebarItemProps {
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export interface SidebarItemState {}

class SidebarItem extends React.Component<SidebarItemProps, SidebarItemState> {
  state = {};
  render() {
    return (
      <li className="nav-item mb-2">
        <a
          href="/"
          className="nav-link active d-flex  align-items-center  "
          aria-current="page"
        >
          <span>{this.props.name}</span>
          <this.props.icon
            className="d-inline ms-auto"
            fill="white"
            width="16px"
            height="16px"
          />
        </a>
      </li>
    );
  }
}

export default SidebarItem;
