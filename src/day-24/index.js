export function parse(instructions) {
  return new Function(`
      let input = arguments[0].reverse();
      let w, x, y, z;
      ${instructions
        .map((instruction) => {
          const [cmd, p1, p2] = instruction.split(' ');
          switch (cmd) {
            case 'inp':
              return `${p1} = input.pop();`;
            case 'add':
              return `${p1} += ${p2};`;
            case 'mul':
              return `${p1} *= ${p2};`;
            case 'div':
              return `${p1} = Math.trunc(${p1} / ${p2});`;
            case 'mod':
              return `${p1} = ${p1} % ${p2};`;
            case 'eql':
              return `${p1} = ${p1} == ${p2} ? 1 : 0;`;
          }
        })
        .join('\n')}
      return { w, x, y, z };
  `);
}

function findGroups(input) {
  const groups = [];
  for (let i = 0; i < input.length; i += 18) {
    groups.push([4, 5, 15].map((j) => parseInt(input[i + j].split(' ')[2])));
  }
  return groups;
}

function findNumber(groups, max) {
  const previousValues = [];
  const digits = [];
  for (const [i, group] of Object.entries(groups)) {
    const [divider, value, nextValue] = group;
    if (divider === 1) {
      previousValues.push([i, nextValue]);
    } else {
      const [prevI, previousValue] = previousValues.pop();
      const complement = previousValue + value;
      digits[prevI] = max
        ? Math.min(9, 9 - complement)
        : Math.max(1, 1 - complement);
      digits[i] = digits[prevI] + complement;
    }
  }
  return digits.join('');
}

export function part1(input) {
  const groups = findGroups(input);
  return findNumber(groups, true);
}

export function part2(input) {
  const groups = findGroups(input);
  return findNumber(groups, false);
}
