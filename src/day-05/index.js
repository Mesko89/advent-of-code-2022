const lineRx = /(\d+),(\d+) -> (\d+),(\d+)/;
function parseField(input, { includeDiagonals = false } = {}) {
  const field = new Map();
  const markSpot = (x, y) => {
    const key = `${x},${y}`;
    if (field.has(key)) {
      field.set(key, field.get(key) + 1);
    } else {
      field.set(key, 1);
    }
  };

  for (const line of input) {
    const [_, x1, y1, x2, y2] = line.match(lineRx).map((v) => parseInt(v));
    if (x1 === x2) {
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      for (let y = minY; y <= maxY; y++) {
        markSpot(x1, y);
      }
    } else if (y1 === y2) {
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      for (let x = minX; x <= maxX; x++) {
        markSpot(x, y1);
      }
    } else if (includeDiagonals) {
      const vector = { x: x2 - x1 > 0 ? 1 : -1, y: y2 - y1 > 0 ? 1 : -1 };
      let currSpot = { x: x1, y: y1 };
      while (currSpot.x !== x2 && currSpot.y !== y2) {
        markSpot(currSpot.x, currSpot.y);
        currSpot = { x: currSpot.x + vector.x, y: currSpot.y + vector.y };
      }
      markSpot(currSpot.x, currSpot.y);
    }
  }

  return field;
}

export function part1(input) {
  const field = parseField(input);
  return Array.from(field.values()).filter((v) => v > 1).length;
}
export function part2(input) {
  const field = parseField(input, { includeDiagonals: true });
  return Array.from(field.values()).filter((v) => v > 1).length;
}
