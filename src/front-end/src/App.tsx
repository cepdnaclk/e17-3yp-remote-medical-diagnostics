import "./App.css";
import Store from "./Store";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import PatientHome from "./PatientHomeComponent";

function App() {
  return (
    <Provider store={Store}>
      <MemoryRouter initialEntries={["/login", "/home"]} initialIndex={0}>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/home" component={PatientHome} />
        </div>
      </MemoryRouter>
    </Provider>
  );
}

export default App;
