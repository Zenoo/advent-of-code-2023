import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split('\n').reduce((acc, line) => {
    const numbers = line.split(' ').map(Number);

    // Create a 2D array of the differences between each number until all are 0;
    const diffs: number[][] = [numbers];
    
    while (diffs[diffs.length - 1].some(n => n !== 0)) {
      const last = diffs[diffs.length - 1];
      const next = last.reduce((acc, n, i) => {
        if (i === last.length - 1) return acc;
        return [...acc, last[i + 1] - n];
      }, [] as number[]);
      diffs.push(next);
    }

    // Add a number at the end of each array that is the sum of the previous and the next line at the same index
    for (let i = diffs.length - 1; i >= 0; i--) {
      const last = diffs[i + 1];
      const current = diffs[i];

      if (!last) {
        // Add a zero to the end of the array
        current.push(0);
        continue;
      }

      current.push(current[current.length - 1] + last[current.length - 1]);
    }
    return acc + diffs[0][diffs[0].length - 1];
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split('\n').reduce((acc, line) => {
    const numbers = line.split(' ').map(Number);

    // Create a 2D array of the differences between each number until all are 0;
    const diffs: number[][] = [numbers.reverse()];
    
    while (diffs[diffs.length - 1].some(n => n !== 0)) {
      const last = diffs[diffs.length - 1];
      const next = last.reduce((acc, n, i) => {
        if (i === last.length - 1) return acc;
        return [...acc, last[i + 1] - n];
      }, [] as number[]);
      diffs.push(next);
    }

    // Add a number at the end of each array that is the sum of the previous and the next line at the same index
    for (let i = diffs.length - 1; i >= 0; i--) {
      const last = diffs[i + 1];
      const current = diffs[i];

      if (!last) {
        // Add a zero to the end of the array
        current.push(0);
        continue;
      }

      current.push(current[current.length - 1] + last[current.length - 1]);
    }
    return acc + diffs[0][diffs[0].length - 1];
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        0 3 6 9 12 15
        1 3 6 10 15 21
        10 13 16 21 30 45
        `,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
