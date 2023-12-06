import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
    .map((line) => line.split(/\s+/));

  const races: {
    time: number,
    record: number,
    beatenAmount: number
  }[] = [];
  input[0].forEach((time, index) => {
    if (index === 0) return;
    races.push({ time: +time, record: 0, beatenAmount: 0 });
  });
  input[1].forEach((distance, index) => {
    if (index === 0) return;
    races[index - 1].record = +distance;
  });

  const simulation = (time: number, press: number) => {
    return (time - press) * press;
  };

  for (const race of races) {
    // Find first press time > record
    let minPress = 0;
    while (simulation(race.time, minPress) <= race.record) {
      minPress++;
    }

    // Find last press time > record
    let maxPress = minPress;
    while (simulation(race.time, maxPress) > race.record) {
      maxPress++;
    }

    // Update beatenAmount
    race.beatenAmount = maxPress - minPress;
  }

  return races.reduce((acc, race) => acc * race.beatenAmount, 1);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput).split('\n')
    .map((line) => line.split(/\s+/));
  
  input[0].shift();
  const time = +input[0].join('');
  input[1].shift();
  const record = +input[1].join('');

  const simulation = (time: number, press: number) => {
    return (time - press) * press;
  };

  // Find first press time > record
  let minPress = 0;
  while (simulation(time, minPress) <= record) {
    minPress++;
  }

  // Find last press time > record
  let maxPress = minPress;
  while (simulation(time, maxPress) > record) {
    maxPress++;
  }

  return maxPress - minPress;
};

run({
  part1: {
    tests: [
      {
        input: `
        Time:      7  15   30
        Distance:  9  40  200
        `,
        expected: 288,
      },
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
