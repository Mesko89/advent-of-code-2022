import aStar from 'a-star';

const pathMap = new Map();
function getPath(startPoint, endPoint) {
  const cacheKey = `${startPoint}->${endPoint}`;
  if (pathMap.has(cacheKey)) return pathMap.get(cacheKey);
  // Hallway start point
  const path = [];
  let [sx, sy] = startPoint.split(',').map(Number);
  let [ex, ey] = endPoint.split(',').map(Number);
  for (let y = sy; y >= 1; y--) {
    path.push(`${sx},${y}`);
  }
  for (let x = sx; sx < ex ? x <= ex : x >= ex; sx < ex ? x++ : x--) {
    if (x !== sx) {
      path.push(`${x},1`);
    }
  }
  for (let y = 2; y <= ey; y++) {
    path.push(`${ex},${y}`);
  }
  pathMap.set(cacheKey, path);
  pathMap.set(`${endPoint}->${startPoint}`, [...path].reverse());
  return pathMap.get(cacheKey);
}

/*
#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
*/

const END_POSITIONS = {
  A: ['3,3', '3,2'],
  B: ['5,3', '5,2'],
  C: ['7,3', '7,2'],
  D: ['9,3', '9,2'],
};

const AMPHIPOD_COSTS = {
  A: 1,
  B: 10,
  C: 100,
  D: 1000,
};

const HALLWAY_POSITIONS = ['1,1', '2,1', '4,1', '6,1', '8,1', '10,1', '11,1'];

function parseState(input) {
  const state = new Map([]);
  const amphipods = 'ABCD';
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (amphipods.includes(input[y][x])) {
        state.set(`${x},${y}`, input[y][x]);
      }
    }
  }
  return state;
}

function isPathFree(state, path) {
  const occupiedSpaces = new Set(state.keys());
  for (let i = 1; i < path.length; i++) {
    if (occupiedSpaces.has(path[i])) {
      return false;
    }
  }
  return true;
}

function getPossibleStates(state, endPositions) {
  const possibleStates = [];
  for (const [position, amphipod] of state) {
    const isSet =
      endPositions[amphipod][0] === position ||
      (endPositions[amphipod][1] === position &&
        state.get(endPositions[amphipod][0]) === amphipod);
    if (isSet) continue;

    let canGoToEndRoom = false;
    for (const endPosition of endPositions[amphipod]) {
      if (state.has(endPosition) && state.get(endPosition) !== amphipod) break;
      if (state.has(endPosition) && state.get(endPosition) === amphipod)
        continue;
      if (!state.has(endPosition)) {
        const path = getPath(position, endPosition);
        if (isPathFree(state, path)) {
          const newState = new Map(state);
          newState.delete(position);
          newState.set(endPosition, amphipod);
          possibleStates.push(newState);
          canGoToEndRoom = true;
        }
        break;
      }
    }

    if (canGoToEndRoom) {
      continue;
    }

    if (position.endsWith(',1')) {
      // We are in hallway and we need an empty room to move
      continue;
    }

    for (const newPosition of HALLWAY_POSITIONS) {
      const path = getPath(position, newPosition);
      if (isPathFree(state, path)) {
        const newState = new Map(state);
        newState.delete(position);
        newState.set(newPosition, amphipod);
        possibleStates.push(newState);
      }
    }
  }
  return possibleStates;
}

function isEndPosition(state, endPositions) {
  for (const [position, amphipod] of state) {
    if (!endPositions[amphipod].includes(position)) {
      return false;
    }
  }
  return true;
}

function hash(state) {
  return Array.from(state.entries())
    .map((v) => v.join(':'))
    .sort()
    .join(';');
}

function getCost(stateA, stateB) {
  const posA = Array.from(stateA.keys()).filter((pos) => !stateB.has(pos))[0];
  const posB = Array.from(stateB.keys()).filter((pos) => !stateA.has(pos))[0];
  const path = getPath(posA, posB);
  return (path.length - 1) * AMPHIPOD_COSTS[stateA.get(posA)];
}

export function part1(input) {
  const endPositions = {
    A: ['3,3', '3,2'],
    B: ['5,3', '5,2'],
    C: ['7,3', '7,2'],
    D: ['9,3', '9,2'],
  };
  const state = parseState(input);
  const result = aStar({
    start: state,
    isEnd: (state) => isEndPosition(state, endPositions),
    neighbor: (state) => getPossibleStates(state, endPositions),
    distance: getCost,
    heuristic: () => 1,
    hash: (state) => hash(state),
  });
  return result.cost;
}

export function part2(input) {
  const endPositions = {
    A: ['3,5', '3,4', '3,3', '3,2'],
    B: ['5,5', '5,4', '5,3', '5,2'],
    C: ['7,5', '7,4', '7,3', '7,2'],
    D: ['9,5', '9,4', '9,3', '9,2'],
  };
  input.splice(3, 0, '  #D#C#B#A#', '  #D#B#A#C#');
  const state = parseState(input);
  const result = aStar({
    start: state,
    isEnd: (state) => isEndPosition(state, endPositions),
    neighbor: (state) => getPossibleStates(state, endPositions),
    distance: getCost,
    heuristic: () => 1,
    hash: (state) => hash(state),
  });
  return result.cost;
}
