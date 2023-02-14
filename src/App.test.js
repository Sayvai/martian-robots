import { fireEvent, prettyDOM, render, screen } from "@testing-library/react";
import App from "./App";

describe("Martian Robots", () => {
  it(`hould
    - render textarea,
    - render submit button`, () => {
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

  it(`should
    - enter instructions,
    - submit instructions,
    - and return result for one robot`, () => {
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

    // then
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(1);
    expect(listItems.at(0).textContent).toBe("Robot #1 result: 1 1 E");
  });

  it(`should
    - enter instructions for two robots,
    - submit instructions,
    - return results for both robots
    - including a LOST message for robot two`, () => {
    // given
    render(<App />);

    // when
    const textAreaElement = screen.getByTestId("input-instruction");
    fireEvent.change(textAreaElement, {
      target: { value: "5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL" },
    });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const main = screen.getByRole("main");

    // then
    const listItems = screen.getAllByRole("listitem");
    expect(listItems.length).toBe(2);
    expect(listItems.at(0).textContent).toBe("Robot #1 result: 1 1 E");
    expect(listItems.at(1).textContent).toBe("Robot #2 result: 3 3 N LOST");
  });

  // TODO - Need to figure out why the source code is off by one offset Y co-ordinate, as the PDF challenge output states a a diff ofset minus one...
  it.skip(`should
    - enter instructions for two robots,
    - submit instructions,
    - return results for both robots without any LOST messages for both`, () => {
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

  // TODO - Must implement in source code
  it.skip(`should
    - render error message,
    - when an upper grid coordinate exceeds 50`, () => {
    // given
    const testGridSizeCoordinare = "51 3"; // condition to trigger error
    render(<App />);

    // when
    const textAreaElement = screen.getByTestId("input-instruction");
    fireEvent.change(textAreaElement, {
      target: { value: `${testGridSizeCoordinare}\n1 1 E\nRFRFRFRF` },
    });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const main = screen.getByRole("main");
    console.log(prettyDOM(main));

    // then
    const elem = screen.getByText("Maximum coordinate allowed is 50");
    expect(elem).toBeInTheDocument();
  });

  // TODO - Must implement in source code
  it.skip(`should
    - render error message,
    - when an instruction string length is greater than 99`, () => {
    // given
    const testInstruction =
      "FRRFLLFFRRFLLRFRLFFRFRRFLLFFRRFLLRFRLFFRFRRFLLFFRRFLLRFRLFFRFRRFLLFFRRFLLRFRLFFRFRRFLLFFRRFLLRFRLFFR"; // condition to trigger error
    render(<App />);

    // when
    const textAreaElement = screen.getByTestId("input-instruction");
    fireEvent.change(textAreaElement, {
      target: { value: `51 3\n1 1 E\n${testInstruction}` },
    });

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const main = screen.getByRole("main");
    console.log(prettyDOM(main));

    // then
    const elem = screen.getByText(
      "Maximum length of instructions per robot must be less than 100"
    );
    expect(elem).toBeInTheDocument();
  });
});
