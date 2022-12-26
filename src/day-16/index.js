import aStar from 'a-star';
import { intersection } from '../utils/set';

const valveRx =
  /Valve (\w\w) has flow rate=(\d+); tunnels? leads? to valves? (.*)$/;
function toValves(input) {
  const valves = new Map();
  for (const line of input) {
    const [_, id, rateString, valvesString] = line.match(valveRx);
    valves.set(id, {
      id,
      rate: parseInt(rateString),
      goto: valvesString.split(', '),
    });
  }
  return valves;
}

function findDistances(valves) {
  function findDistance(valves, from, to) {
    const path = aStar({
      start: from,
      isEnd: (valve) => valve === to,
      hash: (valve) => valve,
      distance: () => 1,
      heuristic: () => 1,
      timeout: 1000,
      neighbor: (valve) => valves.get(valve).goto,
    });
    return path.cost;
  }
  const distances = new Map();
  for (const from of valves.keys()) {
    distances.set(from, new Map());
    for (const to of valves.keys()) {
      if (from !== to) {
        distances.get(from).set(to, findDistance(valves, from, to));
      }
    }
  }
  return distances;
}

function possiblePaths(path, time, unopened, distances, maxTime = 30) {
  if (unopened.size === 0) return [{ path, time }];
  return Array.from(unopened).flatMap((nextValve) => {
    const newUnopened = new Set(unopened);
    newUnopened.delete(nextValve);
    const distance = distances.get(path[path.length - 1]).get(nextValve) + 1;
    if (time + distance > maxTime) return [{ path, time }];
    return possiblePaths(
      [...path, nextValve],
      time + distance,
      newUnopened,
      distances,
      maxTime
    );
  });
}

function scorePath(path, valves, distances, maxTime) {
  let pressure = 0;
  let rate = 0;
  let valve = path[0];
  let time = 0;
  for (const nextValve of path.slice(1)) {
    const d = distances.get(valve).get(nextValve) + 1;
    if (time + d > maxTime) {
      pressure += rate * (maxTime - time);
      break;
    }
    pressure += rate * d;
    rate += valves.get(nextValve).rate;
    time += d;
    valve = nextValve;
  }
  if (time < maxTime) {
    pressure += rate * (maxTime - time);
  }
  return { path, pressure, rate };
}

export function part1(input) {
  const valves = toValves(input);
  const distances = findDistances(valves);
  const unopened = new Set(
    Array.from(valves.entries())
      .filter(([, { rate }]) => rate > 0)
      .map((v) => v[0])
  );
  const paths = possiblePaths(['AA'], 0, unopened, distances, 30).map(
    ({ path }) => scorePath(path, valves, distances, 30)
  );
  return paths.sort((a, b) => b.pressure - a.pressure)[0].pressure;
}
export function part2(input) {
  const valves = toValves(input);
  const distances = findDistances(valves);
  const unopened = new Set(
    Array.from(valves.entries())
      .filter(([, { rate }]) => rate > 0)
      .map((v) => v[0])
  );
  const paths = possiblePaths(['AA'], 0, unopened, distances, 26)
    .map(({ path }) => scorePath(path, valves, distances, 26))
    .sort((a, b) => b.pressure - a.pressure);
  let bestPressure = 0;
  for (const human of paths.slice(0, 100)) {
    for (const elephant of paths.slice(0, 20000)) {
      if (
        intersection(
          new Set(human.path.slice(1)),
          new Set(elephant.path.slice(1))
        ).size === 0
      ) {
        const combinedPressure = human.pressure + elephant.pressure;
        if (combinedPressure > bestPressure) {
          bestPressure = combinedPressure;
        }
      }
    }
  }
  return bestPressure;
}
