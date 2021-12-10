const ERROR_CODES = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
const INCOMPLETE_CODES = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
const VALID_CLOSED = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const OPEN_CHARS = Object.keys(VALID_CLOSED);

function getIncompleteScore(stack) {
  let score = 0;
  while (stack.length) {
    const char = stack.pop();
    score = score * 5 + INCOMPLETE_CODES[char];
  }
  return score;
}

function checkLine(line) {
  const toCloseStack = [];
  for (const char of line.split('')) {
    if (OPEN_CHARS.includes(char)) {
      toCloseStack.push(VALID_CLOSED[char]);
    } else {
      if (char !== toCloseStack[toCloseStack.length - 1]) {
        return { corruptionScore: ERROR_CODES[char], incompleteScore: 0 };
      } else {
        toCloseStack.pop();
      }
    }
  }
  return {
    corruptionScore: 0,
    incompleteScore: getIncompleteScore(toCloseStack),
  };
}

function checkNavigationSubsystem(input) {
  let totalErrorValue = 0;
  for (const line of input) {
    const { corruptionScore } = checkLine(line);
    totalErrorValue += corruptionScore;
  }
  return totalErrorValue;
}

export function part1(input) {
  return checkNavigationSubsystem(input);
}

export function part2(input) {
  const incompleteScores = [];
  for (const line of input) {
    const { corruptionScore, incompleteScore } = checkLine(line);
    if (corruptionScore === 0) {
      incompleteScores.push(incompleteScore);
    }
  }
  const middle = Math.floor(incompleteScores.length / 2);
  return incompleteScores.sort((a, b) => a - b)[middle];
}
