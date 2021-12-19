function parseBoundaries(line) {
  const [_, x1, x2, y2, y1] = line
    .match(/target area: x=(-?\d+)..(-?\d+), y=(-?\d+)..(-?\d+)/)
    .map((v) => parseInt(v, 10));
  return { x1, x2, y1, y2 };
}

function findMaxY(boundaries) {
  let bestConfig = { yVector: 0, maxY: 0 };
  for (let i = 0; i < 1000; i++) {
    let maxY = 0;
    let currentY = 0;
    let yVector = i;
    let missed = true;
    while (currentY >= boundaries.y2) {
      if (currentY > maxY) {
        maxY = currentY;
      }
      if (currentY <= boundaries.y1 && currentY >= boundaries.y2) {
        missed = false;
      }
      currentY += yVector;
      yVector -= 1;
    }
    if (!missed && bestConfig.maxY < maxY) {
      bestConfig = { yVector: i, maxY };
    }
    if (missed === true) {
    }
  }
  return bestConfig;
}

function willHit([xVector, yVector], boundaries) {
  let currentX = 0;
  let currentY = 0;
  while (currentY >= boundaries.y2 && currentX <= boundaries.x2) {
    if (
      currentY <= boundaries.y1 &&
      currentY >= boundaries.y2 &&
      currentX >= boundaries.x1 &&
      currentX <= boundaries.x2
    ) {
      return true;
    }
    currentX += xVector;
    currentY += yVector;
    xVector = Math.max(xVector - 1, 0);
    yVector -= 1;
  }
  return false;
}

function findConfigurations(boundaries) {
  const maxYConfig = findMaxY(boundaries);
  const configurations = [];
  for (let x = 0; x <= boundaries.x2; x++) {
    for (let y = -maxYConfig.yVector - 1; y <= maxYConfig.yVector + 1; y++) {
      if (willHit([x, y], boundaries)) {
        configurations.push([x, y]);
      }
    }
  }
  return configurations;
}

export function part1(input) {
  const boundaries = parseBoundaries(input[0]);
  return findMaxY(boundaries).maxY;
}

export function part2(input) {
  const boundaries = parseBoundaries(input[0]);
  return findConfigurations(boundaries).length;
}
