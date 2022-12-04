import { part1, part2 } from './index';

describe('Day 3: Rucksack Reorganization', () => {
  describe('part1', () => {
    it('should return a total score', () => {
      expect(
        part1([
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ])
      ).toBe(157);
    });
  });
  describe('part2', () => {
    it('should return a total score', () => {
      expect(
        part2([
          'vJrwpWtwJgWrhcsFMMfFFhFp',
          'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
          'PmmdzqPrVvPwwTWBwg',
          'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
          'ttgJtRGJQctTZtZT',
          'CrZsJsPPZsGzwwsLwLmpwMDw',
        ])
      ).toBe(70);
    });
  });
});
