const fs = require("fs");

const map = fs
  .readFileSync("../input.txt", "utf-8")
  .split("\n")
  .map((r) => r.split(""));
const ROWS = map.length;
const COLS = map[0].length;
const directions = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const hashmap = {};

function isOutOfBounds(i, j) {
  if (i < 0 || i >= ROWS || j < 0 || j >= COLS) return true;

  return false;
}
function dfs(startCoords, i, j, prevValue) {
  if (isOutOfBounds(i, j)) return;
  if (Number(map[i][j]) - 1 !== prevValue) return;

  if (map[i][j] === "9") {
    hashmap[startCoords] += 1;
    return;
  }

  for (const dir of directions) {
    dfs(startCoords, i + dir[0], j + dir[1], Number(map[i][j]));
  }
}

for (let i = 0; i < ROWS; i++) {
  for (let j = 0; j < COLS; j++) {
    if (map[i][j] === "0") {
      const startCoords = `${i}-${j}`;
      hashmap[startCoords] = 0;

      dfs(startCoords, i, j, -1);
    }
  }
}

const res = Object.values(hashmap).reduce((acc, cur) => acc + cur, 0);

console.log("RESULT: ", res);
