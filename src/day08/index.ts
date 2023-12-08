import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [directions, , ...choices] = input.split('\n');
  let position = 'AAA';
  let directionIndex = 0;
  let steps = 0;

  while (position !== 'ZZZ') {
    const choice = choices.find((c) => c.startsWith(position));
    if (!choice) {
      throw new Error(`No choice found for ${position}`);
    }

    const regex = new RegExp(`${position} = \\((.*), (.*)\\)`);
    const [, leftName, rightName] = choice.match(regex) || [];

    position = directions[directionIndex] === 'L' ? leftName : rightName;
    directionIndex = (directionIndex + 1) % directions.length;
    steps++;
  }

  return steps;
};

const gcd = (a: number, b: number): number => a ? gcd(b % a, a) : b;

const lcm = (a: number, b: number) => a * b / gcd(a, b);

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const [directions, , ...choices] = input.split('\n');

  // Positions ending with A
  const positions = choices.filter((c) => /^.{2}A/.test(c)).map((c) => c.split(' ')[0]);
  const steps: number[] = [];

  for (let i = 0; i < positions.length; i++) {
    let position = positions[i];
    let step = 1;
    let directionIndex = 0;
    let done = false;

    while (!done) {
      const choice = choices.find((c) => c.startsWith(position));
      if (!choice) {
        throw new Error(`No choice found for ${position}`);
      }
  
      const regex = new RegExp(`${position} = \\((.*), (.*)\\)`);
      const [, leftName, rightName] = choice.match(regex) || [];
  
      position = directions[directionIndex] === 'L' ? leftName : rightName;
  
      if (position.endsWith('Z')) {
        steps[i] = step;
        done = true;
      }

      directionIndex = (directionIndex + 1) % directions.length;
      step++;
    }
  }

  return steps.reduce(lcm);
};

run({
  part1: {
    tests: [
      {
        input: `
        RL

        AAA = (BBB, CCC)
        BBB = (DDD, EEE)
        CCC = (ZZZ, GGG)
        DDD = (DDD, DDD)
        EEE = (EEE, EEE)
        GGG = (GGG, GGG)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 2,
      },
      {
        input: `
        LLR

        AAA = (BBB, BBB)
        BBB = (AAA, ZZZ)
        ZZZ = (ZZZ, ZZZ)
        `,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        LR

        11A = (11B, XXX)
        11B = (XXX, 11Z)
        11Z = (11B, XXX)
        22A = (22B, XXX)
        22B = (22C, 22C)
        22C = (22Z, 22Z)
        22Z = (22B, 22B)
        XXX = (XXX, XXX)
        `,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
