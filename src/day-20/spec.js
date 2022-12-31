import { part1, part2 } from './index';

describe('Day 20: Grove Positioning System', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(part1(['1', '2', '-3', '3', '-2', '0', '4'])).toBe(3);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(part2(['1', '2', '-3', '3', '-2', '0', '4'])).toBe(1623178306);
    });
  });
});
