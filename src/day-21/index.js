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

function playDiracDiceGame(players) {
  const games = [{ players, currentPlayer: 0, count: 1 }];
  let playersWin = players.map(() => 0);
  while (games.length) {
    const game = games.pop();
    if (game.players.some((p) => p.score >= 21)) {
      if (game.players[0].score >= 21) {
        playersWin[0] += game.count;
      } else {
        playersWin[1] += game.count;
      }
    } else {
      for (const roll of diracRolls) {
        const players = game.players.map((p) => ({ ...p }));
        players[game.currentPlayer].position =
          ((players[game.currentPlayer].position + roll.points - 1) % 10) + 1;
        players[game.currentPlayer].score +=
          players[game.currentPlayer].position;
        const newGame = {
          players,
          currentPlayer: (game.currentPlayer + 1) % players.length,
          count: game.count * roll.count,
        };
        games.push(newGame);
      }
    }
  }
  return playersWin;
}

export function part1(input) {
  let players = parsePlayers(input);
  let gameDice = dice();
  players = playPracticeGame(players, gameDice);
  return players.filter((p) => p.score < 1000)[0].score * gameDice.count;
}

export function part2(input) {
  let players = parsePlayers(input);
  const playersWins = playDiracDiceGame(players);
  return Math.max(...playersWins);
}
