const toKey = (x, y) => `${x},${y}`;
function DumboOctopus(x, y, level, fieldWidth, fieldHeight) {
  return {
    key: toKey(x, y),
    level,
    neighbors: [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ]
      .filter(
        ([px, py]) => px >= 0 && py >= 0 && px < fieldWidth && py < fieldHeight
      )
      .map((pos) => toKey(...pos)),
  };
}

function parseField(input) {
  const map = new Map();
  input.forEach((line, y) =>
    line.split('').forEach((eneryLevelStr, x) => {
      const octopus = DumboOctopus(
        x,
        y,
        parseInt(eneryLevelStr),
        line.length,
        input.length
      );
      map.set(octopus.key, octopus);
    })
  );
  return {
    map,
    width: input[0].length,
    height: input.length,
    totalExploded: 0,
  };
}

function simulateStep(field) {
  const { map } = field;
  let toExplode = new Set();
  const exploded = new Set();
  for (const [key, octopus] of map) {
    octopus.level++;
    if (octopus.level > 9) {
      toExplode.add(octopus.key);
    }
  }

  while (toExplode.size) {
    let newToExplode = new Set();
    for (const toExplodeKey of toExplode.values()) {
      exploded.add(toExplodeKey);
      const octopus = map.get(toExplodeKey);
      for (const neighborKey of octopus.neighbors) {
        if (exploded.has(neighborKey) || toExplode.has(neighborKey)) continue;
        const neighbor = map.get(neighborKey);
        neighbor.level++;
        if (neighbor.level > 9) {
          newToExplode.add(neighbor.key);
        }
      }
    }
    toExplode = newToExplode;
  }

  for (const explodedKey of exploded.values()) {
    map.get(explodedKey).level = 0;
  }

  field.totalExploded += exploded.size;
  return field;
}

function allFlashed(field) {
  for (const [_, octopus] of field.map.entries()) {
    if (octopus.level !== 0) return false;
  }
  return true;
}

export function part1(input, days = 100) {
  let field = parseField(input);
  return Array.from({ length: days }).reduce(
    (field) => simulateStep(field),
    field
  ).totalExploded;
}

export function part2(input) {
  let field = parseField(input);
  let steps = 0;
  while (!allFlashed(field)) {
    field = simulateStep(field);
    steps++;
  }
  return steps;
}
