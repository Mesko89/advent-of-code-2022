function parsePairs(input) {
  return input.map((line) =>
    line.split(',').map((v) => v.split('-').map((v) => parseInt(v)))
  );
}

function countFullOverlap(pairs) {
  let count = 0;
  for (const [A, B] of pairs) {
    if ((A[0] >= B[0] && A[1] <= B[1]) || (B[0] >= A[0] && B[1] <= A[1])) {
      count++;
    }
  }
  return count;
}

function countPartialOverlap(pairs) {
  let count = 0;
  for (const [A, B] of pairs) {
    if (
      (A[0] >= B[0] && A[0] <= B[1]) ||
      (B[0] >= A[0] && B[0] <= A[1]) ||
      (A[1] >= B[0] && A[1] <= B[1]) ||
      (B[1] >= A[0] && B[1] <= A[1])
    ) {
      count++;
    }
  }
  return count;
}

export function part1(input) {
  return countFullOverlap(parsePairs(input));
}
export function part2(input) {
  return countPartialOverlap(parsePairs(input));
}
