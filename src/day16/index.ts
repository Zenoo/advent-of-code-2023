import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;


const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input.split("\n").map((line) => line.split(""));

  type Beam = {
    x: number;
    y: number;
    direction: "R" | "L" | "U" | "D";
  };

  const beams: Beam[] = [{
    x: 0,
    y: 0,
    direction: "R",
  }];

  type EnergizedTile = {
    L: boolean;
    R: boolean;
    U: boolean;
    D: boolean;
  } | null;

  const energizedMap = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => null)) as EnergizedTile[][];

  while (beams.length) {
    beams.forEach((beam) => {
      if (beam.x < 0 || beam.x >= map[0].length || beam.y < 0 || beam.y >= map.length) {
        // console.log("Beam out of bounds", beam);
        
        // Remove beam
        beams.splice(beams.findIndex((b) => b.x === beam.x && b.y === beam.y), 1);
        return;
      }

      // console.log("BEAM", beam);

      if (!energizedMap[beam.y][beam.x]) {
        energizedMap[beam.y][beam.x] = {
          L: false,
          R: false,
          U: false,
          D: false,
        };
      }

      const energizedTile = energizedMap[beam.y][beam.x];
      if (!energizedTile) {
        throw new Error("Energized tile not found");
      }

      if (energizedTile[beam.direction]) {
        // console.log("BEAM ALREADY ENERGIZED", beam);
        // Remove beam
        beams.splice(beams.findIndex((b) => b.x === beam.x && b.y === beam.y), 1);
        return;
      }

      energizedTile[beam.direction] = true;

      const tile = map[beam.y][beam.x];

      if (tile === "-") {
        switch (beam.direction) {
          case "R":
          case "L":
            break;
          case "U":
          case "D":
            // Split beam
            beams.push({
              x: beam.x,
              y: beam.y,
              direction: "R",
            });

            beam.direction = "L";
            break;
        }
      } else if (tile === "|") {
        switch (beam.direction) {
          case "R":
          case "L":
            // Split beam
            beams.push({
              x: beam.x,
              y: beam.y,
              direction: "U",
            });

            beam.direction = "D";
            break;
          case "U":
          case "D":
            break;
        }
      } else if (tile === "/") {
        switch (beam.direction) {
          case "R":
            beam.direction = "U";
            break;
          case "L":
            beam.direction = "D";
            break;
          case "U":
            beam.direction = "R";
            break;
          case "D":
            beam.direction = "L";
            break;
        }
      } else if (tile === "\\") {
        switch (beam.direction) {
          case "R":
            beam.direction = "D";
            break;
          case "L":
            beam.direction = "U";
            break;
          case "U":
            beam.direction = "L";
            break;
          case "D":
            beam.direction = "R";
            break;
        }
      }

      switch (beam.direction) {
        case "R":
          beam.x++;
          break;
        case "L":
          beam.x--;
          break;
        case "U":
          beam.y--;
          break;
        case "D":
          beam.y++;
          break;
      }
    });
  }

  // console.log('  0123456789');
  // console.log(energizedMap.map((row, i) => i + ' ' + row.map((tile) => tile ? "#" : ".").join("")).join("\n"));

  return energizedMap.reduce((sum, row) => sum + row.filter((tile) => tile).length, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const map = input.split("\n").map((line) => line.split(""));

  type Beam = {
    x: number;
    y: number;
    direction: "R" | "L" | "U" | "D";
  };

  type EnergizedTile = {
    L: boolean;
    R: boolean;
    U: boolean;
    D: boolean;
  } | null;

  const possibleStarts: Beam[] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      // Only possible starts are on the edges
      if (x > 0 && x < map[0].length - 1 && y > 0 && y < map.length - 1) {
        continue;
      }

      // Two possible starts on corners
      if (x === 0 && y === 0) {
        possibleStarts.push({
          x,
          y,
          direction: "R",
        });
        possibleStarts.push({
          x,
          y,
          direction: "D",
        });
      } else if (x === map[0].length - 1 && y === 0) {
        possibleStarts.push({
          x,
          y,
          direction: "L",
        });
        possibleStarts.push({
          x,
          y,
          direction: "D",
        });
      } else if (x === 0 && y === map.length - 1) {
        possibleStarts.push({
          x,
          y,
          direction: "R",
        });
        possibleStarts.push({
          x,
          y,
          direction: "U",
        });
      } else if (x === map[0].length - 1 && y === map.length - 1) {
        possibleStarts.push({
          x,
          y,
          direction: "L",
        });
        possibleStarts.push({
          x,
          y,
          direction: "U",
        });
      } else {
        // One possible start on edges
        if (x === 0) {
          possibleStarts.push({
            x,
            y,
            direction: "R",
          });
        } else if (x === map[0].length - 1) {
          possibleStarts.push({
            x,
            y,
            direction: "L",
          });
        } else if (y === 0) {
          possibleStarts.push({
            x,
            y,
            direction: "D",
          });
        } else if (y === map.length - 1) {
          possibleStarts.push({
            x,
            y,
            direction: "U",
          });
        }
      }
    }
  }

  const energizedCounts: [Beam, number][] = [];

  for (const start of possibleStarts) {
    const beams: Beam[] = [start];

    const startClone = { ...start };

    const energizedMap = Array.from({ length: map.length }, () => Array.from({ length: map[0].length }, () => null)) as EnergizedTile[][];
  
    while (beams.length) {
      beams.forEach((beam) => {
        if (beam.x < 0 || beam.x >= map[0].length || beam.y < 0 || beam.y >= map.length) {
          // console.log("Beam out of bounds", beam);
          
          // Remove beam
          beams.splice(beams.findIndex((b) => b.x === beam.x && b.y === beam.y), 1);
          return;
        }
  
        // console.log("BEAM", beam);
  
        if (!energizedMap[beam.y][beam.x]) {
          energizedMap[beam.y][beam.x] = {
            L: false,
            R: false,
            U: false,
            D: false,
          };
        }
  
        const energizedTile = energizedMap[beam.y][beam.x];
        if (!energizedTile) {
          throw new Error("Energized tile not found");
        }
  
        if (energizedTile[beam.direction]) {
          // console.log("BEAM ALREADY ENERGIZED", beam);
          // Remove beam
          beams.splice(beams.findIndex((b) => b.x === beam.x && b.y === beam.y), 1);
          return;
        }
  
        energizedTile[beam.direction] = true;
  
        const tile = map[beam.y][beam.x];
  
        if (tile === "-") {
          switch (beam.direction) {
            case "R":
            case "L":
              break;
            case "U":
            case "D":
              // Split beam
              beams.push({
                x: beam.x,
                y: beam.y,
                direction: "R",
              });
  
              beam.direction = "L";
              break;
          }
        } else if (tile === "|") {
          switch (beam.direction) {
            case "R":
            case "L":
              // Split beam
              beams.push({
                x: beam.x,
                y: beam.y,
                direction: "U",
              });
  
              beam.direction = "D";
              break;
            case "U":
            case "D":
              break;
          }
        } else if (tile === "/") {
          switch (beam.direction) {
            case "R":
              beam.direction = "U";
              break;
            case "L":
              beam.direction = "D";
              break;
            case "U":
              beam.direction = "R";
              break;
            case "D":
              beam.direction = "L";
              break;
          }
        } else if (tile === "\\") {
          switch (beam.direction) {
            case "R":
              beam.direction = "D";
              break;
            case "L":
              beam.direction = "U";
              break;
            case "U":
              beam.direction = "L";
              break;
            case "D":
              beam.direction = "R";
              break;
          }
        }
  
        switch (beam.direction) {
          case "R":
            beam.x++;
            break;
          case "L":
            beam.x--;
            break;
          case "U":
            beam.y--;
            break;
          case "D":
            beam.y++;
            break;
        }
      });
    }

    energizedCounts.push([startClone, energizedMap.reduce((sum, row) => sum + row.filter((tile) => tile).length, 0)]);
  }

  return energizedCounts.sort((a, b) => b[1] - a[1])[0][1];
};

run({
  part1: {
    tests: [
      {
        input: `
        .|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....
        `,
        expected: 46,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        .|...\\....
        |.-.\\.....
        .....|-...
        ........|.
        ..........
        .........\\
        ..../.\\\\..
        .-.-/..|..
        .|....-|.\\
        ..//.|....
        `,
        expected: 51,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
