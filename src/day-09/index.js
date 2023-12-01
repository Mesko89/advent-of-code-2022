const DIRECTIONS = {
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
  U: { x: 0, y: -1 },
  D: { x: 0, y: 1 },
};

const keyPos = ({ x, y }) => `${x},${y}`;

function parseInput(input) {
  return input.map((line) => {
    return {
      direction: line[0],
      count: parseInt(line.substring(2)),
    };
  });
}

const POSSIBLE_TAIL_DIRECTIONS = [
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 0 },
  { x: 1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: 1 },
  { x: 1, y: 1 },
];

function getNextKnotPosition(current, prevKnot) {
  const isNear = POSSIBLE_TAIL_DIRECTIONS.some(
    (pos) =>
      prevKnot.x === current.x + pos.x && prevKnot.y === current.y + pos.y
  );
  if (isNear) {
    return current;
  } else if (current.x !== prevKnot.x && current.y === prevKnot.y) {
    return {
      x: current.x + (prevKnot.x > current.x ? 1 : -1),
      y: current.y,
    };
  } else if (current.x === prevKnot.x && current.y !== prevKnot.y) {
    return {
      x: current.x,
      y: current.y + (prevKnot.y > current.y ? 1 : -1),
    };
  } else {
    return {
      x: current.x + (prevKnot.x > current.x ? 1 : -1),
      y: current.y + (prevKnot.y > current.y ? 1 : -1),
    };
  }
}

function debug(visited, rope) {
  let output = '';
  for (let y = -10; y <= 10; y++) {
    let line = '';
    for (let x = -10; x <= 10; x++) {
      let found = false;
      rope.some((knot, index) => {
        if (knot.x === x && knot.y === y) {
          line += index;
          found = true;
          return true;
        }
      });
      if (found) continue;
      if (visited.has(keyPos({ x, y }))) {
        line += '#';
      } else {
        line += '.';
      }
    }
    output += line + '\n';
  }
  console.log(output);
}

function findVisited(instructions, numberOfKnots = 1) {
  const visited = new Set([keyPos({ x: 0, y: 0 })]);
  let rope = Array.from({ length: numberOfKnots + 1 }).map(() => ({
    x: 0,
    y: 0,
  }));

  for (const { direction, count } of instructions) {
    for (let i = 0; i < count; i++) {
      rope[0].x += DIRECTIONS[direction].x;
      rope[0].y += DIRECTIONS[direction].y;

      for (let j = 1; j < rope.length; j++) {
        rope[j] = getNextKnotPosition(rope[j], rope[j - 1]);
      }
      visited.add(keyPos(rope[rope.length - 1]));
    }
  }

  return visited;
}

export function part1(input) {
  const instructions = parseInput(input);
  const visited = findVisited(instructions);
  return visited.size;
}
export function part2(input) {
  const instructions = parseInput(input);
  const visited = findVisited(instructions, 9);
  return visited.size;
}
