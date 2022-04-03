import React from "react";
import { shallow } from "enzyme";

import UserFields from "./index";

describe("UserFields component", () => {
  const setup = () => {
    const enzymeWrapper = shallow(<UserFields />);

    return { enzymeWrapper };
  };

  it("UserFields should be rendered", () => {
    setup();
  });
});
