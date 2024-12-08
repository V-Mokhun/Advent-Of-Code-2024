const fs = require("fs");

const grid = fs
  .readFileSync("../input.txt", "utf-8")
  .split("\n")
  .map((r) => r.split(""));
const ROWS = grid.length;
const COLS = grid[0].length;
const map = {};
const uniqueLocations = new Set();

function isOutOfBounds(node) {
  const [i, j] = node;
  if (i < 0 || i >= ROWS || j < 0 || j >= COLS) return true;

  return false;
}

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    const item = grid[i][j];
    if (item === ".") continue;

    if (!(item in map)) map[item] = [];

    map[item].push([i, j]);
    uniqueLocations.add([i, j].join(","));
  }
}

for (const locations of Object.values(map)) {
  for (let i = 0; i < locations.length; i++) {
    const [curI, curJ] = locations[i];
    for (let j = 0; j < i; j++) {
      const [prevI, prevJ] = locations[j];
      const diffI = curI - prevI;
      const diffJ = curJ - prevJ;

      let rightAntinode = [curI - diffI, curJ - diffJ];
      let leftAntinode = [curI + diffI, curJ + diffJ];

      while (!isOutOfBounds(rightAntinode) || !isOutOfBounds(leftAntinode)) {
        if (!isOutOfBounds(rightAntinode)) {
          uniqueLocations.add(rightAntinode.join(","));
        }

        if (!isOutOfBounds(leftAntinode)) {
          uniqueLocations.add(leftAntinode.join(","));
        }

        rightAntinode = [rightAntinode[0] - diffI, rightAntinode[1] - diffJ];
        leftAntinode = [leftAntinode[0] + diffI, leftAntinode[1] + diffJ];
      }
    }
  }
}

console.log("RESULT: ", uniqueLocations.size);
