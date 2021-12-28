function parseField(input) {
  return input.map((line) => line.split(''));
}

function isEqual(fieldA, fieldB) {
  return fieldA.every((lineA, y) => lineA.every((v, x) => fieldB[y][x] === v));
}

function moveEastCucumbers(field) {
  const newField = [...field.map((v) => [...v])];
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] === '>') {
        const nextX = (x + 1) % field[y].length;
        if (field[y][nextX] === '.') {
          newField[y][nextX] = '>';
          newField[y][x] = '.';
        }
      }
    }
  }
  return newField;
}

function moveSouthCucumbers(field) {
  const newField = [...field.map((v) => [...v])];
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] === 'v') {
        const nextY = (y + 1) % field.length;
        if (field[nextY][x] === '.') {
          newField[nextY][x] = 'v';
          newField[y][x] = '.';
        }
      }
    }
  }
  return newField;
}

export function part1(input) {
  let steps = 0;
  let field = parseField(input);
  do {
    const newField = moveSouthCucumbers(moveEastCucumbers(field));
    steps++;
    if (isEqual(field, newField)) {
      break;
    }
    field = newField;
  } while (true);
  return steps;
}

export function part2(input) {
  return 'Merry XMas!';
}
