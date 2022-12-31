import { part1, part2 } from './index';

describe('Day 21: Monkey Math', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1([
          'root: pppw + sjmn',
          'dbpl: 5',
          'cczh: sllz + lgvd',
          'zczc: 2',
          'ptdq: humn - dvpt',
          'dvpt: 3',
          'lfqf: 4',
          'humn: 5',
          'ljgn: 2',
          'sjmn: drzm * dbpl',
          'sllz: 4',
          'pppw: cczh / lfqf',
          'lgvd: ljgn * ptdq',
          'drzm: hmdt - zczc',
          'hmdt: 32',
        ])
      ).toBe(152);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2([
          'root: pppw + sjmn',
          'dbpl: 5',
          'cczh: sllz + lgvd',
          'zczc: 2',
          'ptdq: humn - dvpt',
          'dvpt: 3',
          'lfqf: 4',
          'humn: 5',
          'ljgn: 2',
          'sjmn: drzm * dbpl',
          'sllz: 4',
          'pppw: cczh / lfqf',
          'lgvd: ljgn * ptdq',
          'drzm: hmdt - zczc',
          'hmdt: 32',
        ])
      ).toBe(301);
    });
  });
});
