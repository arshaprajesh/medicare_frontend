import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import DoctorRegistration from "./DoctorRegistration";

const server = setupServer(
  rest.get("http://localhost:8080/doctors/types", (req, res, ctx) => {
    return res(ctx.json(["Cardiology", "Dermatology"]));
  }),

  rest.get("http://localhost:8080/doctors/type/Cardiology", (req, res, ctx) => {
    return res(
      ctx.json([
        {
          doctor_id: 1,
          doctor_name: "Dr. John",
          date: "2026-02-01T00:00:00",
          location: "NYC",
          fee: 200,
        },
      ])
    );
  }),

  rest.post("http://localhost:8080/appointment/appointmentDetails", (req, res, ctx) => {
    return res(ctx.json({ appointmentId: 100 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("loads doctor types and selects a doctor", async () => {
  render(
    <MemoryRouter>
      <DoctorRegistration />
    </MemoryRouter>
  );

  // Doctor types load
  expect(await screen.findByText("Cardiology")).toBeInTheDocument();

  // Select type
  await userEvent.selectOptions(screen.getByRole("combobox"), "Cardiology");

  // Doctors load
  expect(await screen.findByText("Dr. John")).toBeInTheDocument();

  // Select doctor checkbox
  await userEvent.click(screen.getByRole("checkbox"));

  // Click register
  await userEvent.click(screen.getByRole("button", { name: /register/i }));

  // Should navigate to payment page
  await waitFor(() => {
    expect(window.location.pathname).toBe("/payment");
  });
});
