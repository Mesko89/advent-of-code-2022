import aStar from 'a-star';

function parseGrid(input) {
  return input.map((line) => line.split('').map((v) => parseInt(v)));
}

function enlarge(grid, times) {
  const newGrid = Array.from({ length: grid.length * times }).map(() =>
    Array.from({ length: grid[0].length * times })
  );

  function copyGrid(startLocation, multiplier) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        newGrid[y + startLocation[1]][x + startLocation[0]] =
          ((grid[y][x] - 1 + multiplier) % 9) + 1;
      }
    }
  }

  for (let x = 0; x < times; x++) {
    for (let y = 0; y < times; y++) {
      copyGrid([grid[0].length * x, grid.length * y], x + y);
    }
  }

  return newGrid;
}

function getNeighbors(pos) {
  return [
    [pos[0] - 1, pos[1]],
    [pos[0] + 1, pos[1]],
    [pos[0], pos[1] - 1],
    [pos[0], pos[1] + 1],
  ];
}

function findLowestRiskPath(grid, start, end) {
  const result = aStar({
    start,
    isEnd: (pos) => pos.every((v, i) => v === end[i]),
    neighbor: (pos) =>
      getNeighbors(pos).filter(
        (pos) =>
          pos[0] >= 0 &&
          pos[0] < grid[0].length &&
          pos[1] >= 0 &&
          pos[1] < grid.length
      ),
    distance: (_, pos2) => grid[pos2[1]][pos2[0]],
    heuristic: () => 1,
    hash: (pos) => pos.join(','),
    timeout: 5000,
  });
  return result;
}

export function part1(input) {
  const grid = parseGrid(input);
  return findLowestRiskPath(grid, [0, 0], [grid[0].length - 1, grid.length - 1])
    .cost;
}

export function part2(input) {
  const grid = enlarge(parseGrid(input), 5);
  return findLowestRiskPath(grid, [0, 0], [grid[0].length - 1, grid.length - 1])
    .cost;
}
