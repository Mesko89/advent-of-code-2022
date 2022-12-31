const valueRx = /(\w+): (\d+)/;
const operationRx = /(\w+): (\w+) ([\*\+\/-]) (\w+)/;
function toMonkeys(input) {
  const monkeys = new Map();
  for (const line of input) {
    if (valueRx.test(line)) {
      const [_, monkey, valueString] = line.match(valueRx);
      monkeys.set(monkey, { monkey, value: parseInt(valueString) });
    } else {
      const [_, monkey, left, operation, right] = line.match(operationRx);
      monkeys.set(monkey, { monkey, left, right, operation });
    }
  }
  return monkeys;
}

function findMonkeyNumber(monkeyId, monkeys) {
  const monkey = monkeys.get(monkeyId);
  if (monkey.value) return monkey.value;
  const leftVal = findMonkeyNumber(monkey.left, monkeys);
  const rightVal = findMonkeyNumber(monkey.right, monkeys);
  switch (monkey.operation) {
    case '+':
      return leftVal + rightVal;
    case '-':
      return leftVal - rightVal;
    case '*':
      return leftVal * rightVal;
    case '/':
      return leftVal / rightVal;
  }
}

function findHumanNumber(monkeys) {
  function expandEquation(monkeyId) {
    const monkey = monkeys.get(monkeyId);
    if (monkeyId === 'humn') return 'humn';
    if (monkey.value) return monkey.value;
    const leftVal = expandEquation(monkey.left);
    const rightVal = expandEquation(monkey.right);
    if (typeof leftVal !== 'string' && typeof rightVal !== 'string') {
      switch (monkey.operation) {
        case '+':
          return leftVal + rightVal;
        case '-':
          return leftVal - rightVal;
        case '*':
          return leftVal * rightVal;
        case '/':
          return leftVal / rightVal;
        case '=':
          return `${leftVal} = ${rightVal}`;
      }
    }
    switch (monkey.operation) {
      case '+':
        return `(${leftVal} + ${rightVal})`;
      case '-':
        return `(${leftVal} - ${rightVal})`;
      case '*':
        return `(${leftVal} * ${rightVal})`;
      case '/':
        return `(${leftVal} / ${rightVal})`;
      case '=':
        return `${leftVal} = ${rightVal}`;
    }
  }

  const equation = expandEquation('root');
  const [left, right] = equation.split('=');
  const humanPart = left.includes('humn') ? left : right;
  const monkeyPart = left.includes('humn') ? right : left;
  const valueToMatch = new Function(`return ${monkeyPart};`)();
  const testFn = new Function('humn', `return ${humanPart};`);

  let a = { humn: 0, test: valueToMatch - testFn(0) };
  let b = {
    humn: Number.MAX_SAFE_INTEGER,
    test: valueToMatch - testFn(Number.MAX_SAFE_INTEGER),
  };
  let t = 0;
  do {
    let humn = Math.floor((b.humn + a.humn) / 2);
    let c = {
      humn,
      test: valueToMatch - testFn(humn),
    };
    if ((c.test < 0 && b.test < 0) || (c.test > 0 && b.test > 0)) {
      b = c;
    } else {
      a = c;
    }
    if (c.test === 0) return humn;
  } while (t++ < 100);
  return c.humn;
}

export function part1(input) {
  const monkeys = toMonkeys(input);
  return findMonkeyNumber('root', monkeys);
}
export function part2(input) {
  const monkeys = toMonkeys(input);
  monkeys.get('root').operation = '=';
  return findHumanNumber(monkeys);
}
