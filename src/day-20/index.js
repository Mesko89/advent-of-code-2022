const pixel = (x, y) => `${x},${y}`;
function parseInput(input) {
  const enhancementMap = new Map();
  const toKey = (i) =>
    i
      .toString(2)
      .padStart(9, '0')
      .split('')
      .map((v) => (v === '1' ? '#' : '.'))
      .join('');

  for (let i = 0; i < 512; i++) {
    enhancementMap.set(toKey(i), input[0][i]);
  }

  const litPixels = new Set();
  input = input.slice(2);
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] === '#') {
        litPixels.add(pixel(x, y));
      }
    }
  }

  const boundaries = {
    minX: 0,
    maxX: input[0].length - 1,
    minY: 0,
    maxY: input.length - 1,
  };

  return { enhancementMap, field: { litPixels, boundaries } };
}

function getEnhanceKey(x, y, field) {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ]
    .map((pos) => pixel(...pos))
    .map((v) => (field.litPixels.has(v) ? '#' : '.'))
    .join('');
}

function enhance(field, step, enhancementMap) {
  const boundaries = {
    minX: field.boundaries.minX - 1,
    maxX: field.boundaries.maxX + 1,
    minY: field.boundaries.minY - 1,
    maxY: field.boundaries.maxY + 1,
  };
  const litPixels = new Set();

  if (step % 2 === 1 && enhancementMap.get('.........') === '#') {
    for (let x = boundaries.minX - 1; x <= boundaries.maxX + 1; x++) {
      field.litPixels.add(pixel(x, boundaries.minY - 1));
      field.litPixels.add(pixel(x, boundaries.maxY + 1));
      field.litPixels.add(pixel(x, boundaries.minY));
      field.litPixels.add(pixel(x, boundaries.maxY));
    }
    for (let y = boundaries.minY - 1; y <= boundaries.maxY + 1; y++) {
      field.litPixels.add(pixel(boundaries.minX, y));
      field.litPixels.add(pixel(boundaries.maxX, y));
      field.litPixels.add(pixel(boundaries.minX - 1, y));
      field.litPixels.add(pixel(boundaries.maxX + 1, y));
    }
  }

  for (let x = boundaries.minX; x <= boundaries.maxX; x++) {
    for (let y = boundaries.minY; y <= boundaries.maxY; y++) {
      const key = getEnhanceKey(x, y, field);
      if (enhancementMap.get(key) === '#') {
        litPixels.add(pixel(x, y));
      }
    }
  }
  return { boundaries, litPixels };
}

export function part1(input, steps = 2) {
  let { field, enhancementMap } = parseInput(input);
  for (let step = 0; step < steps; step++) {
    field = enhance(field, step, enhancementMap);
  }
  return field.litPixels.size;
}

export function part2(input) {
  return part1(input, 50);
}
