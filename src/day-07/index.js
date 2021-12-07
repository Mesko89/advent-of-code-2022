function getLinearFuelConsumption(position, crabs) {
  return crabs.reduce((total, crab) => total + Math.abs(crab - position), 0);
}

function getCrabbyFuelConsumption(position, crabs) {
  return crabs.reduce((total, crab) => {
    const distance = Math.abs(crab - position);
    return total + Math.round((distance * (1 + distance)) / 2);
  }, 0);
}

function fuelToAlign(crabs, fuelConsumptionFn) {
  let min = Math.min(...crabs);
  let max = Math.max(...crabs);
  let currentConsumption = Number.MAX_SAFE_INTEGER;
  for (let i = min; i <= max; i++) {
    const fuelConsumption = fuelConsumptionFn(i, crabs);
    if (fuelConsumption > currentConsumption) {
      return currentConsumption;
    } else {
      currentConsumption = fuelConsumption;
    }
  }
}

export function part1(input) {
  const crabs = input[0].split(',').map((v) => parseInt(v));
  return fuelToAlign(crabs, getLinearFuelConsumption);
}
export function part2(input) {
  const crabs = input[0].split(',').map((v) => parseInt(v));
  return fuelToAlign(crabs, getCrabbyFuelConsumption);
}
