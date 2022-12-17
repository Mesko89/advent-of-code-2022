const SAND = 'o';
const STONE = '#';

function toSandWorld(input, part2 = false) {
  const objects = new Map();
  const key = (x, y) => `${x},${y}`;
  let boundaries = {
    x: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
    y: { min: 0, max: Number.MIN_SAFE_INTEGER },
  };
  const get = (x, y) => {
    const val = objects.get(key(x, y));
    if (val) return val;
    if (y === boundaries.y.max + 2 && part2) {
      return STONE;
    }
  };
  const put = (x, y, value) => {
    objects.set(key(x, y), value);
  };

  const debug = () => {
    let output = '';
    for (let y = boundaries.y.min; y <= boundaries.y.max + 2; y++) {
      for (let x = boundaries.x.min; x <= boundaries.x.max; x++) {
        const val = get(x, y);
        output += val ?? '.';
      }
      output += '\n';
    }
    console.log(output);
  };

  for (const line of input) {
    const parts = line
      .split(' -> ')
      .map((v) => v.split(',').map((v) => parseInt(v)));
    let pos = parts[0];
    for (let i = 1; i < parts.length; i++) {
      if (pos[0] === parts[i][0]) {
        const minY = Math.min(pos[1], parts[i][1]);
        const maxY = Math.max(pos[1], parts[i][1]);
        for (let y = minY; y <= maxY; y++) {
          pos = [pos[0], y];
          put(pos[0], pos[1], STONE);
        }
      } else {
        const minX = Math.min(pos[0], parts[i][0]);
        const maxX = Math.max(pos[0], parts[i][0]);
        for (let x = minX; x <= maxX; x++) {
          pos = [x, pos[1]];
          put(pos[0], pos[1], STONE);
        }
      }
      pos = parts[i];
      if (pos[0] - 20 < boundaries.x.min) boundaries.x.min = pos[0] - 20;
      if (pos[1] < boundaries.y.min) boundaries.y.min = pos[1];
      if (pos[0] + 20 > boundaries.x.max) boundaries.x.max = pos[0] + 20;
      if (pos[1] > boundaries.y.max) boundaries.y.max = pos[1];
    }
  }

  return {
    boundaries,
    put,
    get,
    debug,
    objects,
  };
}

function simulate({ boundaries, put, get, debug }, part2) {
  let steps = 0;
  while (steps++ < 10e6) {
    if (get(500, 0)) break;
    let sandPos = [500, 0];
    do {
      if (!part2 && sandPos[1] + 1 > boundaries.y.max) {
        return;
      }
      if (!get(sandPos[0], sandPos[1] + 1)) {
        sandPos[1] += 1;
        continue;
      } else if (!get(sandPos[0] - 1, sandPos[1] + 1)) {
        sandPos = [sandPos[0] - 1, sandPos[1] + 1];
        continue;
      } else if (!get(sandPos[0] + 1, sandPos[1] + 1)) {
        sandPos = [sandPos[0] + 1, sandPos[1] + 1];
        continue;
      } else {
        put(sandPos[0], sandPos[1], SAND);
        break;
      }
    } while (true);
  }
}

export function part1(input) {
  const world = toSandWorld(input);
  simulate(world);
  return Array.from(world.objects.values()).filter((v) => v === SAND).length;
}
export function part2(input) {
  const world = toSandWorld(input, true);
  simulate(world, true);
  return Array.from(world.objects.values()).filter((v) => v === SAND).length;
}
