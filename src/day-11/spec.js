import { part1, part2 } from './index';

const testInput = [
  '5483143223',
  '2745854711',
  '5264556173',
  '6141336146',
  '6357385478',
  '4167524645',
  '2176841721',
  '6882881134',
  '4846848554',
  '5283751526',
];

describe('Day 11: Dumbo Octopus', () => {
  describe('part1', () => {
    it('should work for simple case', () => {
      expect(part1(['11111', '19991', '19191', '19991', '11111'], 2)).toBe(9);
    });
    it('should work for test case', () => {
      expect(part1(testInput, 10)).toBe(204);
      expect(part1(testInput)).toBe(1656);
    });
  });
  describe('part2', () => {
    it('should work for simple case', () => {
      expect(part2(testInput)).toBe(195);
    });
  });
});
