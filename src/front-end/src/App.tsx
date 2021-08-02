import "./App.css";
import Login from "./Login";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";
import PatientHome from "./PatientHomeComponent";

function App() {
  return (
    <MemoryRouter initialEntries={["/login", "/home"]} initialIndex={0}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/home" component={PatientHome} />
      </div>
    </MemoryRouter>
  );
}

export default App;
