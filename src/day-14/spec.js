import { part1, part2 } from './index';

describe('Day 14: Regolith Reservoir', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1(['498,4 -> 498,6 -> 496,6', '503,4 -> 502,4 -> 502,9 -> 494,9'])
      ).toBe(24);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2(['498,4 -> 498,6 -> 496,6', '503,4 -> 502,4 -> 502,9 -> 494,9'])
      ).toBe(93);
    });
  });
});
