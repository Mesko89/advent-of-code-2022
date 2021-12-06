function countBits(input) {
  const counter = Array.from({ length: input[0].length }).map(() => ({
    0: 0,
    1: 0,
  }));
  for (const line of input) {
    for (let i = 0; i < line.length; i++) {
      counter[i][line[i]]++;
    }
  }
  return counter;
}

function getPowerConsumption(counts) {
  let gamma = '';
  let epsilon = '';
  for (const count of counts) {
    if (count[0] > count[1]) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
  }
  return {
    gamma: parseInt(gamma, 2),
    epsilon: parseInt(epsilon, 2),
  };
}

function getOxygenRating(values, counts) {
  for (let i = 0; i < counts.length; i++) {
    if (values.length === 1) return parseInt(values[0], 2);
    if (counts[i][1] >= counts[i][0]) {
      values = values.filter((value) => value[i] === '1');
    } else {
      values = values.filter((value) => value[i] === '0');
    }
    counts = countBits(values);
  }
  return parseInt(values[0], 2);
}

function getCo2Rating(values, counts) {
  for (let i = 0; i < counts.length; i++) {
    if (values.length === 1) return parseInt(values[0], 2);
    if (counts[i][1] < counts[i][0]) {
      values = values.filter((value) => value[i] === '1');
    } else {
      values = values.filter((value) => value[i] === '0');
    }
    counts = countBits(values);
  }
  return parseInt(values[0], 2);
}

export function part1(input) {
  const { gamma, epsilon } = getPowerConsumption(countBits(input));
  return gamma * epsilon;
}
export function part2(input) {
  const counts = countBits(input);
  const oxygenRating = getOxygenRating(input, counts);
  const co2Rating = getCo2Rating(input, counts);
  return oxygenRating * co2Rating;
}
