const blueprintRx =
  /Blueprint (\d+): Each ore robot costs (\d+) ore. Each clay robot costs (\d+) ore. Each obsidian robot costs (\d+) ore and (\d+) clay. Each geode robot costs (\d+) ore and (\d+) obsidian./;
function toBlueprints(input) {
  return input.map((line) => {
    const [
      _,
      id,
      oreRobotCost,
      clayRobotCost,
      obsidianRobotOreCost,
      obsidianRobotClayCost,
      geodeRobotOreCost,
      geodeRobotObsidianCost,
    ] = line.match(blueprintRx).map((v) => parseInt(v));
    return {
      id,
      robots: {
        ore: { ore: oreRobotCost },
        clay: { ore: clayRobotCost },
        obsidian: { ore: obsidianRobotOreCost, clay: obsidianRobotClayCost },
        geode: { ore: geodeRobotOreCost, obsidian: geodeRobotObsidianCost },
      },
    };
  });
}

function createState(state = null) {
  if (state === null) {
    return {
      storage: {
        ore: 0,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
      robots: {
        ore: 1,
        clay: 0,
        obsidian: 0,
        geode: 0,
      },
    };
  } else {
    return {
      storage: {
        ...state.storage,
      },
      robots: {
        ...state.robots,
      },
    };
  }
}

const SCORES_PER_TYPE = {
  ore: 1,
  clay: 1,
  obsidian: 100,
  geode: 10000,
};
function scoreState(state) {
  return (
    Object.entries(state.robots).reduce((score, [type, count]) => {
      return score + SCORES_PER_TYPE[type] * count;
    }, 0) +
    state.storage.geode * 100
  );
}

function gainOre(state) {
  for (const [oreType, number] of Object.entries(state.robots)) {
    state.storage[oreType] += number;
  }
  return state;
}

function getBuildPlans(blueprint, storage, current = {}) {
  return Object.entries(blueprint.robots).flatMap(([type, cost]) => {
    const canBuild = Object.entries(cost).every(
      ([oreType, total]) => storage[oreType] >= total
    );
    if (canBuild) {
      const newStorage = { ...storage };
      Object.entries(cost).forEach(([type, total]) => {
        newStorage[type] -= total;
      });
      const newCurrent = { ...current, [type]: (current[type] ?? 0) + 1 };
      return newCurrent;
      // return [newCurrent, ...getBuildPlans(blueprint, newStorage, newCurrent)];
    } else {
      return [];
    }
  });
}

function buildRobots(blueprint, plan, state) {
  for (const [type, total] of Object.entries(plan)) {
    state.robots[type] += total;
    for (const [material, count] of Object.entries(blueprint.robots[type])) {
      state.storage[material] -= total * count;
    }
  }
  return state;
}

function simulateBlueprint(blueprint, minutes = 24) {
  let minute = 0;
  let states = [createState()];
  while (++minute <= minutes) {
    const newStates = [];
    for (let state of states) {
      const possibleBuildPlans = getBuildPlans(blueprint, state.storage);
      state = gainOre(createState(state));
      newStates.push(state);
      for (const plan of possibleBuildPlans) {
        newStates.push(buildRobots(blueprint, plan, createState(state)));
      }
    }
    newStates.forEach((s) => (s.score = scoreState(s)));
    states = newStates.sort((a, b) => b.score - a.score).slice(0, 2000);
  }
  return states;
}

export function part1(input) {
  const blueprints = toBlueprints(input);
  let score = 0;
  for (const blueprint of blueprints) {
    const states = simulateBlueprint(blueprint);
    const maxGeodes = Math.max(...states.map((s) => s.storage.geode));
    score += blueprint.id * maxGeodes;
  }
  return score;
}
export function part2(input) {
  const blueprints = toBlueprints(input);
  let score = 1;
  for (const blueprint of blueprints.slice(0, 3)) {
    const states = simulateBlueprint(blueprint, 32);
    const maxGeodes = Math.max(...states.map((s) => s.storage.geode));
    score *= maxGeodes;
  }
  return score;
}
