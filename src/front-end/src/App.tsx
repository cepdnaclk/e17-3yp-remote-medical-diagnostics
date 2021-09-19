import "./App.css";
import Store from "./store/Store";
import Login from "./components/Login";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import PatientMeta from "./components/PatientMetaComponent";
import Sidebar from "./components/sidebar";
import PatientAppointmentsChatRoom from "./components/patient/PatientChatRoom";

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
}

export default App;
