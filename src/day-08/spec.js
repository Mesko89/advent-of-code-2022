import { part1, part2 } from './index';

describe('Day 8: Treetop Tree House', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(part1(['30373', '25512', '65332', '33549', '35390'])).toBe(21);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(part2(['30373', '25512', '65332', '33549', '35390'])).toBe(8);
    });
  });
});
