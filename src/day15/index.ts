import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.split(',').reduce((acc, curr) => {
    const singleResult = curr.split('').reduce((acc, curr) => {
      return ((acc + curr.charCodeAt(0)) * 17) % 256;
    }, 0);

    return acc + singleResult;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const boxes = Array.from<{
    label: string;
    focalLength: number;
  }[]>({ length: 256 });

  input.split(',').forEach((data) => {
    const [label, focalLength] = data.split(/=|-/);

    // console.log(label, focalLength)

    const labelHash = label.split('').reduce((acc, curr) => {
      return ((acc + curr.charCodeAt(0)) * 17) % 256;
    }, 0);

    if (focalLength) {
      if (!boxes[labelHash]) boxes[labelHash] = [];
      const box = boxes[labelHash];

      // Check if the box already has this label
      const lens = box.find((lens) => lens.label === label);

      if (lens) {
        // If it does, replace it
        lens.focalLength = +focalLength;
      } else {
        // If it doesn't, add it
        boxes[labelHash].push({
          label,
          focalLength: +focalLength,
        });
      }
    } else {
      // Get the correct box
      if (!boxes[labelHash]) boxes[labelHash] = [];
      const box = boxes[labelHash];

      // Remove the lens with the current label if it exists
      const lensIndex = box.findIndex((lens) => lens.label === label);
      if (lensIndex !== -1) {
        box.splice(lensIndex, 1);
      }
    }

    // console.log(boxes.map((box, i) => `Box ${i}:${box?.map((lens) => `[${lens.label} ${lens.focalLength}]`)}`).filter((box) => !box.endsWith('undefined')));
  });

  return boxes.reduce((acc, box, i) => {
    if (!box) return acc;

    return acc + box.reduce((acc, lens, j) => {
      return acc + (i + 1) * (j + 1) * lens.focalLength;
    }, 0);
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `HASH`,
        expected: 52,
      },
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 1320,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
        expected: 145,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
