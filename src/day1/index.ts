import { test, readInput, sum } from "../utils/index";

type Line = number;
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split("\n").map(Number);
};
const input = prepareInput(readInput());

const goA = (input: Input) => {
  let count = 0;
  let previous = input[0];
  input.forEach((current) => {
    if (current > previous) count += 1;
    previous = current;
  });
  return count;
};

const goB = (input: Input) => {
  const result: number[] = [];
  for (let i = 0; i < input.length - 2; i += 1) {
    const w = input.slice(i, i + 3);
    const sumOfW = sum(w);
    console.log(w, sumOfW);
    result.push(sumOfW);
  }
  return goA(result);
};

/* Tests */

// test()

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
