import { part1, part2 } from './index';

const testInput = ['3,4,3,1,2'];

describe('Day 6: Lanternfish', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(testInput, 6)).toBe(10);
      expect(part1(testInput, 18)).toBe(26);
      expect(part1(testInput, 80)).toBe(5934);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(26984457539);
    });
  });
});
