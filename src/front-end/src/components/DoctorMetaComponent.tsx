import * as React from "react";
import Sidebar from "./sidebar";
import SidebarItem from "./sidebarItem";
import { ReactComponent as Home } from "../icons/home.svg";
import { ReactComponent as Appointment } from "../icons/appointment.svg";
import { Switch, Route } from "react-router";
import DoctorHome from "./doctor/DoctorHome";
import DoctorSessions from "./doctor/DoctorSessions";
import DoctorChatRoom from "./doctor/DoctorChatRoom";

export interface DoctorMetaComponentProps { }

type props = DoctorMetaComponentProps;

class DoctorMeta extends React.Component<props> {
  render() {
    return (
      <>
        <div className="d-flex">
          <div className="d-flex flex-column flex-shrink-0 me-3">
            <Sidebar username="Username">
              <SidebarItem name="Home" icon={Home} link="/" />
              <SidebarItem
                name="Sessions"
                icon={Appointment}
                link="/sessions"
              />
            </Sidebar>
          </div>

          <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column">
            <Switch>
              <Route exact path="/">
                <DoctorHome />
              </Route>
              <Route path="/sessions">
                <DoctorSessions />
              </Route>

              <Route path="/chat-room">
                <DoctorChatRoom />
              </Route>
              {/*
              <Route path="/profile">
                <Profile />
              </Route> */}
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

export default DoctorMeta;
