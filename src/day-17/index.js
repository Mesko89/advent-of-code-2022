const PIECES = [
  /**
   * ####
   */
  {
    width: 4,
    height: 1,
    rocks: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
  },
  /**
   * .#.
   * ###
   * .#.
   */
  {
    width: 3,
    height: 3,
    rocks: [
      { x: 1, y: 2 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 1, y: 0 },
    ],
  },
  /**
   * ..#
   * ..#
   * ###
   */
  {
    width: 3,
    height: 3,
    rocks: [
      { x: 2, y: 2 },
      { x: 2, y: 1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ],
  },
  /**
   * #
   * #
   * #
   * #
   */
  {
    width: 1,
    height: 4,
    rocks: [
      { x: 0, y: 3 },
      { x: 0, y: 2 },
      { x: 0, y: 1 },
      { x: 0, y: 0 },
    ],
  },
  /**
   * ##
   * ##
   */
  {
    width: 2,
    height: 2,
    rocks: [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
  },
];
const key = (x, y) => `${x},${y}`;
function createField() {
  const map = new Set();
  return {
    height: 0,
    row(y) {
      return Array.from({ length: 7 })
        .map((_, x) => (map.has(key(x, y)) ? '#' : '.'))
        .join('');
    },
    canGoLeft(piece, { x, y }) {
      for (const { x: rx, y: ry } of piece.rocks) {
        if (x + rx - 1 < 0 || map.has(key(x + rx - 1, y + ry))) {
          return false;
        }
      }
      return true;
    },
    canGoRight(piece, { x, y }) {
      for (const { x: rx, y: ry } of piece.rocks) {
        if (x + rx + 1 >= 7 || map.has(key(x + rx + 1, y + ry))) {
          return false;
        }
      }
      return true;
    },
    canGoDown(piece, { x, y }) {
      for (const { x: rx, y: ry } of piece.rocks) {
        if (y + ry - 1 < 0 || map.has(key(x + rx, y + ry - 1))) {
          return false;
        }
      }
      return true;
    },
    place(piece, { x, y }) {
      for (const { x: rx, y: ry } of piece.rocks) {
        map.add(key(x + rx, y + ry));
        if (y + ry + 1 > this.height) {
          this.height = y + ry + 1;
        }
      }
    },
    debug(fromY, toY) {
      fromY = fromY ?? this.height;
      toY = toY ?? 0;
      let output = '';
      for (let y = Math.max(fromY, toY); y >= Math.min(toY, fromY); y--) {
        for (let x = 0; x < 7; x++) {
          output += map.has(key(x, y)) ? '#' : '.';
        }
        output += '\n';
      }
      console.log(output);
    },
  };
}

export function part1(input) {
  const winds = input[0].split('');
  const field = createField();
  let windIndex = 0;
  let pieceIndex = 0;
  let steps = 0;
  while (steps++ < 2022) {
    const piece = PIECES[pieceIndex++ % PIECES.length];
    const pos = { x: 2, y: field.height + 3 };
    do {
      const dir = winds[windIndex++ % winds.length];
      if (dir === '>' && field.canGoRight(piece, pos)) {
        pos.x++;
      } else if (dir === '<' && field.canGoLeft(piece, pos)) {
        pos.x--;
      }
      if (field.canGoDown(piece, pos)) {
        pos.y--;
      } else {
        break;
      }
    } while (true);
    field.place(piece, pos);
  }
  return field.height;
}
export function part2(input) {
  const winds = input[0].split('');
  const field = createField();
  let windIndex = -1;
  let pieceIndex = -1;
  let steps = 0;
  const history = [];
  let count = 0;
  while (steps++ < 2022) {
    const piece = PIECES[++pieceIndex % PIECES.length];
    const pos = { x: 2, y: field.height + 3 };
    do {
      const dir = winds[++windIndex % winds.length];
      if (dir === '>' && field.canGoRight(piece, pos)) {
        pos.x++;
      } else if (dir === '<' && field.canGoLeft(piece, pos)) {
        pos.x--;
      }
      if (field.canGoDown(piece, pos)) {
        pos.y--;
      } else {
        break;
      }
    } while (true);
    field.place(piece, pos);

    const row =
      field.row(field.height - 1) +
      field.row(field.height - 2) +
      field.row(field.height - 3);
    const historyIndex = history.findIndex(
      (h) =>
        h.pieceIndex === pieceIndex % PIECES.length &&
        h.windIndex === windIndex % winds.length &&
        h.row === row
    );
    if (historyIndex > -1) {
      const pastState = history[historyIndex];
      const baseHeight = field.height;
      const cycleSteps = steps - pastState.steps;
      const heightPerCycle = field.height - pastState.height;
      const remainingSteps = (1000000000000 - steps) % cycleSteps;
      const remainingHeight =
        history[historyIndex + remainingSteps].height - pastState.height;
      return (
        baseHeight +
        Math.floor((1000000000000 - steps) / cycleSteps) * heightPerCycle +
        remainingHeight
      );
    } else {
      history.push({
        pieceIndex: pieceIndex % PIECES.length,
        windIndex: windIndex % winds.length,
        steps,
        height: field.height,
        row,
      });
    }
  }
  return field.height;
}
