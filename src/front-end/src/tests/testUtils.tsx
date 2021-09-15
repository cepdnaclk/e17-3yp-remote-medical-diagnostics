import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider as StateProvider } from "react-redux";
import Store from "../store/Store";

const AllTheProviders: FC = ({ children }) => {
  return <StateProvider store={Store}>{children}</StateProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
