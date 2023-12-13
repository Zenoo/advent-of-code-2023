import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const patterns = input.split("\n\n");

  return patterns.reduce((acc, pattern) => {
    // console.log('-'.repeat(10));
    // Check if a line repeats
    const lines = pattern.split("\n");
    let repeatIndexes = [];
    // console.log('  0123456789');
    // console.log(0, lines[0]);
    for (let i = 1; i < lines.length; i++) {
      // console.log(i, lines[i]);
      if (lines[i] === lines[i - 1]) {
        repeatIndexes.push(i - 1);
      }
    }

    const invalidIndexes: number[] = [];
    for (let repeatIndex of repeatIndexes) {
      // console.log('line mirror', repeatIndex, lines[repeatIndex]);
      // Check if the refleciton works in both directions
      for (let i = 1; i <= Math.min(lines.length - (repeatIndex + 2), repeatIndex); i++) {
        // console.log('comparing', lines[repeatIndex + i + 1], lines[repeatIndex - i])
        if (lines[repeatIndex + i + 1] !== lines[repeatIndex - i]) {
          invalidIndexes.push(repeatIndex);
          // console.log('not a mirror')
          break;
        }
      }
    }

    const validIndex = repeatIndexes.find((index) => !invalidIndexes.includes(index));  
    const amountOfRowsAboveRepeat = typeof validIndex === 'undefined' ? 0 : validIndex + 1;

    // Check if a column repeats
    const lineLength = lines[0].length;
    let repeatColumns = [];
    const columns = [];
    for (let i = 0; i < lineLength; i++) {
      let column = "";
      for (let j = 0; j < lines.length; j++) {
        column += lines[j][i];
      }

      columns.push(column);

      if (i > 0 && column === columns[i - 1]) {
        repeatColumns.push(i - 1);
      }
    }

    // Check if the refleciton works in both directions
    const invalidColumns: number[] = [];
    for (let repeatColumn of repeatColumns) {
      // console.log('column mirror', repeatColumn, columns[repeatColumn]);
      for (let i = 1; i <= Math.min(columns.length - (repeatColumn + 2), repeatColumn); i++) {
        // console.log('comparing', columns[repeatColumn + i + 1], columns[repeatColumn - i])
        if (columns[repeatColumn + i + 1] !== columns[repeatColumn - i]) {
          invalidColumns.push(repeatColumn);
          // console.log('not a mirror')
          break;
        }
      }
    }

    const validColumn = repeatColumns.find((index) => !invalidColumns.includes(index));
    const amountOfColumnsBeforeRepeat = typeof validColumn === 'undefined' ? 0 : validColumn + 1;
    // console.log(amountOfRowsAboveRepeat, amountOfColumnsBeforeRepeat)

    // console.log('total', amountOfRowsAboveRepeat * 100 + amountOfColumnsBeforeRepeat);
    return acc + amountOfRowsAboveRepeat * 100 + amountOfColumnsBeforeRepeat;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const patterns = input.split("\n\n");

  return patterns.reduce((acc, pattern) => {
    console.log('-'.repeat(10));
    // Check if a line repeats (with one acceptable difference)
    const lines = pattern.split("\n");
    let repeatIndexes = [];
    console.log('  0123456789');
    console.log(0, lines[0]);
    for (let i = 1; i < lines.length; i++) {
      console.log(i, lines[i]);
      let similarChars = 0;
      for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === lines[i - 1][j]) {
          similarChars++;
        }
      }

      if (similarChars >= lines[i].length - 1) {
        repeatIndexes.push(i - 1);
      }
    }

    const invalidIndexes: number[] = [];
    for (let repeatIndex of repeatIndexes) {
      console.log('line mirror', repeatIndex, lines[repeatIndex]);
      // Check if the refleciton works in both directions
      for (let i = 1; i <= Math.min(lines.length - (repeatIndex + 2), repeatIndex); i++) {
        console.log('comparing', lines[repeatIndex + i + 1], lines[repeatIndex - i])
        let similarChars = 0;
        for (let j = 0; j < lines[repeatIndex + i + 1].length; j++) {
          if (lines[repeatIndex + i + 1][j] === lines[repeatIndex - i][j]) {
            similarChars++;
          }
        }

        if (similarChars < lines[repeatIndex + i + 1].length - 1) {
          invalidIndexes.push(repeatIndex);
          console.log('not a mirror')
          break;
        }
      }
    }

    const validIndex = repeatIndexes.find((index) => !invalidIndexes.includes(index));  
    const amountOfRowsAboveRepeat = typeof validIndex === 'undefined' ? 0 : validIndex + 1;

    // Check if a column repeats
    const lineLength = lines[0].length;
    let repeatColumns = [];
    const columns = [];
    for (let i = 0; i < lineLength; i++) {
      let column = "";
      for (let j = 0; j < lines.length; j++) {
        column += lines[j][i];
      }

      columns.push(column);

      if (i > 0) {
        let similarChars = 0;
        for (let j = 0; j < column.length; j++) {
          if (column[j] === columns[i - 1][j]) {
            similarChars++;
          }
        }

        if (similarChars >= column.length - 1) {
          repeatColumns.push(i - 1);
        }
      }
    }

    // Check if the refleciton works in both directions
    const invalidColumns: number[] = [];
    for (let repeatColumn of repeatColumns) {
      console.log('column mirror', repeatColumn, columns[repeatColumn]);
      for (let i = 1; i <= Math.min(columns.length - (repeatColumn + 2), repeatColumn); i++) {
        console.log('comparing', columns[repeatColumn + i + 1], columns[repeatColumn - i])
        let similarChars = 0;
        for (let j = 0; j < columns[repeatColumn + i + 1].length; j++) {
          if (columns[repeatColumn + i + 1][j] === columns[repeatColumn - i][j]) {
            similarChars++;
          }
        }

        if (similarChars < columns[repeatColumn + i + 1].length - 1) {
          invalidColumns.push(repeatColumn);
          console.log('not a mirror')
          break;
        }
      }
    }

    const validColumn = repeatColumns.find((index) => !invalidColumns.includes(index));
    const amountOfColumnsBeforeRepeat = typeof validColumn === 'undefined' ? 0 : validColumn + 1;
    console.log(amountOfRowsAboveRepeat, amountOfColumnsBeforeRepeat)

    console.log('total', amountOfRowsAboveRepeat * 100 + amountOfColumnsBeforeRepeat);
    return acc + amountOfRowsAboveRepeat * 100 + amountOfColumnsBeforeRepeat;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 405,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        #.##..##.
        ..#.##.#.
        ##......#
        ##......#
        ..#.##.#.
        ..##..##.
        #.#.##.#.
        
        #...##..#
        #....#..#
        ..##..###
        #####.##.
        #####.##.
        ..##..###
        #....#..#
        `,
        expected: 400,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
