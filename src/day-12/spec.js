import { part1, part2 } from './index';

describe('Day 12: Hill Climbing Algorithm', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1(['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'])
      ).toBe(31);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2(['Sabqponm', 'abcryxxl', 'accszExk', 'acctuvwj', 'abdefghi'])
      ).toBe(29);
    });
  });
});
