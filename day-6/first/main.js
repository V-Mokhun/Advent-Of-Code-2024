const fs = require("fs");

const map = fs.readFileSync("../input.txt", "utf-8").split("\n");
const ROWS = map.length;
const COLS = map[0].length;
const guardPositions = new Map();
const arrows = ["^", ">", "v", "<"];
const arrowToDirection = {
  "^": [-1, 0],
  v: [1, 0],
  ">": [0, 1],
  "<": [0, -1],
};

function isOutOfBounds(i, j) {
  if (i < 0 || i >= ROWS || j < 0 || j >= COLS) return true;

  return false;
}

let arrowIndex;
let arrow;
outer: for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (arrows.includes(map[i][j])) {
      arrowIndex = [i, j];
      arrow = map[i][j];
      break outer;
    }
  }
}

let [i, j] = arrowIndex;
while (!isOutOfBounds(i, j)) {
  guardPositions.set(`${i}, ${j}`);
  const [x, y] = arrowToDirection[arrow];

  i += x;
  j += y;

  if (!isOutOfBounds(i + x, j + y) && map[i + x][j + y] === "#") {
    arrow = arrows[(arrows.findIndex((v) => v === arrow) + 1) % arrows.length];
  }
}

console.log("RESULT: ", guardPositions.size);
