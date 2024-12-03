const fs = require("fs");

let report = fs.readFileSync("../input.txt", "utf-8");

let ptr = 0;
let enabled = true;
const ENABLE = "ENABLE";
const DISABLE = "DISABLE";
const digits = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

function isSequence(...arguments) {
  for (const argument of arguments) {
    if (ptr >= report.length) {
      return false;
    }

    if (report[ptr] !== argument) {
      return false;
    }

    ptr++;
  }

  return true;
}

const isMulWord = () => {
  if (ptr >= report.length) {
    return false;
  }

  if (report[ptr] !== "m") {
    ptr++;
    return false;
  }

  ptr++;

  return isSequence("u", "l");
};

const isLeftParen = () => {
  return isSequence("(");
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
  return isSequence(",");
};

const isRightParen = () => {
  return isSequence(")");
};

const applyMul = () => {
  if (!(isMulWord() && isLeftParen())) return false;

  const firstMultiplier = isDigit();
  if (firstMultiplier === -1) return false;

  if (!isComma()) return false;

  const secondMultiplier = isDigit();
  if (secondMultiplier === -1) return false;

  if (!isRightParen()) return false;

  return firstMultiplier * secondMultiplier;
};

const isInstruction = () => {
  if (ptr >= report.length) {
    return false;
  }

  if (report[ptr] !== "d") {
    ptr++;
    return false;
  }

  ptr++;

  if (!isSequence("o")) {
    return false;
  }

  if (isLeftParen()) {
    if (isRightParen()) {
      return ENABLE;
    }

    return false;
  } else {
    if (!isSequence("n", "'", "t")) {
      return false;
    }

    if (!(isLeftParen() && isRightParen())) {
      return false;
    }

    return DISABLE;
  }
};

let sum = 0;
while (ptr < report.length) {
  if (report[ptr] === "m" && enabled) {
    const res = applyMul();

    if (res !== false) {
      sum += res;
    }
  } else if (report[ptr] === "d") {
    const res = isInstruction();
    if (res !== false) {
      enabled = res === ENABLE ? true : false;
    }
  } else {
    ptr++;
  }
}
console.log("RESULT: ", sum);
