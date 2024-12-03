const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");
const leftList = [];
const rightList = [];

for (let i = 0; i < input.length; i++) {
  const [leftId, rightId] = input[i].split(" ").filter((str) => str.length > 0);
  leftList.push(Number(leftId));
  rightList.push(Number(rightId));
}

leftList.sort((a, b) => a - b);
rightList.sort((a, b) => a - b);

let result = 0;
for (let i = 0; i < leftList.length; i++) {
  result += Math.abs(rightList[i] - leftList[i]);
}
console.log(result);
