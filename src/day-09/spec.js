import { part1, part2 } from './index';

const testInput = [
  '2199943210',
  '3987894921',
  '9856789892',
  '8767896789',
  '9899965678',
];

describe('Day 9: Smoke Basin', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(testInput)).toBe(15);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(1134);
    });
  });
});
