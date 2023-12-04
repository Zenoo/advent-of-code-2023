import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split('\n').reduce((acc, line) => {
    const [, numbers] = line.split(':');
    const [winnerData, ownData] = numbers.split('|');
    const winners = winnerData.trim().replace(/\s+/g, ' ').split(' ');
    const own = ownData.trim().replace(/\s+/g, ' ').split(' ');

    const corrects = own.filter((number) => winners.includes(number)).length;

    return corrects ? acc + 2 ** (corrects - 1) : acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n');

  // Start with one card each
  const cards: number[] = Array(input.length).fill(1);

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const [, numbers] = line.split(':');
    const [winnerData, ownData] = numbers.split('|');
    const winners = winnerData.trim().replace(/\s+/g, ' ').split(' ');
    const own = ownData.trim().replace(/\s+/g, ' ').split(' ');

    const wins = own.filter((number) => winners.includes(number)).length;

    // Add cards[i] to the next {wins} cards
    for (let j = 0; j < wins; j++) {
      cards[i + j + 1] += cards[i];
    }
  }

  return cards.reduce((acc, card) => acc + card, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
