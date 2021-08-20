import { render, screen } from "./testUtils";
import Login from "../components/Login";
import { MemoryRouter, Route } from "react-router-dom";

test("renders sign in component", () => {
  render(
    <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
      <Route path="/login" component={Login} />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Sign in to MedGenie/i);
  expect(linkElement).toBeInTheDocument();
});
