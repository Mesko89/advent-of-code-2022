function getScore(char) {
  if (char === char.toUpperCase()) {
    return char.charCodeAt(0) - 'A'.charCodeAt(0) + 27;
  } else {
    return char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;
  }
}

function intersection(set1, ...sets) {
  const set = new Set();
  for (const v of set1) {
    if (sets.every((s) => s.has(v))) {
      set.add(v);
    }
  }
  return set;
}

function calculatePrioritySum(compartments) {
  let priority = 0;
  for (const compartment of compartments) {
    const leftSet = new Set(compartment[0].split(''));
    const rightSet = new Set(compartment[1].split(''));
    priority += getScore(Array.from(intersection(leftSet, rightSet))[0]);
  }
  return priority;
}

function parseGroups(array, groupSize = 3) {
  const groups = [];
  let currentGroup = [];
  for (const item of array) {
    if (currentGroup.length === groupSize) {
      groups.push(currentGroup);
      currentGroup = [];
    }
    currentGroup.push(item);
  }
  if (currentGroup.length > 0) {
    groups.push(currentGroup);
  }
  return groups;
}

function calculatePrioritySumForGroups(lines) {
  const groups = parseGroups(lines, 3);
  let priority = 0;
  for (const group of groups) {
    const badge = intersection(...group.map((g) => new Set(g.split(''))));
    priority += getScore(Array.from(badge)[0]);
  }
  return priority;
}

export function part1(input) {
  return calculatePrioritySum(
    input.map((line) => [
      line.slice(0, line.length / 2),
      line.slice(line.length / 2),
    ])
  );
}

export function part2(input) {
  return calculatePrioritySumForGroups(input);
}
