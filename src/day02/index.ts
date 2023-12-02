import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

type Color = 'red' | 'green' | 'blue';

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split('\n').reduce((acc, line) => {
    const [game, data] = line.split(':');
    const gameId = +game.split(' ')[1];

    let max = {
      red: 0,
      green: 0,
      blue: 0,
    };

    data.split(';').forEach((pull) => {
      pull.split(',').forEach((colorData) => {
        const [, count, color] = colorData.split(' ');
        max[color as Color] = Math.max(max[color as Color], +count);
      });
    });

    if (max.red <= 12 && max.green <= 13 && max.blue <= 14) {
      acc += gameId;
    }

    return acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split('\n').reduce((acc, line) => {
    const [, data] = line.split(':');

    let max = {
      red: 0,
      green: 0,
      blue: 0,
    };

    data.split(';').forEach((pull) => {
      pull.split(',').forEach((colorData) => {
        const [, count, color] = colorData.split(' ');
        max[color as Color] = Math.max(max[color as Color], +count);
      });
    });

    acc += max.red * max.green * max.blue;

    return acc;
  }, 0);
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
