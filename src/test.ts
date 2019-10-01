/**
 * @jest-environment jsdom
 */
import React from "react";
import useImageZoom from "./index";

describe("useImageZoom", () => {
  it("useImageZoom should be defined", () => {
    expect(useImageZoom).toBeDefined();
  });
});
