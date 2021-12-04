function parseInput(input) {
  const numbers = input[0].split(',').map((v) => parseInt(v));
  const cards = [];
  let cardLines = [];
  for (let i = 2; i < input.length; i++) {
    if (input[i].trim() === '') {
      cards.push(BingoCard(cardLines));
      cardLines = [];
    } else {
      cardLines.push(input[i]);
    }
  }
  cards.push(BingoCard(cardLines));
  return { numbers, cards };
}

function BingoCard(lines) {
  const rows = lines.map(() => 0);
  const columns = lines[0].split(/\s+/).map(() => 0);
  const numbers = new Map();
  for (let row = 0; row < lines.length; row++) {
    const rowNumbers = lines[row].trim().split(/\s+/);
    for (let column = 0; column < rowNumbers.length; column++) {
      numbers.set(parseInt(rowNumbers[column]), {
        row,
        column,
        marked: false,
      });
    }
  }
  return {
    rows,
    columns,
    numbers,
    markNumber(number) {
      if (numbers.has(number)) {
        const { row, column } = numbers.get(number);
        rows[row]++;
        columns[column]++;
        numbers.set(number, { row, column, marked: true });
      }
    },
    checkBingo() {
      return (
        rows.some((row) => columns.length === row) ||
        columns.some((column) => rows.length === column)
      );
    },
  };
}

function playBingo(numbers, cards) {
  for (const number of numbers) {
    for (const card of cards) {
      card.markNumber(number);
      if (card.checkBingo()) {
        return { number, winningCard: card };
      }
    }
  }
}

function getLastWinningCard(numbers, cards) {
  for (const number of numbers) {
    for (const card of cards) {
      card.markNumber(number);
      if (card.checkBingo()) {
        if (cards.length === 1) {
          return { number, winningCard: card };
        } else {
          cards = cards.filter((c) => c !== card);
        }
      }
    }
  }
}

function getScore(number, card) {
  return (
    number *
    Array.from(card.numbers.entries())
      .filter(([_, { marked }]) => !marked)
      .reduce((total, [number]) => total + number, 0)
  );
}

export function part1(input) {
  const { numbers, cards } = parseInput(input);
  const { number, winningCard } = playBingo(numbers, cards);
  return getScore(number, winningCard);
}
export function part2(input) {
  const { numbers, cards } = parseInput(input);
  const { number, winningCard } = getLastWinningCard(numbers, cards);
  return getScore(number, winningCard);
}
