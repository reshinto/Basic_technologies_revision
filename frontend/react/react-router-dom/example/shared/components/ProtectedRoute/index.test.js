import React from "react";
import { shallow } from "enzyme";

import ProtectedRoute from "./index";

const mockedInitialized = jest.fn().mockReturnValue({});

const setup = () => {
  const props = { component: "Table" };
  const enzymeWrapper = shallow(<ProtectedRoute {...props} />);
  const renderComponent = enzymeWrapper.find("Route").renderProp("render")();

  return { renderComponent, props };
};

describe("ProtectedRoute component", () => {
  it("Should render passed component if authenticated", () => {
    mockedInitialized.mockReturnValue({
      authenticated: true
    });

    const { renderComponent, props } = setup();
    const { component } = props;

    expect(renderComponent.find(component).exists()).toBeTruthy();
  });

  it("Should redirect if not authenticated", () => {
    mockedInitialized.mockReturnValue({ authenticated: false });

    const { renderComponent } = setup();

    expect(renderComponent.find("Login").exists()).toBeTruthy();
  });
});
