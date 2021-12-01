function findLargerTotal(values, windowSize = 1) {
  let larger = 0;
  for (let i = 1; i < values.length - (windowSize - 1); i++) {
    const sum1 = values
      .slice(i - 1, i + windowSize - 1)
      .reduce((a, b) => a + b);
    const sum2 = values.slice(i, i + windowSize).reduce((a, b) => a + b);
    if (sum1 < sum2) {
      larger++;
    }
  }
  return larger;
}

export function part1(input) {
  return findLargerTotal(input.map((v) => parseInt(v, 10)));
}
export function part2(input) {
  return findLargerTotal(
    input.map((v) => parseInt(v, 10)),
    3
  );
}
