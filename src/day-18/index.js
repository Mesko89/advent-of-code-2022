const NEIGHBORS = [
  { x: 1, y: 0, z: 0 },
  { x: -1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: -1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: -1 },
];

function parseCubes(input) {
  return input.map((line) => {
    const [x, y, z] = line.split(',').map((v) => parseInt(v));
    return { x, y, z };
  });
}

function createLava() {
  let surface = 0;
  const boundaries = {
    x: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
    y: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
    z: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
  };
  const cubes = new Set();
  const key = (x, y, z) => `${x},${y},${z}`;
  return {
    get surface() {
      return surface;
    },
    get boundaries() {
      return boundaries;
    },
    addCube({ x, y, z }) {
      const totalNeighbors = NEIGHBORS.filter(({ x: dx, y: dy, z: dz }) => {
        return cubes.has(key(x + dx, y + dy, z + dz));
      }).length;
      cubes.add(key(x, y, z));
      surface += 6 - totalNeighbors * 2;
      if (x < boundaries.x.min) boundaries.x.min = x;
      if (y < boundaries.y.min) boundaries.y.min = y;
      if (z < boundaries.z.min) boundaries.z.min = z;
      if (x > boundaries.x.max) boundaries.x.max = x;
      if (y > boundaries.y.max) boundaries.y.max = y;
      if (z > boundaries.z.max) boundaries.z.max = z;
    },
    findOutsideSurface() {
      let outsideSurface = 0;
      const emptyCubes = new Set();
      let toCheck = [
        {
          x: boundaries.x.min - 1,
          y: boundaries.y.min - 1,
          z: boundaries.z.min - 1,
        },
      ];
      while (toCheck.length) {
        const { x, y, z } = toCheck.pop();
        if (emptyCubes.has(key(x, y, z))) continue;
        emptyCubes.add(key(x, y, z));
        outsideSurface += 6;
        const totalNeighbors = NEIGHBORS.filter(({ x: dx, y: dy, z: dz }) => {
          return emptyCubes.has(key(x + dx, y + dy, z + dz));
        }).length;
        outsideSurface -= totalNeighbors * 2;
        for (const { x: dx, y: dy, z: dz } of NEIGHBORS) {
          if (x + dx < boundaries.x.min - 1) continue;
          if (y + dy < boundaries.y.min - 1) continue;
          if (z + dz < boundaries.z.min - 1) continue;
          if (x + dx > boundaries.x.max + 1) continue;
          if (y + dy > boundaries.y.max + 1) continue;
          if (z + dz > boundaries.z.max + 1) continue;
          if (
            !emptyCubes.has(key(x + dx, y + dy, z + dz)) &&
            !cubes.has(key(x + dx, y + dy, z + dz))
          ) {
            toCheck.push({ x: x + dx, y: y + dy, z: z + dz });
          }
        }
      }
      const dx = boundaries.x.max + 2 - (boundaries.x.min - 1);
      const dy = boundaries.y.max + 2 - (boundaries.y.min - 1);
      const dz = boundaries.z.max + 2 - (boundaries.z.min - 1);
      return outsideSurface - 2 * dx * dy - 2 * dx * dz - 2 * dy * dz;
    },
  };
}

export function part1(input) {
  const cubes = parseCubes(input);
  const lava = createLava();
  for (const cube of cubes) {
    lava.addCube(cube);
  }
  return lava.surface;
}
export function part2(input) {
  const cubes = parseCubes(input);
  const lava = createLava();
  for (const cube of cubes) {
    lava.addCube(cube);
  }
  return lava.findOutsideSurface();
}
