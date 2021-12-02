import { test, readInput } from "../utils/index";

type Line = [string, number];
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput
    .split("\n")
    .map((line) => line.split(" "))
    .map(([direction, n]) => [direction, Number(n)]);
};
const input = prepareInput(readInput());

const goA = (input: Input) => {
  let h = 0,
    d = 0;

  input.forEach(([direction, n]) => {
    switch (direction) {
      case "forward":
        h += n;
        break;
      case "down":
        d += n;
        break;
      case "up":
        d -= n;
        break;
      default:
        throw new Error(`unknown direction ${direction}`);
    }
  });

  return h * d;
};

const goB = (input: Input) => {
  let h = 0,
    d = 0;
  let aim = 0;

  input.forEach(([direction, n]) => {
    switch (direction) {
      case "forward":
        h += n;
        d += aim * n;
        break;
      case "down":
        aim += n;
        break;
      case "up":
        aim -= n;
        break;
      default:
        throw new Error(`unknown direction ${direction}`);
    }
  });

  return h * d;
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
