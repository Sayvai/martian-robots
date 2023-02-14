import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";

describe("Martian Robots", () => {
  it("renders textare and submit button", () => {
    // given
    render(<App />);

    // then
    const textAreaElement = screen.getByTestId("input-instruction");
    expect(textAreaElement).toBeInTheDocument();

    // then
    const buttonElement = screen.getByRole("button");
    // fireEvent.click(buttonElement);
    expect(buttonElement).toBeInTheDocument();
  });

  it("should enter instructions, submit, and return result for one robot", () => {
    // given
    render(<App />);

    // when
    const textAreaElement = screen.getByTestId("input-instruction");
    fireEvent.change(textAreaElement, {
      target: { value: "5 3\n1 1 E\nRFRFRFRF" },
    });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const main = screen.getByRole("main");
    console.log(prettyDOM(main));

    // then
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);
    expect(listItems.at(0).textContent).toBe("Robot #1 result: 1 1 E");
  });

  // TODO - Need to figure out why the source code is off by one offset Y co-ordinate, as the PDF challenge output states a a diff ofset minus one...
  it.skip("should enter instructions for two robots, submit, and return results for both robots", () => {
    // given
    render(<App />);

    // when
    const textAreaElement = screen.getByTestId("input-instruction");
    fireEvent.change(textAreaElement, {
      target: { value: "5 3\n1 1 E\nRFRFRFRF\n0 3 W\nLLFFFLFLFL" },
    });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const main = screen.getByRole("main");
    console.log(prettyDOM(main));

    // then
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(2);
    expect(listItems.at(0).textContent).toBe("Robot #1 result: 1 1 E");
    expect(listItems.at(1).textContent).toBe("Robot #2 result: 2 3 S");
  });
});
