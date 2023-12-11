import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const expandedLines = lines.reduce((acc, line) => {
    // If line only contains .
    if (line.match(/^\.*$/)) {
      // Double the lines with only .
      return [...acc, line, line];
    }

    return [...acc, line];
  }, [] as string[]);

  const grid = expandedLines.map((line) => line.split(""));

  // Double the columns that only contain .
  for (let i = 0; i < grid[0].length; i++) {
    let empty = true;
    for (let j = 0; j < grid.length; j++) {
      if (grid[j][i] !== ".") {
        empty = false;
        break;
      }
    }

    if (empty) {
      // Add 2 columns of .
      for (let j = 0; j < grid.length; j++) {
        grid[j].splice(i, 0, ".");
      }

      i += 2;
    }
  }

  const galaxies: { x: number; y: number }[] = [];

  // Find all galaxies
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const cell = line[x];
      if (cell === "#") {
        galaxies.push({ x, y });
      }
    }
  }

  // Get shortest distance between each galaxy
  const distances: number[] = [];

  for (let i = 0; i < galaxies.length; i++) {
    const galaxyA = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyB = galaxies[j];
      const distance = Math.abs(galaxyA.x - galaxyB.x) + Math.abs(galaxyA.y - galaxyB.y);
      distances.push(distance);
    }
  }
  
  return distances.reduce((acc, distance) => acc + distance, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const lines = input.split("\n");

  const emptyLineIndexes = lines.reduce((acc, line, index) => {
    if (line.match(/^\.*$/)) {
      return [...acc, index];
    }

    return acc;
  }, [] as number[]);

  const emptyColumnIndexes = lines[0].split("").reduce((acc, cell, index) => {
    let empty = true;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i][index] !== ".") {
        empty = false;
        break;
      }
    }

    if (empty) {
      return [...acc, index];
    }

    return acc;
  }, [] as number[]);

  const grid = lines.map((line) => line.split(""));

  const galaxies: { x: number; y: number }[] = [];

  // Find all galaxies
  for (let y = 0; y < grid.length; y++) {
    const line = grid[y];
    for (let x = 0; x < line.length; x++) {
      const cell = line[x];
      if (cell === "#") {
        galaxies.push({ x, y });
      }
    }
  }

  // Get shortest distance between each galaxy
  // Going through an empty line or column counts as `emptyEquivalent`
  const distances: number[] = [];
  const emptyEquivalent = 1000000;

  for (let i = 0; i < galaxies.length; i++) {
    const galaxyA = galaxies[i];
    for (let j = i + 1; j < galaxies.length; j++) {
      const galaxyB = galaxies[j];

      // Check how many empty lines are between the two galaxies
      let emptyLines = 0;
      const highestY = Math.max(galaxyA.y, galaxyB.y);
      const lowestY = Math.min(galaxyA.y, galaxyB.y);
      for (let y = lowestY + 1; y < highestY; y++) {
        if (emptyLineIndexes.includes(y)) {
          emptyLines++;
        }
      }

      // Check how many empty columns are between the two galaxies
      let emptyColumns = 0;
      const highestX = Math.max(galaxyA.x, galaxyB.x);
      const lowestX = Math.min(galaxyA.x, galaxyB.x);
      for (let x = lowestX + 1; x < highestX; x++) {
        if (emptyColumnIndexes.includes(x)) {
          emptyColumns++;
        }
      }

      const distance = Math.abs(galaxyA.x - galaxyB.x) - emptyColumns
        + Math.abs(galaxyA.y - galaxyB.y) - emptyLines
        + emptyLines * emptyEquivalent
        + emptyColumns * emptyEquivalent;
      distances.push(distance);
    }
  }
  
  return distances.reduce((acc, distance) => acc + distance, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
        ...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....
        `,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        ...#......
        .......#..
        #.........
        ..........
        ......#...
        .#........
        .........#
        ..........
        .......#..
        #...#.....
        `,
        expected: 82000210,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
