const DIR = {
  RIGHT: 'right',
  LEFT: 'left',
  UP: 'up',
  DOWN: 'down',
};

const VECTOR = {
  [DIR.RIGHT]: { x: 1, y: 0 },
  [DIR.LEFT]: { x: -1, y: 0 },
  [DIR.UP]: { x: 0, y: -1 },
  [DIR.DOWN]: { x: 0, y: 1 },
};

const SCORE = {
  [DIR.RIGHT]: 0,
  [DIR.DOWN]: 1,
  [DIR.LEFT]: 2,
  [DIR.UP]: 3,
};

const ROTATE = {
  L: {
    [DIR.RIGHT]: DIR.UP,
    [DIR.LEFT]: DIR.DOWN,
    [DIR.UP]: DIR.LEFT,
    [DIR.DOWN]: DIR.RIGHT,
  },
  R: {
    [DIR.RIGHT]: DIR.DOWN,
    [DIR.LEFT]: DIR.UP,
    [DIR.UP]: DIR.RIGHT,
    [DIR.DOWN]: DIR.LEFT,
  },
};

function toField(field) {
  const width = field.reduce(
    (maxW, row) => (row.length > maxW ? row.length : maxW),
    0
  );
  const height = field.length;
  return {
    width,
    height,
    field: field.map((row) => {
      if (row.length === width) return row;
      return row + ' '.repeat(width - row.length);
    }),
    get(x, y) {
      return field[y][x];
    },
    getNewPosition(pos, steps) {
      const v = VECTOR[pos.dir];
      while (steps--) {
        let newPos = { ...pos };
        do {
          newPos.x += v.x;
          newPos.y += v.y;
          if (newPos.x < 0) newPos.x = width - 1;
          if (newPos.y < 0) newPos.y = height - 1;
          if (newPos.x >= width) newPos.x = 0;
          if (newPos.y >= height) newPos.y = 0;
        } while (
          this.get(newPos.x, newPos.y) !== '.' &&
          this.get(newPos.x, newPos.y) !== '#'
        );
        if (this.get(newPos.x, newPos.y) === '#') {
          return pos;
        }
        pos = newPos;
      }
      return pos;
    },
  };
}

function parseInput(input) {
  const field = [];
  let i = 0;
  while (input[i]) {
    field.push(input[i]);
    i++;
  }
  const instructions = input[i + 1]
    .split(/(\d+)/)
    .filter(Boolean)
    .map((v) => {
      if (/\d+/.test(v)) return parseInt(v);
      else return v;
    });
  let x = 0;
  while (field[0][x] === ' ') x++;
  const startPosition = { x, y: 0, dir: DIR.RIGHT };
  return { field: toField(field), instructions, startPosition };
}

function simulateInstructions(field, instructions, startPosition) {
  let position = { ...startPosition };
  for (const instruction of instructions) {
    if (instruction in ROTATE) {
      position.dir = ROTATE[instruction][position.dir];
    } else {
      position = field.getNewPosition(position, instruction);
    }
  }
  return { position };
}

const inputConfig = {
  points: {
    1: { x: 8, y: 0 },
    2: { x: 0, y: 4 },
    3: { x: 4, y: 4 },
    4: { x: 8, y: 4 },
    5: { x: 8, y: 8 },
    6: { x: 12, y: 8 },
  },
  cube: {
    1: {
      [DIR.UP]: { cube: 2, dir: DIR.DOWN },
      [DIR.RIGHT]: { cube: 6, dir: DIR.LEFT },
      [DIR.DOWN]: { cube: 4, dir: DIR.DOWN },
      [DIR.LEFT]: { cube: 3, dir: DIR.DOWN },
    },
    2: {
      [DIR.UP]: { cube: 1, dir: DIR.RIGHT },
      [DIR.RIGHT]: { cube: 3, dir: DIR.RIGHT },
      [DIR.DOWN]: { cube: 5, dir: DIR.UP },
      [DIR.LEFT]: { cube: 6, dir: DIR.UP },
    },
  },
};

export function part1(input) {
  const { field, instructions, startPosition } = parseInput(input);
  console.log(field.width, field.height);
  const { position } = simulateInstructions(field, instructions, startPosition);
  return 1000 * (position.y + 1) + 4 * (position.x + 1) + SCORE[position.dir];
}
export function part2(input, config = inputConfig) {}
