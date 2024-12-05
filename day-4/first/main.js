const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
const graph = input.split("\n").map((r) => r.split(""));
const ROWS = graph.length;
const COLS = graph[0].length;
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [-1, -1],
  [-1, 1],
  [1, -1],
];

function isOutOfBounds(i, j) {
  if (i < 0 || i >= ROWS || j < 0 || j >= COLS) return true;

  return false;
}

let res = 0;
for (let i = 0; i < ROWS; i++) {
  const row = graph[i];
  for (let j = 0; j < COLS; j++) {
    if (row[j] !== "X") continue;

    for (const direction of directions) {
      const [x, y] = direction;
      let count = 0;
      let iTemp = i;
      let jTemp = j;
      const word = "XMAS";
      while (
        !isOutOfBounds(iTemp, jTemp) &&
        graph[iTemp][jTemp] === word[count]
      ) {
        count++;
        iTemp += x;
        jTemp += y;

        if (count === word.length) {
          res++;
          break;
        }
      }
    }
  }
}

console.log("RESULT: ", res);
