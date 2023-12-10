import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const start = {
    x: 0,
    y: 0,
  };
  const map = input.split("\n").map((line, i) => {
    if (line.includes("S")) {
      start.y = i;
      start.x = line.indexOf("S");
    }
    return line.split("");
  });

  let current = {
    char: map[start.y][start.x],
    x: start.x,
    y: start.y,
  };
  let steps = 0;
  let lastMove = "";

  while (current.char !== 'S' || steps === 0) {
    // Check up
    if (lastMove !== 'down'
      && ['S', '|', 'L', 'J'].includes(current.char)
      && ['S', '|', 'F', '7'].includes(map[current.y - 1]?.[current.x])) {
      current.y -= 1;
      current.char = map[current.y][current.x];
      lastMove = 'up';
      steps += 1;
    } else if (lastMove !== 'left'
      && ['S', '-', 'L', 'F'].includes(current.char)
      && ['S', '-', 'J', '7'].includes(map[current.y]?.[current.x + 1])) {
      // Check right
      current.x += 1;
      current.char = map[current.y][current.x];
      lastMove = 'right';
      steps += 1;
    } else if (lastMove !== 'up'
      && ['S', '|', 'F', '7'].includes(current.char)
      && ['S', '|', 'L', 'J'].includes(map[current.y + 1]?.[current.x])) {
      // Check down
      current.y += 1;
      current.char = map[current.y][current.x];
      lastMove = 'down';
      steps += 1;
    } else if (lastMove !== 'right'
      && ['S', '-', 'J', '7'].includes(current.char)
      && ['S', '-', 'F', 'L'].includes(map[current.y]?.[current.x - 1])) {
      // Check left
      current.x -= 1;
      current.char = map[current.y][current.x];
      lastMove = 'left';
      steps += 1;
    } else {
      throw new Error('No path found');
    }
  }

  return Math.floor(steps / 2);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const start = {
    x: 0,
    y: 0,
  };
  const map = input.split("\n").map((line, i) => {
    if (line.includes("S")) {
      start.y = i;
      start.x = line.indexOf("S");
    }
    return line.split("");
  });

  let current = {
    char: map[start.y][start.x],
    x: start.x,
    y: start.y,
  };
  const loop = [{
    x: current.x,
    y: current.y,
  }];
  let steps = 0;
  let lastMove = "";

  while (current.char !== 'S' || steps === 0) {
    // Check up
    if (lastMove !== 'down'
      && ['S', '|', 'L', 'J'].includes(current.char)
      && ['S', '|', 'F', '7'].includes(map[current.y - 1]?.[current.x])) {
      current.y -= 1;
      current.char = map[current.y][current.x];
      lastMove = 'up';
      loop.push({
        x: current.x,
        y: current.y,
      });
      steps += 1;
    } else if (lastMove !== 'left'
      && ['S', '-', 'L', 'F'].includes(current.char)
      && ['S', '-', 'J', '7'].includes(map[current.y]?.[current.x + 1])) {
      // Check right
      current.x += 1;
      current.char = map[current.y][current.x];
      lastMove = 'right';
      loop.push({
        x: current.x,
        y: current.y,
      });
      steps += 1;
    } else if (lastMove !== 'up'
      && ['S', '|', 'F', '7'].includes(current.char)
      && ['S', '|', 'L', 'J'].includes(map[current.y + 1]?.[current.x])) {
      // Check down
      current.y += 1;
      current.char = map[current.y][current.x];
      lastMove = 'down';
      loop.push({
        x: current.x,
        y: current.y,
      });
      steps += 1;
    } else if (lastMove !== 'right'
      && ['S', '-', 'J', '7'].includes(current.char)
      && ['S', '-', 'F', 'L'].includes(map[current.y]?.[current.x - 1])) {
      // Check left
      current.x -= 1;
      current.char = map[current.y][current.x];
      lastMove = 'left';
      loop.push({
        x: current.x,
        y: current.y,
      });
      steps += 1;
    } else {
      throw new Error('No path found');
    }
  }

  // Replace non loop tiles with .
  map.forEach((line, y) => {
    line.forEach((char, x) => {
      if (loop.find((tile) => tile.x === x && tile.y === y)) {
        return;
      }
      map[y][x] = '.';
    });
  });

  console.log(map.map((line) => line.join('')).join('\n'));

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        7-F7-
        .FJ|7
        SJLL7
        |F--J
        LJ.LJ
        `,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        FF7FSF7F7F7F7F7F---7
        L|LJ||||||||||||F--J
        FL-7LJLJ||||||LJL-77
        F--JF--7||LJLJ7F7FJ-
        L---JF-JLJ.||-FJLJJ7
        |F|F-JF---7F7-L7L|7|
        |FFJF7L7F-JF7|JL---7
        7-L-JL7||F7|L7F-7F7|
        L.L7LFJ|||||FJL7||LJ
        L7JLJL-JLJLJL--JLJ.L
        `,
        expected: 10,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
