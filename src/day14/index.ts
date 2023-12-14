import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input.split("\n").map((line) => line.split(""));

  for (let i = 1; i < map.length; i++) {
    const line = map[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === "O") {
        // Move the object as far up as possible
        let k = i - 1;
        while (k >= 0 && map[k][j] === ".") {
          map[k][j] = "O";
          map[k + 1][j] = ".";
          k--;
        }
      }
    }
  }

  // Get the weight of all O
  let weight = 0;
  for (let i = 0; i < map.length; i++) {
    const line = map[i];
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === "O") {
        weight += map.length - i;
      }
    }
  }

  return weight;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 136,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        O....#....
        O.OO#....#
        .....##...
        OO.#O....O
        .O.....O#.
        O.#..O.#.#
        ..O..#O..O
        .......O..
        #....###..
        #OO..#....
        `,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
