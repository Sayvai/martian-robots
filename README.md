# Martian Robots

This is a simple app to build a Martian Robots input and output processor.

When you run the app, and for the first line, enter the initial size of the grid coordinates using X and Y formats (e.g. "5 3"),

On each subsequent two lines thereafter, follows instructions per robot.

a) For the 1st robot line instruction, it should indicate its starting X and Y position on the behind-the-scenes grid, followed by a singular character representation of orientation, delimited by a space. (e.g. "1 1 E")

b) For the 2nd robot line instruction, it should indicate a sequence of instructions, limited to R (orient right), L (orient left), F (move forward). (e.g. "RFRFRFRF").

Repeat a) and b) to apply instructions for multiple robots.

Once you're ready to get the final robot positions, then click on the button labelled "Submit instructions", and the results will be output as a list at the bottom of the page.

You may view an example demonstration on how to use the app, below:

![Martian Robots GIF - Usage Demonstration](https://user-images.githubusercontent.com/7581546/218867691-8156bbb4-98dc-4efb-990a-28a7d1c1bc87.gif)

## Getting Started with Create React App

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Known bugs

- When inserting the following instruction, the output is slightly off by 1 (Y coordinate) when compared to PDF result. A skipped (failing) unit test is implemented for now. There is a possibility that my initial implementation is correct, and the expected output outlined from PDF is slightly incorrect?

Input:

```
0 3 W
LLFFFLFLFL
```

Expected Output (from PDF instructions):

```
2 3 S
```

Actual Output:

```
2 4 S LOST
```

## Missing tasks / future considerations

- Implement "Lost" (out-of-bounds) functionality ✅ (implemented within 10 minutes of resumption of work, post-submission.)
- Implement validation of text instruction entries. 2 skipped unit tests implemented for the error validation scenarios. 👉 **Possible solution**: implement separate validation functions to check for maximum coordinate value, and instruction string length limit, and invoke those validation functions within onHandleInstructions(). If there are any validation errors, then push to new local component state `[errors, setErrors]` as an array of errors, and render out all invalid messages, and stop from further processing instructions.
- Refactor out calculations into its own exportable functions to be imported into the component. Easier to write isolated unit tests per function.
- Style up the component better
