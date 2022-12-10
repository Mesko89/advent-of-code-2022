function parseGrid(input) {
  const grid = input.map((line) => line.split('').map((v) => parseInt(v)));
  return {
    get(x, y) {
      return grid[y][x];
    },
    key(x, y) {
      return `${x},${y}`;
    },
    width: grid[0].length,
    height: grid.length,
    debug() {
      console.log(grid.map((l) => l.join('')).join('\n'));
    },
  };
}

function findVisibleTrees(grid) {
  const visible = new Set();
  function findFromLeft() {
    for (let y = 0; y < grid.height; y++) {
      let smallest = -1;
      for (let x = 0; x < grid.width; x++) {
        if (smallest === 9) break;
        if (grid.get(x, y) > smallest) {
          smallest = grid.get(x, y);
          visible.add(grid.key(x, y));
        }
      }
    }
  }
  function findFromRight() {
    for (let y = 0; y < grid.height; y++) {
      let smallest = -1;
      for (let x = grid.width - 1; x >= 0; x--) {
        if (smallest === 9) break;
        if (grid.get(x, y) > smallest) {
          smallest = grid.get(x, y);
          visible.add(grid.key(x, y));
        }
      }
    }
  }
  function findFromTop() {
    for (let x = 0; x < grid.width; x++) {
      let smallest = -1;
      for (let y = 0; y < grid.height; y++) {
        if (smallest === 9) break;
        if (grid.get(x, y) > smallest) {
          smallest = grid.get(x, y);
          visible.add(grid.key(x, y));
        }
      }
    }
  }
  function findFromBottom() {
    for (let x = 0; x < grid.width; x++) {
      let smallest = -1;
      for (let y = grid.height - 1; y >= 0; y--) {
        if (smallest === 9) break;
        if (grid.get(x, y) > smallest) {
          smallest = grid.get(x, y);
          visible.add(grid.key(x, y));
        }
      }
    }
  }
  findFromLeft();
  findFromRight();
  findFromTop();
  findFromBottom();

  return Array.from(visible).map((v) => ({
    x: parseInt(v.split(',')[0]),
    y: parseInt(v.split(',')[1]),
  }));
}

function getScenicScore(tree, grid) {
  let score = 1;
  function findLeftScore() {
    let treesSeen = 0;
    for (let x = tree.x - 1; x >= 0; x--) {
      if (grid.get(x, tree.y) < grid.get(tree.x, tree.y)) {
        treesSeen++;
      } else {
        treesSeen++;
        break;
      }
    }
    score *= treesSeen;
  }
  function findRightScore() {
    let treesSeen = 0;
    for (let x = tree.x + 1; x < grid.width; x++) {
      if (grid.get(x, tree.y) < grid.get(tree.x, tree.y)) {
        treesSeen++;
      } else {
        treesSeen++;
        break;
      }
    }
    score *= treesSeen;
  }
  function findUpScore() {
    let treesSeen = 0;
    for (let y = tree.y - 1; y >= 0; y--) {
      if (grid.get(tree.x, y) < grid.get(tree.x, tree.y)) {
        treesSeen++;
      } else {
        treesSeen++;
        break;
      }
    }
    score *= treesSeen;
  }
  function findDownScore() {
    let treesSeen = 0;
    for (let y = tree.y + 1; y < grid.height; y++) {
      if (grid.get(tree.x, y) < grid.get(tree.x, tree.y)) {
        treesSeen++;
      } else {
        treesSeen++;
        break;
      }
    }
    score *= treesSeen;
  }
  findLeftScore();
  findRightScore();
  findUpScore();
  findDownScore();
  return score;
}

export function part1(input) {
  const grid = parseGrid(input);
  return findVisibleTrees(grid).length;
}
export function part2(input) {
  const grid = parseGrid(input);
  const candidates = findVisibleTrees(grid);
  let bestScore = 0;
  for (const candidate of candidates) {
    const score = getScenicScore(candidate, grid);
    if (score > bestScore) {
      bestScore = score;
    }
  }
  return bestScore;
}
