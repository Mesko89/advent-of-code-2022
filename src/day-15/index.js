import { manhattanDistance } from '../utils/distance';

const key = (x, y) => `${x},${y}`;
const lineRx =
  /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/;

function toScannedResults(input) {
  const sensors = [];
  const beacons = new Map();
  const boundaries = {
    x: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
    y: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
  };

  for (let line of input) {
    const [_, sx, sy, bx, by] = line.match(lineRx).map((v) => parseInt(v));
    const distance = manhattanDistance([sx, sy], [bx, by]);

    beacons.set(key(bx, by), { x: bx, y: by });

    const sensor = {
      x: sx,
      y: sy,
      distance,
      xRange: [sx - distance, sx + distance],
      yRange: [sy - distance, sy + distance],
    };

    if (sensor.xRange[0] < boundaries.x.min)
      boundaries.x.min = sensor.xRange[0];
    if (sensor.xRange[1] > boundaries.x.max)
      boundaries.x.max = sensor.xRange[1];
    if (sensor.yRange[0] < boundaries.y.min)
      boundaries.y.min = sensor.yRange[0];
    if (sensor.yRange[1] > boundaries.y.max)
      boundaries.y.max = sensor.yRange[1];
    sensors.push(sensor);
  }

  return {
    boundaries,
    sensors,
    beacons: Array.from(beacons.values()),
    sensorsByX: [...sensors].sort((a, b) => a.xRange[0] - b.xRange[0]),
  };
}

export function part1(input, y = 2000000) {
  const { boundaries, beacons, sensorsByX } = toScannedResults(input);
  const sensors = sensorsByX.filter(
    (s) => s.yRange[0] <= y && s.yRange[1] >= y
  );
  let total = 0;
  for (let x = boundaries.x.min; x <= boundaries.x.max; x++) {
    const sensorInRange = sensors
      .filter((s) => manhattanDistance([s.x, s.y], [x, y]) <= s.distance)
      .sort((a, b) => {
        const d1 = a.x - x;
        const d2 = b.x - x;
        return d2 - d1;
      });
    if (sensorInRange.length) {
      if (x < sensorInRange[0].x) {
        const d = sensorInRange[0].x - x;
        x += d * 2;
        total += d * 2 + 1;
      } else {
        total++;
      }
    }
  }
  return total - beacons.filter(({ y: by }) => by === y).length;
}
export function part2(input, maxCoordinate = 4000000) {
  const { sensors } = toScannedResults(input);
  for (const sensor of sensors) {
    const fromX = -sensor.distance - 1;
    const toX = sensor.distance + 1;
    // sx is the relative from the center of the sensor
    for (let x = fromX; x <= toX; x++) {
      const sx = x + sensor.x;
      if (sx <= 0 || sx >= maxCoordinate) continue;
      // x + y = r (r = distance + 1)
      // y = r - x
      const y1 = sensor.distance + 1 - Math.abs(x);
      const y2 = y1 - 2 * y1;
      for (const y of [y1, y2]) {
        const sy = y + sensor.y;
        if (sy <= 0 || sy >= maxCoordinate) continue;
        const isInRange = sensors.some(
          (s) => manhattanDistance([s.x, s.y], [sx, sy]) <= s.distance
        );
        if (!isInRange) {
          return sx * 4000000 + sy;
        }
      }
    }
  }
}
