import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "../components/Counter";

test("counter testing", () => {
	render(<Counter />);
	const count = screen.queryAllByRole("heading");
	const counter = screen.queryByTestId("counter");
	const btns = screen.queryAllByRole("button");
	expect(counter.childNodes.length).toBe(4);
	expect(count.length).toBe(1);
	expect(btns.length).toBe(3);
	expect(count[0]).toHaveTextContent(0);
});

it("test Counter Functionality 1", async () => {
	render(<Counter />);
	const startBtn = screen.getByRole("button", { name: /start/i });
	const stopBtn = screen.getByRole("button", { name: /stop/i });
	const resetBtn = screen.getByRole("button", { name: /reset/i });
	const count = screen.queryByRole("heading");
	userEvent.click(startBtn);
	await waitFor(() => {
		expect(startBtn).toBeDisabled();
	});
	expect(stopBtn).toBeEnabled();
	expect(resetBtn).toBeEnabled();
});

it("test Counter Functionality 3", async () => {
	render(<Counter />);

	const startBtn = screen.getByRole("button", { name: /start/i });
	const stopBtn = screen.getByRole("button", { name: /stop/i });
	const resetBtn = screen.getByRole("button", { name: /reset/i });
	const count = screen.queryByRole("heading");
	userEvent.click(resetBtn);
	await waitFor(() => {
		expect(resetBtn).toBeDisabled();
	});
	expect(stopBtn).toBeDisabled();
	expect(startBtn).toBeEnabled();
	expect(count).toHaveTextContent(0);
});

it("Counter running", async () => {
	render(<Counter />);
	const startBtn = screen.getByRole("button", { name: /start/i });
	const stopBtn = screen.getByRole("button", { name: /stop/i });
	const resetBtn = screen.getByRole("button", { name: /reset/i });
	const count = screen.queryByRole("heading");

	userEvent.click(startBtn);
	await waitFor(() => {
		expect(count).toHaveTextContent(3)
	},{timeout:4000});

    userEvent.click(stopBtn);
    await waitFor(()=>{
        expect(stopBtn).toBeDisabled();
    })
    expect(startBtn).toBeEnabled();
    expect(resetBtn).toBeEnabled();
});
