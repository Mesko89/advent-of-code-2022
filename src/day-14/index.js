/*NNCB

CH -> B
HH -> N
CB -> */

function parseInput(input) {
  const pairs = new Map();
  const counts = new Map();
  counts.set(input[0][0], 1);
  for (let i = 1; i < input[0].length; i++) {
    const pair = input[0][i - 1] + input[0][i];
    if (!counts.has(input[0][i])) {
      counts.set(input[0][i], 0);
    }
    counts.set(input[0][i], counts.get(input[0][i]) + 1);
    if (!pairs.has(pair)) {
      pairs.set(pair, 0);
    }
    pairs.set(pair, pairs.get(pair) + 1);
  }
  const template = new Map();
  for (let i = 2; i < input.length; i++) {
    template.set(input[i].substring(0, 2), input[i].substring(6));
  }
  return { polymer: { pairs, counts }, template };
}

function step(polymer, template) {
  const newPairs = new Map();
  const newCounts = new Map(polymer.counts);
  for (const [pair, frequency] of polymer.pairs.entries()) {
    const insert = template.get(pair);
    const insertPairs = insert ? [pair[0] + insert, insert + pair[1]] : [];
    if (!newCounts.has(insert)) {
      newCounts.set(insert, 0);
    }
    newCounts.set(insert, newCounts.get(insert) + frequency);
    for (const pair of insertPairs) {
      if (!newPairs.has(pair)) {
        newPairs.set(pair, 0);
      }
      newPairs.set(pair, newPairs.get(pair) + frequency);
    }
  }
  return { pairs: newPairs, counts: newCounts };
}

export function part1(input, steps = 10) {
  let { polymer, template } = parseInput(input);
  while (steps--) {
    polymer = step(polymer, template);
  }
  return (
    Math.max(...Array.from(polymer.counts.values())) -
    Math.min(...Array.from(polymer.counts.values()))
  );
}

export function part2(input) {
  return part1(input, 40);
}
