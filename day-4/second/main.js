const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
const graph = input.split("\n").map((r) => r.split(""));
const ROWS = graph.length;
const COLS = graph[0].length;
const directions = [
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];
const oppositeDirections = [
  [
    [1, 1],
    [-1, -1],
  ],
  [
    [1, -1],
    [-1, 1],
  ],
];

function isOutOfBounds(i, j) {
  if (i < 0 || i >= ROWS || j < 0 || j >= COLS) return true;

  return false;
}

let res = 0;
for (let i = 0; i < ROWS; i++) {
  const row = graph[i];
  inner: for (let j = 0; j < COLS; j++) {
    if (row[j] !== "A") continue;

    for (const direction of directions) {
      const [x, y] = direction;
      if (isOutOfBounds(i + x, j + y)) {
        continue inner;
      }
    }

    let isCorrect = true;
    for (const oppositeDirection of oppositeDirections) {
      const [direction, opposite] = oppositeDirection;
      const [x, y] = direction;
      const [oppositeX, oppositeY] = opposite;
      const letter = graph[i + x][j + y];
      const oppositeLetter = graph[i + oppositeX][j + oppositeY];

      if (
        !(
          (letter === "M" && oppositeLetter === "S") ||
          (letter === "S" && oppositeLetter === "M")
        )
      ) {
        isCorrect = false;
      }
    }

    if (isCorrect) {
      res++;
    }
  }
}

console.log("RESULT: ", res);
