import { manhattanDistance } from '../utils/distance';

const rotationFns = [
  ([x, y, z]) => [x, y, z],
  ([x, y, z]) => [y, z, x],
  ([x, y, z]) => [z, x, y],
  ([x, y, z]) => [-x, z, y],
  ([x, y, z]) => [z, y, -x],
  ([x, y, z]) => [y, -x, z],
  ([x, y, z]) => [x, z, -y],
  ([x, y, z]) => [z, -y, x],
  ([x, y, z]) => [-y, x, z],
  ([x, y, z]) => [x, -z, y],
  ([x, y, z]) => [-z, y, x],
  ([x, y, z]) => [y, x, -z],
  ([x, y, z]) => [-x, -y, z],
  ([x, y, z]) => [-y, z, -x],
  ([x, y, z]) => [z, -x, -y],
  ([x, y, z]) => [-x, y, -z],
  ([x, y, z]) => [y, -z, -x],
  ([x, y, z]) => [-z, -x, y],
  ([x, y, z]) => [x, -y, -z],
  ([x, y, z]) => [-y, -z, x],
  ([x, y, z]) => [-z, x, -y],
  ([x, y, z]) => [-x, -z, -y],
  ([x, y, z]) => [-z, -y, -x],
  ([x, y, z]) => [-y, -x, -z],
];

function parseScanners(input) {
  let nextId = 0;
  const scanners = [];
  for (let line of input) {
    if (line.startsWith('---')) {
      scanners.push({ id: nextId++, position: undefined, beacons: [] });
    } else if (line) {
      scanners[scanners.length - 1].beacons.push(
        line.split(',').map((v) => parseInt(v))
      );
    }
  }
  scanners[0].position = [0, 0, 0];
  scanners[0].rotationFn = rotationFns[0];

  return scanners;
}

function getBeaconDistances(beacon, beacons) {
  return beacons
    .filter((b) => !beacon.every((_, i) => b[i] === beacon[i]))
    .map((b) => b.map((_, i) => beacon[i] - b[i]).join(','));
}

function findScannerPosition(scanner, knownScanners) {
  for (let knownScanner of knownScanners) {
    for (const knownBeacon of knownScanner.beacons) {
      const beaconDistances = getBeaconDistances(
        knownBeacon,
        knownScanner.beacons
      );
      for (const rotationFn of rotationFns) {
        const rotatedBeacons = scanner.beacons.map((b) => rotationFn(b));
        for (const beacon of rotatedBeacons) {
          const newDeltas = getBeaconDistances(beacon, rotatedBeacons);
          const sameDeltas = newDeltas.filter((val) =>
            beaconDistances.includes(val)
          ).length;
          if (sameDeltas >= 11) {
            scanner.position = [
              knownBeacon[0] + knownScanner.position[0] - beacon[0],
              knownBeacon[1] + knownScanner.position[1] - beacon[1],
              knownBeacon[2] + knownScanner.position[2] - beacon[2],
            ];
            scanner.beacons = rotatedBeacons;
            scanner.rotationFn = rotationFn;
            return scanner;
          }
        }
      }
    }
  }
}

function findBeacons(scanners) {
  const beacons = new Set();
  for (const scanner of scanners) {
    for (const beacon of scanner.beacons) {
      beacons.add(
        [
          beacon[0] + scanner.position[0],
          beacon[1] + scanner.position[1],
          beacon[2] + scanner.position[2],
        ].join(',')
      );
    }
  }
  return Array.from(beacons);
}

function placeScanners(scanners) {
  while (scanners.some((s) => !s.position)) {
    for (const scanner of scanners.filter((s) => !s.position)) {
      findScannerPosition(
        scanner,
        scanners.filter((s) => s.position)
      );
    }
  }
}

function findBiggestDistance(scanners) {
  let maxManhattanDistance = 0;
  for (let i = 0; i < scanners.length; i++) {
    for (let j = i + 1; j < scanners.length; j++) {
      const distance = manhattanDistance(
        scanners[i].position,
        scanners[j].position
      );
      if (distance > maxManhattanDistance) {
        maxManhattanDistance = distance;
      }
    }
  }
  return maxManhattanDistance;
}

export function part1(input) {
  const scanners = parseScanners(input);
  placeScanners(scanners);
  return findBeacons(scanners).length;
}

export function part2(input) {
  const scanners = parseScanners(input);
  placeScanners(scanners);
  return findBiggestDistance(scanners);
}
