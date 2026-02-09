import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { MemoryRouter } from "react-router-dom";
import LoginPatient from "./LoginPatient";

const server = setupServer(
  rest.post("http://localhost:8080/patientDetails/login", (req, res, ctx) => {
    return res(ctx.json({ message: "Login success" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("successful login navigates to home", async () => {
  render(
    <MemoryRouter>
      <LoginPatient />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText("Username"), "john");
  await userEvent.type(screen.getByPlaceholderText("Password"), "123");

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(window.location.pathname).toBe("/home");
});

test("failed login shows alert", async () => {
  server.use(
    rest.post("http://localhost:8080/patientDetails/login", (req, res, ctx) => {
      return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
    })
  );

  render(
    <MemoryRouter>
      <LoginPatient />
    </MemoryRouter>
  );

  await userEvent.type(screen.getByPlaceholderText("Username"), "john");
  await userEvent.type(screen.getByPlaceholderText("Password"), "wrong");

  await userEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(await screen.findByText(/login failed/i)).toBeInTheDocument();
});
