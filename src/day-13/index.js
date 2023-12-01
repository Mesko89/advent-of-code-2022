const IS_RIGHT = 1;
const IS_SAME = 0;
const IS_LEFT = -1;

function getPairs(input) {
  const pairs = [];
  for (let i = 0; i < input.length; i += 3) {
    const pair1 = JSON.parse(input[i]);
    const pair2 = JSON.parse(input[i + 1]);
    pairs.push([pair1, pair2]);
  }
  return pairs;
}

function comparePairs(pair1, pair2) {
  if (typeof pair1 === 'number' && typeof pair2 === 'number') {
    if (pair1 === pair2) return IS_SAME;
    if (pair1 < pair2) return IS_RIGHT;
    else return IS_LEFT;
  } else if (Array.isArray(pair1) && Array.isArray(pair2)) {
    const maxLength = Math.max(pair1.length, pair2.length);
    for (let i = 0; i < maxLength; i++) {
      if (pair1[i] === undefined && pair2[i] !== undefined) {
        return IS_RIGHT;
      } else if (pair1[i] !== undefined && pair2[i] === undefined) {
        return IS_LEFT;
      } else {
        const r = comparePairs(pair1[i], pair2[i]);
        if (r !== IS_SAME) return r;
      }
    }
    return IS_SAME;
  } else if (typeof pair1 === 'number' && Array.isArray(pair2)) {
    return comparePairs([pair1], pair2);
  } else if (Array.isArray(pair1) && typeof pair2 === 'number') {
    return comparePairs(pair1, [pair2]);
  }
}

export function part1(input) {
  const pairs = getPairs(input);
  return pairs
    .map(([pair1, pair2]) => comparePairs(pair1, pair2))
    .reduce((sum, result, index) => {
      if (result === IS_RIGHT) {
        return sum + index + 1;
      }
      return sum;
    }, 0);
}
export function part2(input) {
  const pairs = getPairs(input);
  const packets = pairs
    .reduce((list, pair) => list.concat(pair), [])
    .concat([[[2]], [[6]]])
    .sort((a, b) => -comparePairs(a, b));
  const divider1Index =
    packets.findIndex((p) => JSON.stringify(p) === '[[2]]') + 1;
  const divider2Index =
    packets.findIndex((p) => JSON.stringify(p) === '[[6]]') + 1;
  return divider1Index * divider2Index;
}
