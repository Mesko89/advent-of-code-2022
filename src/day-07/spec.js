import { part1, part2 } from './index';

const testInput = ['16,1,2,0,4,2,7,1,2,14'];

describe('Day 7: The Treachery of Whales', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(testInput)).toBe(37);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(168);
    });
  });
});
