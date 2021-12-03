import { test, readInput } from "../utils/index";

type Line = number[];
type Input = Line[];

const prepareInput = (rawInput: string): Input => {
  return rawInput.split("\n").map((line) => line.split("").map(Number));
};
const input = prepareInput(readInput());

const getBitCount = (numbers: number[][]) => {
  const bitCount: number[] = new Array(numbers[0].length).fill(0);
  numbers.forEach((line) => {
    line.forEach((n, pos) => {
      if (n === 0) bitCount[pos] -= 1;
      else bitCount[pos] += 1;
    });
  });
  return bitCount;
};
const getMcbBitMap = (numbers: number[]) => {
  return numbers.map((x) => (x >= 0 ? 1 : 0));
};
const getLcbBitMap = (numbers: number[]) => {
  return numbers.map((x) => (x < 0 ? 1 : 0));
};

const goA = (input: Input) => {
  const bitCount = getBitCount(input);
  const gammaBits = bitCount.map((x) => (x > 0 ? 1 : 0));
  const epsilonBits = bitCount.map((x) => (x > 0 ? 0 : 1));

  const gamma = parseInt(gammaBits.join(""), 2);
  const epsilon = parseInt(epsilonBits.join(""), 2);
  return gamma * epsilon;
};

const goB = (input: Input) => {
  let ogr = 0;
  let ogrNumbers = input.slice();
  for (let bitIndex = 0; bitIndex < ogrNumbers[0].length; bitIndex += 1) {
    const mcb = getMcbBitMap(getBitCount(ogrNumbers))[bitIndex];

    ogrNumbers = ogrNumbers.filter((n) => n[bitIndex] === mcb);

    if (ogrNumbers.length === 1) {
      ogr = parseInt(ogrNumbers[0].join(""), 2);
      console.log("found", ogrNumbers[0], ogr);
      break;
    }
  }

  let csr = 0;
  let csrNumbers = input.slice();
  for (let bitIndex = 0; bitIndex < csrNumbers[0].length; bitIndex += 1) {
    const lcb = getLcbBitMap(getBitCount(csrNumbers))[bitIndex];
    csrNumbers = csrNumbers.filter((n) => n[bitIndex] === lcb);

    if (csrNumbers.length === 1) {
      csr = parseInt(csrNumbers[0].join(""), 2);
      console.log("found", csrNumbers[0], csr);
      break;
    }
  }

  return ogr * csr;
};

/* Tests */

let testInput = prepareInput(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`);
test(goA(testInput), 198);
test(goB(testInput), 230);

/* Results */

console.time("Time");
const resultA = goA(input);
const resultB = goB(input);
console.timeEnd("Time");

console.log("Solution to part 1:", resultA);
console.log("Solution to part 2:", resultB);
