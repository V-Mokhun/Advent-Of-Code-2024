const fs = require("fs");

const diskMap = fs.readFileSync("../input.txt", "utf-8");
const blocks = [];

function swap(i, j) {
  let temp = blocks[i];
  blocks[i] = blocks[j];
  blocks[j] = temp;
}

for (let i = 0; i < diskMap.length; i++) {
  const isFreeSpace = i % 2 !== 0;
  const freq = diskMap[i];
  const id = isFreeSpace ? "." : i / 2;

  for (let j = 0; j < freq; j++) {
    blocks.push(id);
  }
}

let leftPtr = 0;
let rightPtr = blocks.length - 1;

while (rightPtr > leftPtr) {
  while (blocks[leftPtr] !== ".") {
    leftPtr++;
  }

  while (blocks[rightPtr] === ".") {
    rightPtr--;
  }

  swap(leftPtr, rightPtr);
}
if (blocks[leftPtr] !== "." && blocks[rightPtr] === ".") {
  swap(leftPtr, rightPtr);
}

const checksum = blocks.reduce((acc, cur, i) => {
  if (cur === ".") return acc;

  return acc + cur * i;
}, 0);

console.log("RESULT: ", checksum);
