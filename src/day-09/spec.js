import { part1, part2 } from './index';

describe('Day 9: Rope Bridge', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(
        part1(['R 4', 'U 4', 'L 3', 'D 1', 'R 4', 'D 1', 'L 5', 'R 2'])
      ).toBe(13);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2(['R 5', 'U 8', 'L 8', 'D 3', 'R 17', 'D 10', 'L 25', 'U 20'])
      ).toBe(36);
    });
  });
});
