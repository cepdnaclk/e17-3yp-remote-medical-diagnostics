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

<<<<<<< HEAD
function App() {
  return (
    <Provider store={Store}>
      <MemoryRouter
        initialEntries={["/login", "/home", "/test"]}
        initialIndex={0}
      >
        <div>
          <Route path="/login" component={Login} />
          <Route path="/home" component={PatientMeta} />
          <Route path="/test" component={Sidebar} />
          <Route
            path="/appointments/chat-room"
            component={PatientAppointmentsChatRoom}
          />
        </div>
      </MemoryRouter>
    </Provider>
  );
=======
interface AppState {
  isLoading: boolean;
  isAuthenticated: boolean;
}
interface props {}
class App extends React.Component<props, AppState> {
  render() {
    return (
      <AuthProvider>
        <Provider store={Store}>
          <MemoryRouter initialEntries={["/loading"]} initialIndex={0}>
            <Switch>
              <Route
                path="/loading"
                render={(props) => <Loading {...props} />}
              />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/home" Comp={HomeSelector} />
              <Route
                path="/appointments/chat-room"
                component={PatientAppointmentsChatRoom}
              />
            </Switch>
          </MemoryRouter>
        </Provider>
      </AuthProvider>
    );
  }
>>>>>>> c626ee0117e7e0217720fb8498a089c3a95872ca
}

export default App;
