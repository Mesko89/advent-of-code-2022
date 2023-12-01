export function rotateGridRight(grid, times = 1) {
  while (times--) {
    let rotatedGrid = JSON.parse(JSON.stringify(grid));
    for (let y = 0; y < rotatedGrid.length; y++) {
      for (let x = 0; x < rotatedGrid.length; x++) {
        rotatedGrid[x][rotatedGrid.length - y - 1] = grid[y][x];
      }
    }
    grid = rotatedGrid;
  }
  return grid;
}

export function flipGridVertical(grid) {
  return JSON.parse(JSON.stringify(grid)).reverse();
}

export function flipGridHorizontal(grid) {
  return JSON.parse(JSON.stringify(grid)).map((l) => l.reverse());
}
