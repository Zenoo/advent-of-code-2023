import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const types = [
  'soil',
  'fertilizer',
  'water',
  'light',
  'temperature',
  'humidity',
  'location',
];

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  // Get seed numbers
  let seeds = input.split('\n')[0].split(': ')[1].trim().split(' ').map(Number);

  // Get type maps
  const maps = input.split(/\n\n[\w-]+ map:\n/).slice(1);

  for (const map of maps) {
    const lines = map.split('\n');

    const newSeeds = [...seeds];
    for (const line of lines) {
      const [destinationStart, sourceStart, range] = line.split(' ').map(Number);

      // Get seeds that are in range
      for (let j = 0; j < seeds.length; j++) {
        const seed = seeds[j];

        if (seed >= sourceStart && seed < sourceStart + range) {
          // Move seed to destination
          newSeeds[j] = destinationStart + (seed - sourceStart);
        }
      }
    }

    seeds = [...newSeeds];
  }

  // Return lowest seed
  return Math.min(...seeds);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let minimum = Infinity;
  
  // Get seed numbers
  const numbers = input.split('\n')[0].split(': ')[1].trim().split(' ').map(Number);
  
  // Get type maps
  const maps = input.split(/\n\n[\w-]+ map:\n/).slice(1);

  // Odd indexes are the seed start and even are the range
  for (let i = 0; i < numbers.length; i += 2) {
    let seed = numbers[i];
    const end = seed + numbers[i + 1];
    
    // Process each seed in range
    while (seed < end) {
      let newSeed = seed;
      for (const map of maps) {
        const lines = map.split('\n');
  
        for (const line of lines) {
          const [destinationStart, sourceStart, range] = line.split(' ').map(Number);
    
          // Check if seed is in range
          if (newSeed >= sourceStart && newSeed < sourceStart + range) {
            // Move seed to destination
            newSeed = destinationStart + (newSeed - sourceStart);

            // Break out of loop
            break;
          }
        }
      }

      // Store new seed if it's the lowest
      if (newSeed < minimum) {
        minimum = newSeed;
      }
      seed += 1;
    }
  }

  // Return lowest seed
  return minimum;
};

run({
  part1: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48
        
        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15
        
        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4
        
        water-to-light map:
        88 18 7
        18 25 70
        
        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13
        
        temperature-to-humidity map:
        0 69 1
        1 0 69
        
        humidity-to-location map:
        60 56 37
        56 93 4
        `,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
