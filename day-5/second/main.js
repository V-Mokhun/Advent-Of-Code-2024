const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8").split("\n");
let res = 0,
  i = 0;
const rules = {};
const incorrectRows = [];

while (input[i++] !== "") {
  if (input[i] === "") break;

  const [mustBeBefore, page] = input[i].split("|");

  if (!(mustBeBefore in rules)) rules[mustBeBefore] = [];
  rules[mustBeBefore].push(page);
}

i++;

while (i < input.length) {
  const pages = input[i].split(",");
  let isCorrect = true;

  outer: for (let j = 0; j < pages.length; j++) {
    const page = pages[j];

    if (!(page in rules)) continue;

    for (let k = 0; k < j; k++) {
      const precedingPage = pages[k];
      if (rules[page].includes(precedingPage)) {
        isCorrect = false;
        break outer;
      }
    }
  }

  if (!isCorrect) {
    incorrectRows.push(pages);
  }

  i++;
}

function arraymove(arr, fromIndex, toIndex) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
}

for (const row of incorrectRows) {
  for (let i = 0; i < row.length; i++) {
    const page = row[i];
    if (!(page in rules)) continue;

    const pageRules = rules[page];
    for (let j = 0; j < i; j++) {
      if (pageRules.includes(row[j])) {
        arraymove(row, i, j);
        break;
      }
    }
  }
}

for (const row of incorrectRows) {
  res += Number(row[Math.floor(row.length / 2)]);
}

console.log("RESULT: ", res);
