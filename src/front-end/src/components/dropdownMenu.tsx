import React, { MouseEventHandler } from "react";

export interface DropdownMenuProps {
  username: string;
  sidebarExpanded: boolean;
}

export interface DropdownMenuState {
  expanded: boolean;
}

class DropdownMenu extends React.Component<
  DropdownMenuProps,
  DropdownMenuState
> {
  state = {
    expanded: false,
  };
  dropdownStyle: React.CSSProperties = {
    position: "absolute",
    inset: "auto auto 0px 0px",
    margin: "0px",
    transform: "translate(0px, -34px)",
  };
  getUlClassName = (): string => {
    let fixed = "dropdown-menu text-small shadow ";
    return fixed + (this.state.expanded ? "show" : "");
  };
  toggleDropdown: MouseEventHandler<HTMLAnchorElement> = (e) => {
    e.preventDefault();
    this.setState({
      expanded: !this.state.expanded,
    });
    console.log("open dropdown called");
  };
  //   closeDropdown = () => {
  //     console.log("close dropdown called");

  //     this.setState({
  //       expanded: false,
  //     });
  //     // document.removeEventListener("click", this.closeDropdown);
  //   };
  render() {
    return (
      <div className="dropdown">
        <a
          href="/"
          className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
          id="dropdownUser2"
          data-bs-toggle="dropdown"
          aria-expanded={this.state.expanded ? "true" : "false"}
          onClick={this.toggleDropdown}
        >
          <img
            src="https://github.com/uaudith.png"
            alt=""
            className="rounded-circle me-2"
            width="32"
            height="32"
          />
          {this.props.sidebarExpanded ? (
            <strong>{this.props.username}</strong>
          ) : null}
        </a>

        <ul
          className={this.getUlClassName()}
          data-popper-placement="top-start"
          style={this.dropdownStyle}
        >
          <li>
            <a className="dropdown-item" href="/">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="/">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="/">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default DropdownMenu;
