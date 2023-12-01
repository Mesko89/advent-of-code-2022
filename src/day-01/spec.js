import { part1, part2 } from './index';

describe('Day 1: Calorie Counting', () => {
  describe('part1', () => {
    it('should return most calories', () => {
      expect(
        part1([
          '1000',
          '2000',
          '3000',
          '',
          '4000',
          '',
          '5000',
          '6000',
          '',
          '7000',
          '8000',
          '9000',
          '',
          '10000',
        ])
      ).toBe(24000);
    });
  });
  describe('part2', () => {
    it('should get total of three biggest calories', () => {
      expect(
        part2([
          '1000',
          '2000',
          '3000',
          '',
          '4000',
          '',
          '5000',
          '6000',
          '',
          '7000',
          '8000',
          '9000',
          '',
          '10000',
        ])
      ).toBe(45000);
    });
  });
});
