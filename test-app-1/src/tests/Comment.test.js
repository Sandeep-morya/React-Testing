import { render, screen} from "@testing-library/react";
import CommentItem from "../components/CommentItem";
import CommentInput from "../components/CommentInput";
import CommentList from "../components/CommentList";
import userEvent from "@testing-library/user-event";

const data = [
	{ id: 1, title: "hello", status: false },
	{ id: 2, title: "how are You", status: false },
	{ id: 3, title: "nice pic, Dear!", status: true },
];
const fn = jest.fn();

describe(`
//   _______  _______  _______  _______  ___   __    _  _______ 
//  |       ||       ||       ||       ||   | |  |  | ||       |
//  |_     _||    ___||  _____||_     _||   | |   |_| ||    ___|
//    |   |  |   |___ | |_____   |   |  |   | |       ||   | __ 
//    |   |  |    ___||_____  |  |   |  |   | |  _    ||   ||  |
//    |   |  |   |___  _____| |  |   |  |   | | | |   ||   |_| |
//    |___|  |_______||_______|  |___|  |___| |_|  |__||_______|
//  `, () => {
	test("testing CommentInput is containing all necessary tags", () => {
		render(<CommentInput />);
		const inputBox = screen.getByRole("textbox");
		const checkBox = screen.getByRole("checkbox");
		const submitButton = screen.getByRole("button");

		expect(inputBox).toBeInTheDocument();
		expect(checkBox).toBeInTheDocument();
		expect(submitButton).toBeInTheDocument();
	});

	test("testing CommentInput initial Condition", () => {
		render(<CommentInput />);
		const inputBox = screen.getByRole("textbox");
		const checkBox = screen.getByRole("checkbox");
		const submitButton = screen.getByRole("button");
		expect(inputBox.value).toBe("");
		expect(checkBox.checked).toBe(false);
		expect(submitButton).toBeDisabled();
	});

	test("testing CommentInput Functionality", async () => {
		render(<CommentInput />);
		const inputBox = screen.getByRole("textbox");
		const checkBox = screen.getByRole("checkbox");
		const submitButton = screen.getByRole("button");
		// fireEvent.change(inputBox, { target: { value: "welcome" } }); or
		userEvent.type(inputBox, "welcome");
		userEvent.click(checkBox);

		expect(inputBox.value).toBe("welcome");
		expect(checkBox.checked).toBe(true);
		expect(submitButton).toBeEnabled();
	});

	test("testing CommentList Component initail condition", () => {
		const fn = jest.fn();
		render(<CommentList list={[]} handleStatus={fn} />);

		const loader = screen.getByTestId("loader");
		const commentList = screen.queryByTestId("cm-l");
		expect(loader).toBeInTheDocument();
		expect(commentList).toBeNull();
	});

	test("testing CommentItem Initial condition", () => {
		render(<CommentItem item={data[0]} handleStatus={fn} />);

		const commentItem = screen.queryByTestId("cm-i");
		const heading = screen.queryAllByRole("heading");
		const button = screen.queryByRole("button");

		expect(commentItem).toBeInTheDocument();
		expect(button).toBeInTheDocument();
		expect(heading.length).toBe(2);
		expect(heading[0]).toHaveTextContent("hello");
		expect(heading[1]).toHaveTextContent(/not/i);
	});

	test("testing commentList Component working", () => {
		render(<CommentList list={data} handleStatus={fn} />);

		const loader = screen.queryByTestId("loader");
		const commentList = screen.queryByTestId("cm-l");
		const commentItem = screen.queryAllByTestId("cm-i");

		expect(commentList).toBeInTheDocument();
		expect(commentItem.length).toBe(data.length);
		expect(loader).toBeNull();
	});

	test('testing CommentItem functionality',()=>{
		render(<CommentItem item={data[0]} handleStatus={fn} />);

		const heading = screen.queryAllByRole("heading");
		const button = screen.queryByRole("button");

		userEvent.click(button);
		expect(heading[1]).toHaveTextContent(/verified/i)
	})
});
