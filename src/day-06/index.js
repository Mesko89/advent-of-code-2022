function findStartOfPacketIndex(data, windowSize) {
  for (let i = 0; i + windowSize < data.length; i++) {
    const characters = new Set(data.substring(i, i + windowSize).split(''));
    if (characters.size === windowSize) {
      return i + windowSize;
    }
  }
  return -1;
}

export function part1(input) {
  return findStartOfPacketIndex(input[0], 4);
}
export function part2(input) {
  return findStartOfPacketIndex(input[0], 14);
}
