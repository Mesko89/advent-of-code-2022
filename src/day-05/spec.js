import { part1, part2 } from './index';

const testInput = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2',
];

describe('Day 5: Hydrothermal Venture', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(testInput)).toBe(5);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(12);
    });
  });
});
