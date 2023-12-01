import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).map((line) => line.replace(/\D+/g, ""));

  return input.map((line) => +`${line[0]}${line[line.length - 1]}`).reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const numberStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const reversedNumberStrings = numberStrings.map((numberString) => numberString.split('').reverse().join(''));
  const input = parseInput(rawInput);

  const resultingNumbers = input.map((line) => {
    let newLine = line;

    // Check if a stringified number is present before the first number
    const firstNumberIndex = newLine.search(/\d/);
    const firstStringifiedNumberIndex = new RegExp(numberStrings.join('|')).exec(newLine)?.index ?? -1;

    if (firstStringifiedNumberIndex !== -1 && firstStringifiedNumberIndex < firstNumberIndex) {
      // Replace first occurence any of the number strings with number
      newLine = newLine.replace(new RegExp(numberStrings.join('|')), (match) => `${numberStrings.indexOf(match) + 1}`);
    }

    // Check if a stringified number is present after the last number
    const reversedLine = newLine.split('').reverse().join('');
    const lastNumberIndex = reversedLine.search(/\d(?!\d)/);
    const lastStringifiedNumberIndex = new RegExp(reversedNumberStrings.join('|')).exec(reversedLine)?.index ?? -1;

    if (lastStringifiedNumberIndex !== -1 && lastStringifiedNumberIndex < lastNumberIndex) {
      // Replace last occurence any of the number strings with number
      newLine = reversedLine.replace(new RegExp(reversedNumberStrings.join('|')), (match) => `${reversedNumberStrings.indexOf(match) + 1}`)
        .split('').reverse().join('');
    }

    // Remove all non numeric characters
    newLine = newLine.replace(/\D+/g, '');

    // Get the first and last number
    newLine = `${newLine[0]}${newLine[newLine.length - 1]}`;

    return +newLine;
  });

  // Return the sum of the numbers
  return resultingNumbers.reduce((a, b) => a + b, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          2xjzgsjzfhzhm1
          qhklfjd39rpjxhqtftwopfvrrj2eight
          95btwo
          lfsqldnf3onenplgfxdjzjjnpzfxnineseven
          five7fouronesevenpfsrmszpc
        `,
        expected: 258,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          two1nine
          eightwothree
          abcone2threexyz
          xtwone3four
          4nineeightseven2
          zoneight234
          7pqrstsixteen
        `,
        expected: 281,
      },
      {
        input: `
          stwoone4eightwoj
        `,
        expected: 22,
      },
      {
        input: `
          6qfvvdqdrtstwothree4seven8vszpseven
        `,
        expected: 67,
      },
      {
        input: `
        tvmqndvsix875nine8
        `,
        expected: 68,
      },
      {
        input: `
        vg7477ninecpnrvnine7
        `,
        expected: 77,
      },
      {
        input: `
        zoneight234
        `,
        expected: 14,
      },
      {
        input: `
        53twonehx
        `,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
