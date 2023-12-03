import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input.split("\n").map((line) => line.split(""));

  let total = 0;

  for (let i = 0; i < map.length; i++) {
    const line = map[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      // If char is number
      if (char.match(/[0-9]/)) {
        // Get the following chars until we hit a non-number
        let num = char;
        let k = j + 1;
        while (map[i][k]?.match(/[0-9]/)) {
          num += map[i][k];
          k++;
        }

        // Check if there is a symbol all around the number
        let valid = false;
        for (let l = i - 1; l <= i + 1; l++) {
          for (let m = j - 1; m <= k; m++) {
            if (map[l] && map[l][m] && map[l][m].match(/[^\d.]/)) {
              valid = true;
              break;
            }
          }

          if (valid) break;
        }

        // If there is, add the number to the total
        if (valid) {
          total += +num;
          // console.log(num);
        }

        // Adjust j to the end of the number
        j = k;
      }
    }
  }

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input.split("\n").map((line) => line.split(""));

  let total = 0;

  for (let i = 0; i < map.length; i++) {
    const line = map[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      // If char is *
      if (char === '*') {
        // Check if there is two different numbers all around the *
        let valid = false;
        let numbers = [];
        let numberPositions: string[] = [];

        for (let l = i - 1; l <= i + 1; l++) {
          for (let m = j - 1; m <= j + 1; m++) {
            if (map[l] && map[l][m] && map[l][m].match(/[0-9]/)) {
              if (!numberPositions.includes(`${l},${m}`)) {
                numberPositions.push(`${l},${m}`);

                // Get the previous chars until we hit a non-number
                let num = map[l][m];
                let k = m - 1;
                while (map[l][k]?.match(/[0-9]/)) {
                  num = map[l][k] + num;
                  numberPositions.push(`${l},${k}`);
                  k--;
                }
  
                // Get the following chars until we hit a non-number
                k = m + 1;
                while (map[l][k]?.match(/[0-9]/)) {
                  num += map[l][k];
                  numberPositions.push(`${l},${k}`);
                  k++;
                }

                numbers.push(num);
              }
            }
          }
        }

        if (numbers.length === 2) {
          valid = true;
          total += +numbers[0] * +numbers[1];
        }
      }
    }
  }

  return total;
};

run({
  part1: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 4361,
      },
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ..........
        .664*598..
        `,
        expected: 467+35+633+617+592+664+598,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
