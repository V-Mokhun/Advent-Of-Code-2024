const fs = require("fs");

let report = fs.readFileSync("../input.txt", "utf-8");
report = report.split("\n");

let safeLevels = 0;

for (let i = 0; i < report.length; i++) {
  const level = report[i].split(" ").map(Number);
  const isIncreasing =
    level[0] < level.at(-1) ||
    level[1] < level.at(-1) ||
    level[0] < level.at(-2);
  let isSafe = true;
  let toleratedIdxs = [];

  for (let j = 0; j < level.length - 1; j++) {
    const cur = level[j];
    const next = level[j + 1];

    if (isIncreasing) {
      if (next - cur < 1 || next - cur > 3) {
        toleratedIdxs = [j, j + 1];
        break;
      }
    } else {
      if (cur - next < 1 || cur - next > 3) {
        toleratedIdxs = [j, j + 1];
        break;
      }
    }
  }

  if (toleratedIdxs.length > 0) {
    isSafe = false;

    for (let j = 0; j < toleratedIdxs.length; j++) {
      const toleratedLevel = level.filter((_, idx) => toleratedIdxs[j] !== idx);
      let isToleratedSafe = true;

      for (let k = 0; k < toleratedLevel.length; k++) {
        const cur = toleratedLevel[k];
        const next = toleratedLevel[k + 1];

        if (isIncreasing) {
          if (next - cur < 1 || next - cur > 3) {
            isToleratedSafe = false;
            break;
          }
        } else {
          if (cur - next < 1 || cur - next > 3) {
            isToleratedSafe = false;
            break;
          }
        }
      }

      if (isToleratedSafe) {
        isSafe = true;
        break;
      }
    }
  }

  if (isSafe) {
    safeLevels += 1;
  }
}

console.log("Safe levels: ", safeLevels);
