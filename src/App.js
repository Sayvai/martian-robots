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
    const upperRightCoords = firstLine
      .split(" ")
      .map((coord) => parseInt(coord));

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
    const historicalRobotPositions = [{ x, y, orientation }];

    const [upperXBoundary, upperYBoundary] = upperRightCoords;

    const orientationHashMap = {
      NL: "W",
      NR: "E",
      EL: "N",
      ER: "S",
      SL: "E",
      SR: "W",
      WL: "S",
      WR: "N",
    };

    const plusMinusMap = {
      NO_MOVE: 0,
      PLUS_ONE: +1,
      MINUS_ONE: -1,
    };

    // tuples of single [x, y] coords manoeuvres
    const orientationInstructionHashMap = {
      N: [plusMinusMap.NO_MOVE, plusMinusMap.PLUS_ONE],
      E: [plusMinusMap.PLUS_ONE, plusMinusMap.NO_MOVE],
      S: [plusMinusMap.NO_MOVE, plusMinusMap.MINUS_ONE],
      W: [plusMinusMap.MINUS_ONE, plusMinusMap.NO_MOVE],
    };

    let isLost = false;

    instructions.forEach((instruction) => {
      const {
        x: previousX,
        y: previousY,
        orientation: previousOrientation,
      } = historicalRobotPositions.at(-1);

      let newX = previousX;
      let newY = previousY;
      let newOrientation = previousOrientation;

      switch (instruction) {
        case "R":
          newOrientation = orientationHashMap[`${previousOrientation}R`];
          break;
        case "L":
          newOrientation = orientationHashMap[`${previousOrientation}L`];
          break;
        case "F":
          const [directionX, directionY] =
            orientationInstructionHashMap[newOrientation];
          newX = directionX === plusMinusMap.NO_MOVE ? newX : newX + directionX;
          newY = directionY === plusMinusMap.NO_MOVE ? newY : newY + directionY;
          break;
        default:
          break;
      }

      if (newX > upperXBoundary || newY > upperYBoundary) {
        isLost = true;
      }

      const newRobotPosition = {
        x: newX,
        y: newY,
        orientation: newOrientation,
      };

      historicalRobotPositions.push(newRobotPosition);
    });

    console.log(`HISTORICAL ROBOTO POSITIONS for`, historicalRobotPositions);

    const {
      x: finalX,
      y: finalY,
      orientation: finalOrientation,
    } = historicalRobotPositions.at(-1);

    return `${finalX} ${finalY} ${finalOrientation}${isLost ? " LOST" : ""}`;
  };

  const renderRobots = () => {
    return Array.from(robots).map(([robotNum, robotData]) => {
      console.log("ROBOT DATA", robotData);
      const result = getFinalPosition(robotData);

      const robotResult = `Robot #${robotNum} result: ${result}`;

      return <li key={robotNum}>{robotResult}</li>;
    });
  };

  return (
    <>
      <div className="App">
        <h1>Martian Robots</h1>
        <main>
          <form name="instructions" onSubmit={onHandleInstructions}>
            <textarea
              data-testid="input-instruction"
              ref={textareaInstruction}
            />
            <button type="submit">Submit instructions</button>
            {robots.size > 0 && <ul>{renderRobots()}</ul>}
          </form>
        </main>
      </div>
      <style>{`
        textarea {
          width: 90%;
          height: 50vh;
        }

        ul {
          list-style-type: none;
          padding: 0;
        }
      `}</style>
    </>
  );
}

export default App;
