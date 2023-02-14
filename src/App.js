import logo from "./logo.svg";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const textareaInstruction = useRef(null);
  const [upperRightCoords, setUpperRightCoords] = useState([0, 0]);
  const [robots, setRobots] = useState(new Map());

  function onHandleInstructions(event) {
    event.preventDefault();
    const lines = textareaInstruction.current.value.split("\n");

    // Set initial grid
    const firstLine = lines.shift();
    const upperRightCoords = firstLine.split(" ");
    setUpperRightCoords(upperRightCoords);

    let currentRobotNum = 0;

    // set Map of robots
    const intiialRobotsMap = lines.reduce((acc, line, index) => {
      const isEven = index % 2 === 0;

      if (isEven) {
        // parse robot position
        currentRobotNum = ++currentRobotNum;

        const firstRobotLine = line.split(" ");
        const [x, y, orientation] = firstRobotLine;
        acc.set(currentRobotNum, {
          x: parseInt(x),
          y: parseInt(y),
          orientation,
        });
      } else {
        // parse robot instructions
        const secondRobotLine = line.split(""); // array of instructions (e.g. [F,R,R,F,L,L,F,F,R,R,F,L,L])

        const currentRobotData = acc.get(currentRobotNum);

        acc.set(currentRobotNum, {
          ...currentRobotData,
          instructions: secondRobotLine,
        });
      }

      return acc;
    }, new Map());

    setRobots(intiialRobotsMap);
  }

  const getFinalPosition = ({ x, y, orientation, instructions }) => {
    // Crunch the robot inctructions..
  };

  const renderRobots = () => {
    return Array.from(robots).map(([robotNum, robotData]) => {
      console.log("ROBOT DATA", robotData);
      const result = getFinalPosition(robotData);

      const robotResult = `Robot #${robotNum} result: ${result};`;

      return <li key={robotNum}>{robotResult}</li>;
    });
  };

  return (
    <>
      <div className="App">
        <h1>Martian Robots</h1>
        <main>
          <form name="instructions" onSubmit={onHandleInstructions}>
            <textarea ref={textareaInstruction} />
            <button type="submit">Submit instructions</button>
            {robots.size > 0 && <ul>{renderRobots()}</ul>}
          </form>
        </main>
      </div>
      <style>{``}</style>
    </>
  );
}

export default App;
