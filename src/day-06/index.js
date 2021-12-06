function parseFish(initialString) {
  const fishTimers = Array.from({ length: 9 }).map(() => 0);
  for (const fishTimer of initialString.split(',')) {
    fishTimers[fishTimer]++;
  }
  return fishTimers;
}

function simulateDay(fishTimers) {
  const newFishTimers = fishTimers.map(() => 0);
  for (let i = 0; i < fishTimers.length; i++) {
    if (i === 0) {
      newFishTimers[fishTimers.length - 1] = fishTimers[i];
      newFishTimers[fishTimers.length - 3] = fishTimers[i];
    } else {
      newFishTimers[i - 1] += fishTimers[i];
    }
  }
  return newFishTimers;
}

export function part1(input, days = 80) {
  let fishTimers = parseFish(input[0]);
  for (let i = 0; i < days; i++) {
    fishTimers = simulateDay(fishTimers);
  }
  return fishTimers.reduce((a, b) => a + b);
}
export function part2(input, days = 256) {
  return part1(input, days);
}
