const fs = require("fs");

const input = fs.readFileSync("../input.txt", "utf-8").split("\n");
let res = 0;

const recurse = (arr, sum, target) => {
  if (arr.length === 0) {
    return sum === target;
  }

  const el = arr.at(0);

  return (
    recurse(arr.slice(1), sum + el, target) ||
    recurse(arr.slice(1), sum * el, target)
  );
};

input.forEach((equation, i) => {
  let [testValue, numbers] = equation.split(":");
  let isFound;
  numbers = numbers
    .split(" ")
    .filter((n) => n.length > 0)
    .map(Number);

  const found = recurse(numbers.slice(1), numbers[0], Number(testValue));

  if (found) {
    res += Number(testValue);
  }
});

console.log("RESULT: ", res);
