const ROCK = 'rock';
const PAPER = 'paper';
const SCISSORS = 'scissors';

const WIN = 'win';
const DRAW = 'draw';
const LOSE = 'lose';

const SCORES = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
  [LOSE]: 0,
  [DRAW]: 3,
  [WIN]: 6,
};

const SCORE_MAP = {
  [ROCK]: {
    [ROCK]: SCORES[ROCK] + SCORES[DRAW],
    [PAPER]: SCORES[PAPER] + SCORES[WIN],
    [SCISSORS]: SCORES[SCISSORS] + SCORES[LOSE],
    [LOSE]: SCORES[SCISSORS] + SCORES[LOSE],
    [DRAW]: SCORES[ROCK] + SCORES[DRAW],
    [WIN]: SCORES[PAPER] + SCORES[WIN],
  },
  [PAPER]: {
    [ROCK]: SCORES[ROCK] + SCORES[LOSE],
    [PAPER]: SCORES[PAPER] + SCORES[DRAW],
    [SCISSORS]: SCORES[SCISSORS] + SCORES[WIN],
    [LOSE]: SCORES[ROCK] + SCORES[LOSE],
    [DRAW]: SCORES[PAPER] + SCORES[DRAW],
    [WIN]: SCORES[SCISSORS] + SCORES[WIN],
  },
  [SCISSORS]: {
    [ROCK]: SCORES[ROCK] + SCORES[WIN],
    [PAPER]: SCORES[PAPER] + SCORES[LOSE],
    [SCISSORS]: SCORES[SCISSORS] + SCORES[DRAW],
    [LOSE]: SCORES[PAPER] + SCORES[LOSE],
    [DRAW]: SCORES[SCISSORS] + SCORES[DRAW],
    [WIN]: SCORES[ROCK] + SCORES[WIN],
  },
};

function calculateScorePart1(input, moveMap) {
  let totalScore = 0;
  for (let line of input) {
    const [elf, you] = line.split(' ');
    const elfMove = moveMap[elf];
    const yourMove = moveMap[you];
    totalScore += SCORE_MAP[elfMove][yourMove];
  }
  return totalScore;
}

function calculateScorePart2(input, moveMap, scoreMap) {
  let totalScore = 0;
  for (let line of input) {
    const [elf, you] = line.split(' ');
    const elfMove = moveMap[elf];
    const yourCondition = moveMap[you];
    totalScore += SCORE_MAP[elfMove][yourCondition];
  }
  return totalScore;
}

export function part1(input) {
  return calculateScorePart1(input, {
    A: ROCK,
    B: PAPER,
    C: SCISSORS,
    X: ROCK,
    Y: PAPER,
    Z: SCISSORS,
  });
}
export function part2(input) {
  return calculateScorePart2(input, {
    A: ROCK,
    B: PAPER,
    C: SCISSORS,
    X: LOSE,
    Y: DRAW,
    Z: WIN,
  });
}
