import { part1, part2 } from './index';

describe('Day 18: Boiling Boulders', () => {
  describe('part1', () => {
    it('should solve part 1', () => {
      expect(part1(['1,1,1', '2,1,1'])).toBe(10);
      expect(
        part1([
          '2,2,2',
          '1,2,2',
          '3,2,2',
          '2,1,2',
          '2,3,2',
          '2,2,1',
          '2,2,3',
          '2,2,4',
          '2,2,6',
          '1,2,5',
          '3,2,5',
          '2,1,5',
          '2,3,5',
        ])
      ).toBe(64);
    });
  });
  describe('part2', () => {
    it('should solve part 2', () => {
      expect(
        part2([
          '2,2,2',
          '1,2,2',
          '3,2,2',
          '2,1,2',
          '2,3,2',
          '2,2,1',
          '2,2,3',
          '2,2,4',
          '2,2,6',
          '1,2,5',
          '3,2,5',
          '2,1,5',
          '2,3,5',
        ])
      ).toBe(58);
    });
  });
});
