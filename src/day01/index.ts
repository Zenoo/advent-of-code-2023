import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput.split("\n");

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, line) => {
    const numbers = line.replace(/\D+/g, "");

    return acc + +`${numbers[0]}${numbers[numbers.length - 1]}`;
  }, 0);
};

const part2 = (rawInput: string) => {
  enum NumberString {
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    five = 5,
    six = 6,
    seven = 7,
    eight = 8,
    nine = 9,
  }
  const numberRegex = new RegExp(Object.keys(NumberString).join('|'));
  enum ReversedNumberString {
    eno = 1,
    owt = 2,
    eerht = 3,
    ruof = 4,
    evif = 5,
    xis = 6,
    neves = 7,
    thgie = 8,
    enin = 9,
  }
  const reverseNumberRegex = new RegExp(Object.keys(ReversedNumberString).join('|'));

  const input = parseInput(rawInput);

  return input.reduce((acc, line) => {
    let newLine = line;

    // Check if a stringified number is present before the first number
    const firstNumberIndex = newLine.search(/\d/);
    const firstStringifiedNumberIndex = numberRegex.exec(newLine)?.index ?? -1;

    if (firstNumberIndex === -1 || firstStringifiedNumberIndex !== -1 && firstStringifiedNumberIndex < firstNumberIndex) {
      // Replace first occurence any of the number strings with number
      newLine = newLine.replace(numberRegex, (match) => `${NumberString[match as keyof typeof NumberString]}`)
    }

    // Check if a stringified number is present after the last number
    const reversedLine = newLine.split('').reverse().join('');
    const lastNumberIndex = reversedLine.search(/\d/);
    const lastStringifiedNumberIndex = reverseNumberRegex.exec(reversedLine)?.index ?? -1;

    if (lastNumberIndex === -1 || lastStringifiedNumberIndex !== -1 && lastStringifiedNumberIndex < lastNumberIndex) {
      // Replace last occurence any of the number strings with number
      newLine = reversedLine.replace(reverseNumberRegex, (match) => `${ReversedNumberString[match as keyof typeof ReversedNumberString]}`)
        .split('').reverse().join('');
    }

    // Remove all non numeric characters
    newLine = newLine.replace(/\D+/g, '');

    // Get the first and last number
    newLine = `${newLine[0]}${newLine[newLine.length - 1]}`;

    return acc + +newLine;
  }, 0);
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
