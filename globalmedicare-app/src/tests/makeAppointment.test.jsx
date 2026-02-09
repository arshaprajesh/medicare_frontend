import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MakeAppointment from "./MakeAppointment";

test("shows appointment confirmation message", () => {
  const state = {
    doctorId: 1,
    doctorName: "Dr. John",
    location: "NYC",
    date: "2026-02-01",
  };

  render(
    <MemoryRouter initialEntries={[{ pathname: "/payment", state }]}>
      <MakeAppointment />
    </MemoryRouter>
  );

  expect(
    screen.getByText(/Booked an appointment with Dr. John/)
  ).toBeInTheDocument();
});
