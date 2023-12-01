import { part1, part2 } from './index';

describe('Day 17: Pyroclastic Flow', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(part1(['>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'])).toBe(3068);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(part2(['>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'])).toBe(
        1514285714288
      );
    });
  });
});
