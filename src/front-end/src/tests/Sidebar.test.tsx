import { render, screen } from "./testUtils";
import SidebarItem from "../components/sidebarItem";
import { ReactComponent as Home } from "../icons/home.svg";
import Sidebar from "../components/sidebar";
import { BrowserRouter as Router } from "react-router-dom";

test("renders sidebar component", () => {
  render(
    <Router>
      <Sidebar username={"username"}>
        <SidebarItem name="Home" icon={Home} link="/" />
        <SidebarItem name="someName" icon={Home} link="/" />
      </Sidebar>
    </Router>
  );
  const linkElement = screen.getByText(/someName/i);
  expect(linkElement).toBeInTheDocument();
});
