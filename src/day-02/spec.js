import { part1, part2 } from './index';

describe('Day 2: Dive!', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(
        part1([
          'forward 5',
          'down 5',
          'forward 8',
          'up 3',
          'down 8',
          'forward 2',
        ])
      ).toBe(150);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(
        part2([
          'forward 5',
          'down 5',
          'forward 8',
          'up 3',
          'down 8',
          'forward 2',
        ])
      ).toBe(900);
    });
  });
});
