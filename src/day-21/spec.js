import { part1, part2 } from './index';

const testInput = [
  'Player 1 starting position: 4',
  'Player 2 starting position: 8',
];

describe('Day 21: Dirac Dice', () => {
  describe('part1', () => {
    it('should work for test case', () => {
      expect(part1(testInput)).toBe(739785);
    });
  });
  describe('part2', () => {
    it('should work for test case', () => {
      expect(part2(testInput)).toBe(444356092776315);
    });
  });
});
