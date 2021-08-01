import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "./Login";

test("renders sign in component", () => {
  render(<Login />);
  const linkElement = screen.getByText(/Sign in to MedGenie/i);
  expect(linkElement).toBeInTheDocument();
});
