import { part1, part2 } from './index';

describe('Day 5: Supply Stacks', () => {
  describe('part1', () => {
    it('should return top crates', () => {
      expect(
        part1([
          '    [D]    ',
          '[N] [C]    ',
          '[Z] [M] [P]',
          ' 1   2   3 ',
          '',
          'move 1 from 2 to 1',
          'move 3 from 1 to 3',
          'move 2 from 2 to 1',
          'move 1 from 1 to 2',
        ])
      ).toBe('CMZ');
    });
  });
  describe('part2', () => {
    it('should return top crates', () => {
      expect(
        part2([
          '    [D]    ',
          '[N] [C]    ',
          '[Z] [M] [P]',
          ' 1   2   3 ',
          '',
          'move 1 from 2 to 1',
          'move 3 from 1 to 3',
          'move 2 from 2 to 1',
          'move 1 from 1 to 2',
        ])
      ).toBe('MCD');
    });
  });
});
