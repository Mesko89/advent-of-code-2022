function parseCalories(input) {
  let current = 0;
  const caloriesByElf = [];

  for (const line of input) {
    if (!line) {
      caloriesByElf.push(current);
      current = 0;
    } else {
      current += parseInt(line);
    }
  }

  caloriesByElf.push(current);

  return caloriesByElf;
}

export function part1(input) {
  return Math.max(...parseCalories(input));
}
export function part2(input) {
  return parseCalories(input)
    .sort((a, b) => a - b)
    .slice(-3)
    .reduce((a, b) => a + b);
}
