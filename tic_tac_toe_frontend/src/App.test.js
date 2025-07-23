import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders statusbar and reset button", () => {
  render(<App />);
  // Statusbar exists ("Next Player" should be visible when new game)
  expect(screen.getByText(/next player/i)).toBeInTheDocument();
  // Reset button exists
  expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
});
