function parseInput(input) {
  const markedPositions = new Set();
  let maxX = 0;
  let maxY = 0;
  let i = 0;
  while (i < input.length) {
    if (input[i] === '') break;
    markedPositions.add(input[i]);
    const [x, y] = input[i].split(',').map((v) => parseInt(v));
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
    i++;
  }
  i++;
  const instructions = [];
  while (i < input.length) {
    const [_, direction, line] = input[i].match(/fold along (\w)=(\d+)/);
    instructions.push({ direction, line: parseInt(line) });
    i++;
  }
  return { paper: { markedPositions, maxX, maxY }, instructions };
}

const toKey = (x, y) => `${x},${y}`;

function foldY(paper, line) {
  const markedPositions = new Set();
  for (let x = 0; x <= paper.maxX; x++) {
    for (let y = 0; y < line; y++) {
      if (
        paper.markedPositions.has(toKey(x, y)) ||
        paper.markedPositions.has(toKey(x, line * 2 - y))
      ) {
        markedPositions.add(toKey(x, y));
      }
    }
  }
  return { markedPositions, maxX: paper.maxX, maxY: line - 1 };
}

function foldX(paper, line) {
  const markedPositions = new Set();
  for (let x = 0; x < line; x++) {
    for (let y = 0; y <= paper.maxY; y++) {
      if (
        paper.markedPositions.has(toKey(x, y)) ||
        paper.markedPositions.has(toKey(line * 2 - x, y))
      ) {
        markedPositions.add(toKey(x, y));
      }
    }
  }
  return { markedPositions, maxY: paper.maxY, maxX: line - 1 };
}

function fold(paper, instruction) {
  if (instruction.direction === 'x') {
    return foldX(paper, instruction.line);
  } else {
    return foldY(paper, instruction.line);
  }
}

function toString(paper) {
  let r = '\n';
  for (let y = 0; y <= paper.maxY; y++) {
    for (let x = 0; x <= paper.maxX; x++) {
      if (paper.markedPositions.has(toKey(x, y))) {
        r += '#';
      } else {
        r += '.';
      }
    }
    r += '\n';
  }
  return r;
}

export function part1(input) {
  let { paper, instructions } = parseInput(input);
  const instruction = instructions[0];
  paper = fold(paper, instruction);
  return paper.markedPositions.size;
}

export function part2(input) {
  let { paper, instructions } = parseInput(input);
  for (const instruction of instructions) {
    paper = fold(paper, instruction);
  }
  return toString(paper);
}
