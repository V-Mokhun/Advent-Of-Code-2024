const fs = require("fs");

const map = fs.readFileSync("../input.txt", "utf-8").split("\n");
const ROWS = map.length;
const COLS = map[0].length;
let obstructions = 0;
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

function turnArrow(arrow) {
  return arrows[(arrows.findIndex((v) => v === arrow) + 1) % arrows.length];
}

function replaceAt(str, index, replacement) {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
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

const simulateRoute = (arrow, i, j) => {
  const route = new Map();

  while (!isOutOfBounds(i, j)) {
    const id = `${arrow}-${i}-${j}`;

    if (route.has(id)) {
      return true;
    }

    route.set(id);

    const [x, y] = arrowToDirection[arrow];
    const nextI = i + x;
    const nextJ = j + y;

    if (isOutOfBounds(nextI, nextJ)) {
      break;
    }

    if (map[nextI][nextJ] === "#") {
      arrow = turnArrow(arrow);
    } else {
      i = nextI;
      j = nextJ;
    }
  }

  return false;
};

const [startI, startJ] = arrowIndex;

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (i === startI && j === startJ) continue;
    if (map[i][j] !== ".") continue;

    map[i] = replaceAt(map[i], j, "#");

    if (simulateRoute(arrow, startI, startJ)) {
      obstructions++;
    }

    map[i] = replaceAt(map[i], j, ".");
  }
}

console.log("RESULT: ", obstructions);
