const fs = require("fs");

let input = fs.readFileSync("../input.txt", "utf-8");
input = input.split("\n");
const freq = {};
const leftList = [];

for (let i = 0; i < input.length; i++) {
  const [leftId, rightId] = input[i].split(" ").filter((str) => str.length > 0);
  leftList.push(leftId);

  if (!(rightId in freq)) {
    freq[rightId] = 0;
  }
  freq[rightId] += 1;
}

const result = leftList.reduce((res, id) => {
  if (id in freq) {
    return res + Number(id) * freq[id];
  }

  return res;
}, 0);

console.log(result);
