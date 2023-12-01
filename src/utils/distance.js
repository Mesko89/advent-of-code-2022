export function manhattanDistance(p1, p2) {
  return p1.reduce((total, _, i) => total + Math.abs(p2[i] - p1[i]), 0);
}
