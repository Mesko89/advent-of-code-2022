const NOOP = 'noop';
const ADDX = 'addx';

function toInstructions(input) {
  return input.map((line) => {
    if (line === NOOP) {
      return [NOOP];
    } else {
      return [ADDX, parseInt(line.substring(5))];
    }
  });
}

function runInstructions(instructions) {
  let xHistory = [1];
  let x = 1;
  let cycle = 1;
  for (const [cmd, val] of instructions) {
    if (cmd === NOOP) {
      xHistory.push(x);
      cycle++;
    } else if (cmd === ADDX) {
      xHistory.push(x);
      cycle++;
      xHistory.push(x);
      x += val;
      cycle++;
    }
  }
  console.log(xHistory);
  return xHistory;
}

export function part1(input) {
  const instructions = toInstructions(input);
  const xHistory = runInstructions(instructions);
  return xHistory.reduce((s, x, i) => {
    if (i === 20 || (i - 20) % 40 === 0) {
      return s + i * x;
    }
    return s;
  }, 0);
}
export function part2(input) {
  const instructions = toInstructions(input);
  const xHistory = runInstructions(instructions);
  let crt = '\n';
  for (let i = 0; i < xHistory.length - 1; i++) {
    const x = i % 40;
    if (
      x === xHistory[i + 1] - 1 ||
      x === xHistory[i + 1] ||
      x === xHistory[i + 1] + 1
    ) {
      crt += '#';
    } else {
      crt += '.';
    }
    if (x === 39) {
      crt += '\n';
    }
  }
  return crt;
}
