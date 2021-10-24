import * as React from "react";
import Sidebar from "./sidebar";
import SidebarItem from "./sidebarItem";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Appointment } from "../icons/appointment.svg";
import { Switch, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import AddDoctor from "./admin/AddDoctor";

export interface AdminMetaComponentProps {}

type props = AdminMetaComponentProps;

class AdminMeta extends React.Component<props> {
  render() {
    return (
      <Router>
        <div className="d-flex">
          <div className="d-flex flex-column flex-shrink-0 me-3">
            <Sidebar username="admin">
              <SidebarItem name="Home" icon={Home} link="/" />
              <SidebarItem
                name="Other_Activity"
                icon={Appointment}
                link="/somewhere"
              />
            </Sidebar>
          </div>

          <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
            <Switch>
              <Route exact path="/">
                <AddDoctor />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default AdminMeta;
