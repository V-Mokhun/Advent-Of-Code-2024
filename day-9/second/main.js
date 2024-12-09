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

console.log(blocks);
let ptr = blocks.length - 1;
while (ptr > 0) {
  while (blocks[ptr] === ".") {
    ptr--;
  }
  let spaceNeeded = 0;
  let curId = blocks[ptr];
  let startFilePosition = ptr;
  while (curId === blocks[ptr]) {
    spaceNeeded++;
    ptr--;
  }

  let startPtr = 0;
  while (startPtr < ptr) {
    while (blocks[startPtr] !== "." && startPtr < ptr) {
      startPtr++;
    }

    let freeSpace = 0;
    let startPosition = startPtr;
    while (blocks[startPtr] === ".") {
      startPtr++;
      freeSpace++;
    }

    if (freeSpace >= spaceNeeded) {
      for (let i = startPosition; i < startPosition + spaceNeeded; i++) {
        swap(i, startFilePosition);
        startFilePosition--;
      }
      break;
    }
  }
}

const checksum = blocks.reduce((acc, cur, i) => {
  if (cur === ".") return acc;

  return acc + cur * i;
}, 0);

console.log("RESULT: ", checksum);
