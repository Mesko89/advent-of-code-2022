import { arrayFlat } from '../utils/array';

function parseField(input) {
  const field = input.map((line) => line.split('').map((v) => parseInt(v)));
  const width = field[0].length;
  const height = field.length;

  return {
    field,
    width,
    height,
    get(x, y) {
      return field[y][x];
    },
    getNeighbors(x, y) {
      return [
        [x - 1, y],
        [x, y - 1],
        [x + 1, y],
        [x, y + 1],
      ].filter(([x, y]) => x >= 0 && x < width && y >= 0 && y < height);
    },
  };
}

function removeDuplicates(arr) {
  return Array.from(new Set(arr.map((v) => v.join(',')))).map((v) =>
    v.split(',').map((v) => parseInt(v))
  );
}

function getBasin(x, y, field) {
  const value = field.get(x, y);
  if (value === 9 || value === undefined) return [];
  return removeDuplicates(
    [[x, y]].concat(
      arrayFlat(
        field
          .getNeighbors(x, y)
          .filter((pos) => field.get(...pos) > value)
          .map((pos) => getBasin(...pos, field))
      )
    )
  );
}

function getLowPoints(field) {
  const points = [];
  for (let x = 0; x < field.width; x++) {
    for (let y = 0; y < field.height; y++) {
      const v = field.get(x, y);
      const isLowPoint = field
        .getNeighbors(x, y)
        .every(([x, y]) => field.get(x, y) > v);
      if (isLowPoint) {
        points.push([x, y]);
      }
    }
  }
  return points;
}

function getBasins(field) {
  const lowPoints = getLowPoints(field);
  const basins = [];
  for (const [x, y] of lowPoints) {
    basins.push(getBasin(x, y, field));
  }
  return basins;
}

export function part1(input) {
  const field = parseField(input);
  const points = getLowPoints(field);
  return points.map((v) => field.get(...v) + 1).reduce((a, b) => a + b);
}

export function part2(input) {
  const field = parseField(input);
  const basins = getBasins(field);
  return basins
    .map((b) => b.length)
    .sort((a, b) => b - a)
    .filter((_, i) => i < 3)
    .reduce((a, b) => a * b);
}
