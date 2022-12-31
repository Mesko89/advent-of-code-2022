function decodeStep(input, key) {
  for (let v of key) {
    if (v.value === 0) continue;
    const prevIndex = input.indexOf(v);
    let shiftValue =
      v.value > 0
        ? v.value % (input.length - 1)
        : -(-v.value % (input.length - 1));
    let newIndex =
      (prevIndex + shiftValue + 10 * (input.length - 1)) % (input.length - 1);
    input = input.slice(0, prevIndex).concat(input.slice(prevIndex + 1));
    input = input.slice(0, newIndex).concat(v).concat(input.slice(newIndex));
  }
  return input;
}

export function part1(input) {
  const data = input.map((line) => ({
    value: parseInt(line),
  }));
  const decoded = decodeStep(data, data);
  const zeroIndex = decoded.findIndex((v) => v.value === 0);
  return [1000, 2000, 3000].reduce((coordinates, index) => {
    return coordinates + decoded[(zeroIndex + index) % decoded.length].value;
  }, 0);
}
export function part2(input) {
  let data = input.map((line) => ({
    value: parseInt(line) * 811589153,
  }));
  const key = data;
  for (let i = 0; i < 10; i++) {
    data = decodeStep(data, key);
  }
  const zeroIndex = data.findIndex((v) => v.value === 0);
  return [1000, 2000, 3000].reduce((coordinates, index) => {
    return coordinates + data[(zeroIndex + index) % data.length].value;
  }, 0);
}
