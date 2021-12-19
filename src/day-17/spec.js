import { part1, part2 } from './index';

describe('Day 17: Trick Shot', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(['target area: x=20..30, y=-10..-5'])).toBe(45);
    });
  });
  describe('part2', () => {
    it('should work for test case', () => {
      expect(part2(['target area: x=20..30, y=-10..-5'])).toBe(112);
    });
  });
});
