import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, test } from "vitest";
import Home from "../../app/page";

describe("App", () => {
  test("renders App component", () => {
    render(<Home />);

    screen.getByText("テスト")

    screen.getByRole("button")
  });
});