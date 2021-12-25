function parseCubes(input) {
  // on x=-20..26,y=-36..17,z=-47..7
  const cubes = [];
  for (const line of input) {
    const [state, coordinates] = line.split(' ');
    const [x, y, z] = coordinates.split(',');
    const [x1, x2] = x
      .slice(2)
      .split('..')
      .map((v) => parseInt(v));
    const [y1, y2] = y
      .slice(2)
      .split('..')
      .map((v) => parseInt(v));
    const [z1, z2] = z
      .slice(2)
      .split('..')
      .map((v) => parseInt(v));
    cubes.push({ on: state === 'on', x1, x2, y1, y2, z1, z2, inside: [] });
  }
  return cubes;
}

function findIntersection(cubeA, cubeB) {
  const x1 = Math.max(cubeA.x1, cubeB.x1);
  const x2 = Math.min(cubeA.x2, cubeB.x2);
  const y1 = Math.max(cubeA.y1, cubeB.y1);
  const y2 = Math.min(cubeA.y2, cubeB.y2);
  const z1 = Math.max(cubeA.z1, cubeB.z1);
  const z2 = Math.min(cubeA.z2, cubeB.z2);
  if (x1 > x2 || y1 > y2 || z1 > z2) return null;
  return { on: undefined, x1, x2, y1, y2, z1, z2, inside: [] };
}

function putInside(baseCube, cube) {
  const intersectedCube = findIntersection(baseCube, cube);
  if (intersectedCube) {
    const insideCubes = baseCube.inside
      .map((insideCube) => putInside(insideCube, cube))
      .filter((c) => c !== null);
    return { ...intersectedCube, inside: insideCubes, on: !baseCube.on };
  }
  return null;
}

function initialize(cubes) {
  const placedCubes = [];
  for (const cube of cubes) {
    for (const placedCube of placedCubes) {
      const insideCube = putInside(placedCube, cube);
      if (insideCube) {
        placedCube.inside.push(insideCube);
      }
    }

    if (cube.on) {
      placedCubes.push(cube);
    }
  }
  return placedCubes;
}

function volume({ x1, x2, y1, y2, z1, z2 }) {
  return (x2 - x1 + 1) * (y2 - y1 + 1) * (z2 - z1 + 1);
}

function findTotalOn(cubes) {
  let totalOn = 0;
  for (const cube of cubes) {
    totalOn += volume(cube);
    totalOn -= findTotalOn(cube.inside);
  }
  return totalOn;
}

export function part1(input) {
  const cubes = parseCubes(input);
  const placedCubes = initialize(
    cubes.filter((cube) => {
      return [cube.x1, cube.x2, cube.y1, cube.y2, cube.z1, cube.z2].every(
        (v) => v >= -50 && v <= 50
      );
    })
  );
  return findTotalOn(placedCubes);
}

export function part2(input) {
  const cubes = parseCubes(input);
  const placedCubes = initialize(cubes);
  return findTotalOn(placedCubes);
}
