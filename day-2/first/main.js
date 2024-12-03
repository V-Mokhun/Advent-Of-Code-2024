const fs = require("fs");

let report = fs.readFileSync("../input.txt", "utf-8");
report = report.split("\n");

let safeLevels = 0;
for (let i = 0; i < report.length; i++) {
  const level = report[i].split(" ").map(Number);
  const isIncreasing = level[0] < level[level.length - 1];
  let isSafe = true;

  for (let j = 0; j < level.length - 1; j++) {
    const current = level[j];
    const next = level[j + 1];

    if (isIncreasing) {
      if (next - current < 1 || next - current > 3) {
        isSafe = false;
        break;
      }
    } else {
      if (current - next < 1 || current - next > 3) {
        isSafe = false;
        break;
      }
    }
  }

  if (isSafe) {
    safeLevels += 1;
  }
}

console.log("Safe levels: ", safeLevels);
