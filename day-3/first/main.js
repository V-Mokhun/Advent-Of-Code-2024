const fs = require("fs");

let report = fs.readFileSync("../input.txt", "utf-8");

let ptr = 0;
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

const isMulWord = () => {
  if (ptr + 2 >= report.length) {
    ptr += 2;
    return false;
  }

  if (report[ptr] !== "m") {
    ptr++;
    return false;
  }

  ptr++;

  if (report[ptr] !== "u") {
    return false;
  }

  ptr++;

  if (report[ptr] !== "l") {
    return false;
  }

  ptr++;

  return true;
};

const isLeftParen = () => {
  if (ptr >= report.length) {
    return false;
  }

  if (report[ptr] !== "(") return false;

  ptr++;

  return true;
};

const isDigit = () => {
  if (ptr >= report.length) return -1;

  let consecutiveDigits = 0;
  let number = "";
  while (digits.has(report[ptr])) {
    consecutiveDigits++;
    number += report[ptr];
    ptr++;

    if (ptr >= report.length) return -1;
  }

  if (consecutiveDigits < 1 || consecutiveDigits > 3) return -1;

  return Number(number);
};

const isComma = () => {
  if (ptr >= report.length) return false;

  if (report[ptr] !== ",") return false;

  ptr++;

  return true;
};

const isRightParen = () => {
  if (ptr >= report.length) return false;

  if (report[ptr] !== ")") return false;

  ptr++;

  return true;
};

const isMul = () => {
  if (!(isMulWord() && isLeftParen())) return false;

  const firstMultiplier = isDigit();
  if (firstMultiplier === -1) return false;

  if (!isComma()) return false;

  const secondMultiplier = isDigit();
  if (secondMultiplier === -1) return false;

  if (!isRightParen()) return false;

  return firstMultiplier * secondMultiplier;
};

let sum = 0;
while (ptr < report.length) {
  const res = isMul();

  if (res !== false) {
    sum += res;
  }
}

console.log("RESULT: ", sum);
