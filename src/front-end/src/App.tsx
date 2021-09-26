import "./App.css";
import Store from "./store/Store";
import Login from "./components/Login";
import { MemoryRouter, Switch } from "react-router";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import React from "react";
import Loading from "./components/Loading";
import AuthProvider from "./components/AuthContext";
import PatientAppointmentsChatRoom from "./components/patient/PatientChatRoom";
import HomeSelector from "./components/HomeSelector";
import Signup from "./components/Signup";
import Landing from "./components/landing_page/Landing";

interface AppState {
  isLoading: boolean;
  isAuthenticated: boolean;
}
interface props {}
class App extends React.Component<props, AppState> {
  render() {
    return (
      <>
        <AuthProvider>
          <Provider store={Store}>
            <MemoryRouter initialEntries={["/"]} initialIndex={0}>
              <Switch>
                <Route
                  path="/loading"
                  render={(props) => <Loading {...props} />}
                />

                <Route path="/" exact component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />

                <PrivateRoute path="/home" Comp={HomeSelector} />

                <Route
                  path="/appointments/chat-room"
                  component={PatientAppointmentsChatRoom}
                />
              </Switch>
            </MemoryRouter>
          </Provider>
        </AuthProvider>
      </>
    );
  }
}

export default App;
