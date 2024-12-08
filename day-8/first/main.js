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
  }
}

for (const locations of Object.values(map)) {
  for (let i = 0; i < locations.length; i++) {
    const curLocation = locations[i];
    const [curI, curJ] = curLocation;
    for (let j = 0; j < i; j++) {
      const prevLocation = locations[j];
      const [prevI, prevJ] = prevLocation;

      const firstAntinode = [prevI * 2 - curI, prevJ * 2 - curJ];
      const secondAntinode = [curI * 2 - prevI, curJ * 2 - prevJ];

      if (!isOutOfBounds(firstAntinode)) {
        uniqueLocations.add(firstAntinode.join(","));
      }

      if (!isOutOfBounds(secondAntinode)) {
        uniqueLocations.add(secondAntinode.join(","));
      }
    }
  }
}

console.log("RESULT: ", uniqueLocations.size);
