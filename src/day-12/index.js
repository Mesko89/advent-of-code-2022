import aStar from 'a-star';

const LEVELS = 'abcdefghijklmnopqrstuvwxyz';
const level = (char) =>
  char === 'S'
    ? LEVELS.indexOf('a')
    : char === 'E'
    ? LEVELS.indexOf('z')
    : LEVELS.indexOf(char);

function scanMap(input) {
  let start = null;
  let end = null;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === 'S') {
        start = { x, y };
      } else if (input[y][x] === 'E') {
        end = { x, y };
      }
    }
  }
  return {
    start,
    end,
    get(x, y) {
      return input[y]?.[x];
    },
  };
}

const possibleNeighbors = ({ x, y }) => [
  { x: x + 1, y: y },
  { x: x + -1, y: y },
  { x: x, y: y + 1 },
  { x: x, y: y + -1 },
];

export function part1(input) {
  const { start, end, get } = scanMap(input);
  const path = aStar({
    start,
    isEnd: (pos) => get(pos.x, pos.y) === 'E',
    hash: ({ x, y }) => `${x},${y}`,
    distance: () => 1,
    heuristic: () => 1,
    timeout: 30000,
    neighbor: (pos) => {
      const nodes = possibleNeighbors(pos).filter((p) => {
        const nextChar = get(p.x, p.y);
        if (!nextChar) return false;
        const currentChar = get(pos.x, pos.y);
        const nextLevel = level(nextChar);
        const currentLevel = level(currentChar);
        return nextLevel <= currentLevel + 1;
      });
      return nodes;
    },
  });
  return path.cost;
}
export function part2(input) {
  const { start, end, get } = scanMap(input);
  const path = aStar({
    start: end,
    isEnd: (pos) => get(pos.x, pos.y) === 'a',
    hash: ({ x, y }) => `${x},${y}`,
    distance: () => 1,
    heuristic: () => 1,
    timeout: 30000,
    neighbor: (pos) => {
      const nodes = possibleNeighbors(pos).filter((p) => {
        const nextChar = get(p.x, p.y);
        if (!nextChar) return false;
        const currentChar = get(pos.x, pos.y);
        const nextLevel = LEVELS.length - level(nextChar);
        const currentLevel = LEVELS.length - level(currentChar);
        return nextLevel <= currentLevel + 1;
      });
      return nodes;
    },
  });
  return path.cost;
}
