function parseCourse(lines) {
  return lines.map((v) => {
    const [direction, valueString] = v.split(' ');
    return { direction, value: parseInt(valueString, 10) };
  });
}

function locateEndLocation(course, startLocation = { y: 0, x: 0 }) {
  const endLocation = { ...startLocation };
  for (const { direction, value } of course) {
    switch (direction) {
      case 'forward':
        endLocation.x += value;
        break;
      case 'down':
        endLocation.y += value;
        break;
      case 'up':
        endLocation.y -= value;
        break;
    }
  }
  return endLocation;
}

function locateProperEndLocation(course, startLocation = { y: 0, x: 0 }) {
  const endLocation = { ...startLocation };
  let aim = 0;
  for (const { direction, value } of course) {
    switch (direction) {
      case 'forward':
        endLocation.x += value;
        endLocation.y += aim * value;
        break;
      case 'down':
        aim += value;
        break;
      case 'up':
        aim -= value;
        break;
    }
  }
  return endLocation;
}

export function part1(input) {
  const endLocation = locateEndLocation(parseCourse(input));
  return endLocation.x * endLocation.y;
}
export function part2(input) {
  const endLocation = locateProperEndLocation(parseCourse(input));
  return endLocation.x * endLocation.y;
}
