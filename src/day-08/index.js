import { arrayFlat } from '../utils/array';

function toSet(arr) {
  const set = new Set();
  arr.forEach((v) => set.add(v));
  return set;
}

function parseLines(input) {
  const lines = [];
  for (const line of input) {
    const [from, to] = line.split(' | ');
    lines.push({
      from: from
        .split(/\s/)
        .map((v) => v.split(''))
        .map(toSet),
      to: to
        .split(/\s/)
        .map((v) => v.split(''))
        .map(toSet),
    });
  }
  return lines;
}

function countSimpleDigits(numbers) {
  return arrayFlat(numbers).filter((s) => [2, 3, 4, 7].includes(s.size)).length;
}

// 1 (2) -> 1
// 4 (4) -> 4
// 7 (3) -> 7
// 8 (7) -> 8
// 6 (6) -> has not whole 1
// 0 (6) -> has not whole 4
// 9 (6) -> what is left of size 6
// 2 (5) -> has exactly 2 missing from 4
// 3 (5) -> missing 1 from 2
// 5 (5) -> what is left

function isIncludedIn(set1, set2) {
  return Array.from(set1.values()).every((v) => set2.has(v));
}

function missingCount(set1, set2) {
  return Array.from(set1.values()).filter((v) => !set2.has(v)).length;
}

function resolveDigits(reading) {
  const digitSolvers = [
    { digit: 1, resolve: (reading) => reading.find((v) => v.size === 2) },
    { digit: 4, resolve: (reading) => reading.find((v) => v.size === 4) },
    { digit: 7, resolve: (reading) => reading.find((v) => v.size === 3) },
    { digit: 8, resolve: (reading) => reading.find((v) => v.size === 7) },
    {
      digit: 6,
      resolve: (reading, resolvedMap) =>
        reading
          .filter((s) => s.size === 6)
          .find((s) => !isIncludedIn(resolvedMap.get(1), s)),
    },
    {
      digit: 0,
      resolve: (reading, resolvedMap) =>
        reading
          .filter((s) => s.size === 6)
          .find((s) => !isIncludedIn(resolvedMap.get(4), s)),
    },
    {
      digit: 9,
      resolve: (reading, resolvedMap) => reading.filter((s) => s.size === 6)[0],
    },
    {
      digit: 2,
      resolve: (reading, resolvedMap) =>
        reading
          .filter((s) => s.size === 5)
          .find((s) => missingCount(resolvedMap.get(4), s) === 2),
    },
    {
      digit: 3,
      resolve: (reading, resolvedMap) =>
        reading
          .filter((s) => s.size === 5)
          .find((s) => missingCount(resolvedMap.get(2), s) === 1),
    },
    {
      digit: 5,
      resolve: (reading) => reading[0],
    },
  ];
  const resolvedDigits = new Map();
  for (let solver of digitSolvers) {
    const resolvedSet = solver.resolve(reading, resolvedDigits);
    reading = reading.filter((v) => v !== resolvedSet);
    resolvedDigits.set(solver.digit, resolvedSet);
  }
  return resolvedDigits;
}

function resolveNumber(reading, resolvedDigits) {
  let number = '';
  const readingToDigitMap = Array.from(resolvedDigits.entries()).reduce(
    (map, [digit, set]) => {
      map.set(Array.from(set).sort().join(''), digit);
      return map;
    },
    new Map()
  );
  for (let value of reading) {
    value = Array.from(value).sort().join('');
    number += readingToDigitMap.get(value);
  }
  return parseInt(number);
}

export function part1(input) {
  const lines = parseLines(input);
  return countSimpleDigits(lines.map((d) => d.to));
}

export function part2(input) {
  const lines = parseLines(input);
  let total = 0;
  for (const line of lines) {
    const resolvedDigits = resolveDigits(line.from);
    total += resolveNumber(line.to, resolvedDigits);
  }
  return total;
}
