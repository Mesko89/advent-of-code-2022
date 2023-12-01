import { part1, part2 } from './index';

describe('Day 4: Camp Cleanup', () => {
  describe('part1', () => {
    it('should return a total score', () => {
      expect(
        part1([
          '2-4,6-8',
          '2-3,4-5',
          '5-7,7-9',
          '2-8,3-7',
          '6-6,4-6',
          '2-6,4-8',
        ])
      ).toBe(2);
    });
  });
  describe('part2', () => {
    it('should return a total score', () => {
      expect(
        part2([
          '2-4,6-8',
          '2-3,4-5',
          '5-7,7-9',
          '2-8,3-7',
          '6-6,4-6',
          '2-6,4-8',
        ])
      ).toBe(4);
    });
  });
});
