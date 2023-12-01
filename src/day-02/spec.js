import { part1, part2 } from './index';

describe('Day 2: Rock Paper Scissors', () => {
  describe('part1', () => {
    it('should return a total score', () => {
      expect(part1(['A Y', 'B X', 'C Z'])).toBe(15);
    });
  });
  describe('part2', () => {
    it('should return a total score', () => {
      expect(part2(['A Y', 'B X', 'C Z'])).toBe(12);
    });
  });
});
