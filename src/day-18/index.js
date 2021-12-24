const digits = new Set('0123456789'.split(''));
function explode(number) {
  let i = 0;
  let level = 0;
  while (i < number.length) {
    if (number[i] === '[') {
      level++;
      if (level === 5) {
        let startIndex = i;
        let endIndex = i + 1;
        while (number[endIndex++] !== ']');
        const pair = number
          .slice(startIndex + 1, endIndex - 1)
          .split(',')
          .map((v) => parseInt(v));

        number = number.slice(0, startIndex) + '0' + number.slice(endIndex);

        let l = startIndex - 1;
        while (!digits.has(number[l]) && l >= 0) l--;
        let leftNumber = !number[l]
          ? undefined
          : digits.has(number[l - 1])
          ? parseInt(number.slice(l - 1, l + 1))
          : parseInt(number[l]);

        let r = startIndex + 1;
        while (!digits.has(number[r]) && r < number.length) r++;
        let rightNumber = !number[r]
          ? undefined
          : digits.has(number[r + 1])
          ? parseInt(number.slice(r, r + 2))
          : parseInt(number[r]);

        if (rightNumber !== undefined) {
          number =
            number.slice(0, r) +
            (rightNumber + pair[1]) +
            number.slice(r + (rightNumber >= 10 ? 2 : 1));
        }

        if (leftNumber !== undefined) {
          number =
            number.slice(0, l - (leftNumber >= 10 ? 1 : 0)) +
            (leftNumber + pair[0]) +
            number.slice(l + 1);
        }

        level--;
      }
    } else if (number[i] === ']') {
      level--;
    }
    i++;
  }
  return number;
}

function split(number) {
  for (let i = 1; i < number.length; i++) {
    if (digits.has(number[i - 1]) && digits.has(number[i])) {
      const numberToSplit = parseInt(number.slice(i - 1, i + 1));
      const numberToInsert =
        '[' +
        [Math.floor(numberToSplit / 2), Math.ceil(numberToSplit / 2)].join(
          ','
        ) +
        ']';
      return number.slice(0, i - 1) + numberToInsert + number.slice(i + 1);
    }
  }
  return number;
}

export function reduce(number) {
  let prevNumber = number;
  do {
    prevNumber = number;
    number = explode(number);
    number = split(number);
    // console.log({ prevNumber, number });
  } while (prevNumber !== number);
  return number;
}

export function sum(numbers) {
  let number = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    number = reduce('[' + number + ',' + numbers[i] + ']');
  }
  return number;
}

function magnitude(number) {
  const arr = JSON.parse(number);
  return (function calcMagnitude(number) {
    if (typeof number === 'number') return number;
    return 3 * calcMagnitude(number[0]) + 2 * calcMagnitude(number[1]);
  })(arr);
}

export function part1(input) {
  const number = sum(input);
  return magnitude(number);
}

export function part2(input) {
  let maxMagnitude = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const v1 = magnitude(sum([input[i], input[j]]));
      if (v1 > maxMagnitude) maxMagnitude = v1;
      const v2 = magnitude(sum([input[j], input[i]]));
      if (v2 > maxMagnitude) maxMagnitude = v2;
    }
  }
  return maxMagnitude;
}
