import React from "react";
import { render, cleanup, act } from "@testing-library/react";
import Application from "components/Application";

afterEach(cleanup);

describe("Appointment", () => {
  it("renders without crashing", async () => {
    await act(async () => {
      render(<Application />);
    });
  });
});