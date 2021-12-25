function dice() {
  let count = 0;
  let nextValue = 1;
  return {
    get count() {
      return count;
    },
    roll() {
      count++;
      const rollValue = nextValue;
      nextValue++;
      if (nextValue === 101) {
        nextValue = 1;
      }
      return rollValue;
    },
  };
}

function parsePlayers(input) {
  const players = [
    { score: 0, position: parseInt(input[0].slice(-1)) },
    { score: 0, position: parseInt(input[1].slice(-1)) },
  ];

  return players;
}

function playPracticeGame(players, gameDice) {
  let currentPlayerIndex = 0;
  while (players.every((p) => p.score < 1000)) {
    const totalRoll = gameDice.roll() + gameDice.roll() + gameDice.roll();
    const newPosition =
      ((players[currentPlayerIndex].position - 1 + totalRoll) % 10) + 1;
    players[currentPlayerIndex].score += newPosition;
    players[currentPlayerIndex].position = newPosition;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
  }
  return players;
}

const diracDiceRolls = [];
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    for (let k = 1; k <= 3; k++) {
      diracDiceRolls.push([i, j, k]);
    }
  }
}
const diracRolls = diracDiceRolls.reduce((rolls, diceRolls) => {
  const points = diceRolls[0] + diceRolls[1] + diceRolls[2];
  const roll = rolls.find((r) => r.points === points);
  if (roll) {
    roll.count += 1;
  } else {
    rolls.push({ points, count: 1 });
  }
  return rolls;
}, []);

const memoScore = new Map();
function playDiracDiceGame(
  currentPlayer,
  p1Position,
  p1Score,
  p2Position,
  p2Score
) {
  if (p1Score >= 21) return [1, 0];
  if (p2Score >= 21) return [0, 1];
  const memoKey = [
    currentPlayer,
    p1Position,
    p1Score,
    p2Position,
    p2Score,
  ].join(',');
  if (memoScore.has(memoKey)) {
    return memoScore.get(memoKey);
  }
  const totalWins = [0, 0];
  for (const roll of diracRolls) {
    if (currentPlayer === 0) {
      const newPosition = ((p1Position - 1 + roll.points) % 10) + 1;
      const wins = playDiracDiceGame(
        1,
        newPosition,
        p1Score + newPosition,
        p2Position,
        p2Score
      );
      totalWins[0] += wins[0] * roll.count;
      totalWins[1] += wins[1] * roll.count;
    } else {
      const newPosition = ((p2Position - 1 + roll.points) % 10) + 1;
      const wins = playDiracDiceGame(
        0,
        p1Position,
        p1Score,
        newPosition,
        p2Score + newPosition
      );
      totalWins[0] += wins[0] * roll.count;
      totalWins[1] += wins[1] * roll.count;
    }
  }
  memoScore.set(memoKey, totalWins);
  return totalWins;
}

export function part1(input) {
  let players = parsePlayers(input);
  let gameDice = dice();
  players = playPracticeGame(players, gameDice);
  return players.filter((p) => p.score < 1000)[0].score * gameDice.count;
}

export function part2(input) {
  let players = parsePlayers(input);
  const playersWins = playDiracDiceGame(
    0,
    players[0].position,
    players[0].score,
    players[1].position,
    players[1].score
  );
  return Math.max(...playersWins);
}
