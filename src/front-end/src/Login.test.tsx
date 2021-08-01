import { render, screen } from "@testing-library/react";
import Login from "./Login";
import { Provider } from "react-redux";
import Store from "./Store";
import { MemoryRouter, Route } from "react-router-dom";

test("renders sign in component", () => {
  render(
    <Provider store={Store}>
      <MemoryRouter initialEntries={["/login"]} initialIndex={0}>
        <Route path="/login" component={Login} />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/Sign in to MedGenie/i);
  expect(linkElement).toBeInTheDocument();
});
